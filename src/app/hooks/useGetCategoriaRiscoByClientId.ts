"use client";

import { useEffect, useState } from "react";
import api from "../api/config";
import {
  CategoriaRisco,
  CategoriaRiscoResponse,
} from "../types/categoriaRisco";

export function useGetCategoriaRiscoByClientId({
  idCliente,
}: {
  idCliente?: number;
}) {
  const [data, setData] = useState<CategoriaRisco[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRiskCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<CategoriaRiscoResponse>(
          `/categoria-ao-risco/cliente/${idCliente}`
        );

        setData(response.data.mensagem);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(
          err?.response?.data?.mensagem ||
            "Erro ao carregar categorias de risco"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRiskCategories();
  }, [idCliente]);

  return {
    categorias: data,
    loading,
    error,
  };
}
