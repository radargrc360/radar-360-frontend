"use client";

import { useEffect, useState } from "react";
import { ClienteFrameworksResponse } from "../types/clientDataComFramework";
import api from "../api/config";

interface ApiResponse {
  status: string;
  statusCode: number;
  formato: string;
  mensagem: ClienteFrameworksResponse;
}

export function useGetClienteComFrameworks(clientId?: number) {
  const [data, setData] = useState<ClienteFrameworksResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    const fetchCliente = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<ApiResponse>(
          `/clientes/${clientId}/frameworks/todos`
        );

        setData(response.data.mensagem);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro inesperado ao carregar dados do cliente");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [clientId]);

  return {
    cliente: data,
    frameworks: data?.frameworks ?? [],
    escalaMatriz: data?.escalaMatriz,
    industria: data?.industria,
    jurisdicao: data?.jurisdicao,
    loading,
    error,
  };
}
