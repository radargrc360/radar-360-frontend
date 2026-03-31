"use client";

import { useCallback, useEffect, useState } from "react";
import { GetJurisdicaoResponse, JurisdicaoActiva } from "../types/juridisdicao";
import api from "../api/config";

interface UseGetJurisdicaoParams {
  jurisdicaoId: number;
  limite?: number;
  enabled?: boolean;
}

export function useGetJurisdicaoPorId({
  jurisdicaoId,
  limite = 100,
  enabled = true,
}: UseGetJurisdicaoParams) {
  const [data, setData] = useState<JurisdicaoActiva[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJurisdicao = useCallback(async () => {
    if (!enabled || !jurisdicaoId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await api.get<GetJurisdicaoResponse>(
        `/jurisdicao-activa/${jurisdicaoId}/com-frameworks`,
        {
          params: { limite },
        },
      );

      setData(response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err?.response?.data?.mensagem || "Erro ao carregar jurisdição activa",
      );
    } finally {
      setLoading(false);
    }
  }, [jurisdicaoId, limite, enabled]);

  useEffect(() => {
    if (enabled) {
      fetchJurisdicao();
    }
  }, [enabled, fetchJurisdicao]);

  return {
    jurisdicoes: data,
    loading,
    error,
    refetch: fetchJurisdicao,
  };
}
