/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import api from "@/src/app/api/config";
import { ClientUser, UsersByClientResponse } from "../types/user";

export function useUsersByClient(clientId?: number) {
  const [users, setUsers] = useState<ClientUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    let isMounted = true;

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<UsersByClientResponse>(
          `/usuarios/cliente/${clientId}`,
        );

        if (!isMounted) return;

        setUsers(response.data.message);
      } catch (err: any) {
        if (!isMounted) return;

        setError(
          err?.response?.data?.mensagem ||
            "Erro ao carregar usuários do cliente",
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [clientId]);

  return {
    users,
    loading,
    error,
  };
}
