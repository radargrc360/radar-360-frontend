// src/app/hooks/useUserRolesByClient.ts
"use client";

import { useEffect, useState } from "react";
import api from "@/src/app/api/config";
import { UserRole, UserRolesByClientResponse } from "../types/userRoles";

export function useUserRolesByClient(clientId?: number) {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    let isMounted = true;

    async function fetchRoles() {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<UserRolesByClientResponse>(
          `/usuarios-funcoes/cliente/${clientId}`,
        );

        if (!isMounted) return;

        setRoles(response.data.mensagem);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (!isMounted) return;

        setError(
          err?.response?.data?.mensagem || "Erro ao carregar cargos do cliente",
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRoles();

    return () => {
      isMounted = false;
    };
  }, [clientId]);

  return {
    roles,
    loading,
    error,
  };
}
