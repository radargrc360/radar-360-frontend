"use client";

import { useEffect, useState } from "react";
import api from "../api/config";
import { Departamento, DepartamentosResponse } from "../types/departamento";

export function useGetDepartamentosCliente(clienteId?: number) {
  const [data, setData] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clienteId) return;

    async function fetchDepartamentos() {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<DepartamentosResponse>(
          `/departamentos-clientes/${clienteId}`,
        );

        setData(response.data.mensagem);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(
          err?.response?.data?.mensagem || "Erro ao buscar departamentos",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDepartamentos();
  }, [clienteId]);

  return {
    departamentos: data,
    loading,
    error,
  };
}
