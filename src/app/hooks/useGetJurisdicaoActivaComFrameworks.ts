"use client";

import { useEffect, useState } from "react";
import { GetJurisdicaoResponse, JurisdicaoActiva } from "../types/juridisdicao";
import api from "../api/config";

export function useGetJurisdicaoActivaComFrameworks() {
  const [jurisdicoes, setJurisdicoes] = useState<JurisdicaoActiva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJurisdicoes = async () => {
    try {
      setLoading(true);

      const { data } = await api.get<GetJurisdicaoResponse>(
        "/jurisdicao-activa/com-frameworks",
        {
          params: { limite: 100 },
        }
      );

      setJurisdicoes(data.mensagem);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar jurisdições com frameworks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJurisdicoes();
  }, []);

  return {
    jurisdicoes,
    loading,
    error,
    refetch: fetchJurisdicoes,
  };
}
