/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import api from "@/src/app/api/config";
import {
  IndustriaPrincipal,
  IndustriasResponse,
} from "@/src/app/types/industria";

interface UseIndustriasReturn {
  industrias: IndustriaPrincipal[];
  loading: boolean;
  error: string | null;
}

export function useGetIndustriasPrincipais(): UseIndustriasReturn {
  const [industrias, setIndustrias] = useState<IndustriaPrincipal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIndustrias() {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<IndustriasResponse>(
          "/industrias-principais"
        );

        setIndustrias(response.data.mensagem || []);
      } catch (err: any) {
        setError(
          err?.response?.data?.mensagem ||
            "Erro ao carregar indústrias principais"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchIndustrias();
  }, []);

  return {
    industrias,
    loading,
    error,
  };
}
