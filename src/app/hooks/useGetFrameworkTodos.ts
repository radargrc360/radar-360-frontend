"use client";

import { useCallback, useEffect, useState } from "react";
import api from "../api/config";
import { ClienteFrameworksResponse } from "../types/frameworksTodos";

interface UseGetClientFrameworksProps {
  clientId?: number;
}

export function useGetClientFrameworksTodos({
  clientId,
}: UseGetClientFrameworksProps) {
  const [data, setData] = useState<ClienteFrameworksResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientFrameworks = useCallback(async () => {
    if (!clientId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/clientes/${clientId}/frameworks/todos`);

      if (response.status === 200) {
        setData(response.data ?? null);
      }
    } catch (err) {
      console.error("Erro ao buscar frameworks do cliente", err);
      setError("Erro ao carregar dados do cliente");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchClientFrameworks();
  }, [fetchClientFrameworks]);

  return {
    data,
    frameworks: data?.mensagem.frameworks ?? [],
    loading,
    error,
    refetch: fetchClientFrameworks,
  };
}
