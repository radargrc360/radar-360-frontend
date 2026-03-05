"use client";

import { useCallback, useEffect, useState } from "react";
import api from "../api/config";
import {
  CategoriaRisco,
  GetCategoriasRiscoResponse,
  RegistrosPaginacao,
} from "../types/listaCategoriaRisco";

interface UseGetCategoriasRiscoParams {
  pagina?: number;
  limite?: number;
  categoria?: string;
}

export function useGetListaCategoriaRisco({
  pagina = 1,
  limite = 25,
  categoria = "",
}: UseGetCategoriasRiscoParams = {}) {
  const [data, setData] = useState<CategoriaRisco[]>([]);
  const [registros, setRegistros] = useState<RegistrosPaginacao | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<GetCategoriasRiscoResponse>(
        "/lista-de-categoria-de-risco/com-frameworks",
        {
          params: {
            pagina,
            limite,
            categoria,
          },
        }
      );

      if (response.status === 200) {
        setData(response.data?.mensagem ?? []);
        setRegistros(response.data?.registros ?? null);
      }
    } catch (err) {
      console.error("Erro ao carregar categorias de risco", err);
      setError("Erro ao carregar categorias de risco");
    } finally {
      setLoading(false);
    }
  }, [pagina, limite, categoria]);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  return {
    categorias: data,
    registros,
    loading,
    error,
    refetch: fetchCategorias,
  };
}
