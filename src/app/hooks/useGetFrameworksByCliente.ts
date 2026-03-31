import { useEffect, useState } from "react";
import { FrameworkCliente } from "@/src/app/types/framework";
import api from "../api/config";

interface ApiResponse {
  status: string;
  statusCode: number;
  formato: string;
  mensagem: FrameworkCliente[];
}

export function useGetFrameworksByCliente(clientId?: number) {
  const [frameworks, setFrameworks] = useState<FrameworkCliente[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    const fetchFrameworks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<ApiResponse>(
          `/frameworks/clientes/${clientId}`,
        );

        setFrameworks(response.data.mensagem || []);
      } catch (err) {
        console.error("Erro ao buscar frameworks do cliente:", err);
        setError("Erro ao carregar frameworks do cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchFrameworks();
  }, [clientId]);

  return {
    frameworks,
    loading,
    error,
    hasFrameworks: frameworks.length > 0,
  };
}
