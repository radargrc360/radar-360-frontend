"use client";

import { useCallback, useEffect, useState } from "react";
import api from "../api/config";
import { GetEscalasMatrizResponse, RiscoEscala } from "../types/matrizEscala";

export function useGetEscalasMatriz() {
  const [data, setData] = useState<RiscoEscala[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEscalas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get<GetEscalasMatrizResponse>(
        "/matriz-de-risco/escalas/todas"
      );

      setData(response.data.mensagem);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err?.response?.data?.mensagem ||
          "Erro ao carregar escalas da matriz de risco"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEscalas();
  }, [fetchEscalas]);

  return {
    escalas: data,
    loading,
    error,
    refetch: fetchEscalas,
  };
}
