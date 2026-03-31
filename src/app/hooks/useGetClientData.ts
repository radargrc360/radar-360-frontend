import { useCallback, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ClientData } from "../types/clientData";
import api from "../api/config";

export default function useGetClientData() {
  const [clientData, setClientData] = useState<ClientData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const cookie = new Cookies();
    let hash = cookie.get("client_hash");

    if (!hash) {
      hash = localStorage.getItem("cliente_hash") || undefined;
    }

    if (!hash) {
      setError("Hash do cliente não encontrado");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/customers/hash/${hash}`);

      if (response.status === 200) {
        setClientData(response.data);
        localStorage.setItem(
          "client_data",
          JSON.stringify(response.data)
        );
      }
    } catch (err) {
      setError("Falha ao buscar dados do cliente");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  return {
    clientData,
    loading,
    error,
    refetch: fetchClientData,
  };
}
