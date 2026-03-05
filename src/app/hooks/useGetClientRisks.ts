"use client";

import { useEffect, useState } from "react";
import api from "@/src/app/api/config";
import { Risk, RiscosByClienteResponse } from "../types/risk";

export function useRiscosByCliente(clientId?: number) {
  const [riscos, setRiscos] = useState<Risk[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    let isMounted = true;

    async function fetchRiscosByCliente() {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<RiscosByClienteResponse>(
          `/riscos/cliente/${clientId}`
        );

        if (!isMounted) return;

        setRiscos(response.data.mensagem);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (!isMounted) return;

        setError(
          err?.response?.data?.mensagem || "Erro ao carregar riscos do cliente"
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRiscosByCliente();

    return () => {
      isMounted = false;
    };
  }, [clientId]);

  return {
    riscos,
    loading,
    error,
  };
}
