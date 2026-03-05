// hooks/useRiskSubCategories.ts

"use client";

import { useEffect, useState } from "react";
import { RiskSubCategory } from "../types/riskSubCategory";
import api from "../api/config";

type UseRiskSubCategoriesParams = {
  categoriaDeRiscoId?: number;
};

export function useRiskSubCategories({
  categoriaDeRiscoId,
}: UseRiskSubCategoriesParams = {}) {
  const [data, setData] = useState<RiskSubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(
          `/lista-sub-categoria-ao-risco/categoria/${categoriaDeRiscoId}`
        );

        setData(response.data.mensagem);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(
          err?.response?.data?.mensagem ||
            "Erro ao carregar subcategorias de risco"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [categoriaDeRiscoId]);

  return { data, loading, error };
}
