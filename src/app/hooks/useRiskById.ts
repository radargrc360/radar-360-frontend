// src/app/hooks/useRiscoById.ts
"use client";

import { useEffect, useState } from "react";
import api from "@/src/app/api/config";
import { RiscoByIdResponse, Risk } from "../types/risk";

export function useRiscoById(riskId?: number) {
  const [riscoById, setRisco] = useState<Risk | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!riskId) return;

    let isMounted = true;

    async function fetchRiscoById() {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<RiscoByIdResponse>(`/riscos/${riskId}`);

        if (!isMounted) return;

        setRisco(response.data.mensagem);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (!isMounted) return;

        setError(
          err?.response?.data?.mensagem || "Erro ao carregar detalhes do risco"
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRiscoById();

    return () => {
      isMounted = false;
    };
  }, [riskId]);

  return {
    riscoById,
    loading,
    error,
  };
}
