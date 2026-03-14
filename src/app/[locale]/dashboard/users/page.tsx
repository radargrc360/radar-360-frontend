"use client";

import { Plus, Search, User, UserLock, UserRoundX } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import AddUserModal from "./components/AddUserModal";
import { UsersTable } from "./components/UsersTable";
import { useUsersByClient } from "@/src/app/hooks/useGetUsersByClientsId";
import { ClientUser } from "@/src/app/types/user";
import { ToastContainer } from "react-toastify";
import api from "@/src/app/api/config";
import { toast } from "react-toastify";
import useGetClientData from "@/src/app/hooks/useGetClientData";

interface Users {
  id: string;
  nome: string;
  email: string;
  funcao: string;
  estado: "Activo" | "Bloqueado" | "Pendente";
  ultimoAcesso: string;
}

export default function Users() {
  const { clientData } = useGetClientData();

  const {
    users: apiUsers,
    loading,
    error,
  } = useUsersByClient(clientData?.mensagem.id_clientes);

  function mapClientUsersToTable(apiUsers: ClientUser[]): Users[] {
    return apiUsers.map((user) => ({
      id: String(user.id_usuarios),

      nome: `${user.primeiro_nome_usuario} ${user.segundo_nome_usuario}`,

      email: user.email_,

      funcao: user.usuario_funcao,

      estado: user.acesso === "true" ? "Activo" : "Bloqueado",

      ultimoAcesso: new Date(user.actualizado_em).toLocaleString("pt-PT", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    }));
  }

  const users = useMemo(() => mapClientUsersToTable(apiUsers), [apiUsers]);

  const [usersState, setUsersState] = useState<Users[]>(users);

  useEffect(() => {
    setUsersState(users);
  }, [users]);

  const funcoes = useMemo(() => {
    const set = new Set(users.map((u) => u.funcao));
    return Array.from(set);
  }, [users]);

  const [search, setSearch] = useState("");
  const [selectedFuncao, setSelectedFuncao] = useState("all");
  const [selectedEstado, setSelectedEstado] = useState("all");

  const filteredUsers = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return usersState.filter((user) => {
      const nome = user.nome.toLowerCase();
      const email = user.email.toLowerCase();
      const id = user.id.toLowerCase();
      const funcao = user.funcao.toLowerCase();
      const estado = user.estado.toLowerCase();

      const searchMatch =
        searchTerm === "" ||
        nome.includes(searchTerm) ||
        email.includes(searchTerm) ||
        id.includes(searchTerm);

      const funcaoMatch =
        selectedFuncao === "all" || funcao === selectedFuncao.toLowerCase();

      const estadoMatch =
        selectedEstado === "all" || estado === selectedEstado.toLowerCase();

      return searchMatch && funcaoMatch && estadoMatch;
    });
  }, [usersState, search, selectedFuncao, selectedEstado]);

  const [addUserModal, setAddUserModalOpen] = useState(false);

  const usersDash = [
    {
      icon: <User size={18} />,
      title: "Usuários Activos",
      stat: usersState.filter((u) => u.estado === "Activo").length,
    },
    {
      icon: <UserRoundX size={18} />,
      title: "Usuários Inactivos",
      stat: usersState.filter((u) => u.estado === "Bloqueado").length,
    },
    {
      icon: <UserLock size={18} />,
      title: "Usuários Pendentes",
      stat: usersState.filter((u) => u.estado === "Pendente").length,
    },
  ];

  async function handleDeleteUser(userId: string) {
    try {
      const response = await api.delete(`/usuarios/${userId}`);

      setUsersState((prev) => prev.filter((user) => user.id !== userId));
      if (response.status === 202) {
        toast.success("Utilizador eliminado com sucesso");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.error(error);
        toast.error("Perfil não encontrado");
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="w-full min-h-svh bg-white rounded-2xl p-5 flex flex-col gap-5">
        <nav className="text-xs text-gray-400">
          Gestão de Usuário /{" "}
          <span className="text-primary-100 font-semibold">
            Lista de Usuários
          </span>
        </nav>

        <div className="flex flex-col gap-1">
          <h1 className="text-dark text-xl font-bold">Gestão de Usuário</h1>
          <p className="text-gray-400 text-sm">
            Configure e gerencie o acesso de administradores, operadores e
            executivos.
          </p>
        </div>

        <ul className="grid grid-cols-3 w-full gap-4">
          {usersDash.map((item, id) => (
            <li
              key={id}
              className="p-6 rounded-2xl w-full max-w-xl h-32 bg-gray-100 shadow-md text-dark">
              <span className="text-gray-500 flex items-center gap-2">
                {item.icon} {item.title}
              </span>
              <p className="font-semibold text-3xl">{item.stat}</p>
            </li>
          ))}
        </ul>

        <div className="shadow-md rounded-2xl bg-white border p-6">
          <h1 className="text-lg font-semibold text-dark p-5">
            Lista de Usuários
          </h1>

          {loading && <p className="p-5">A carregar usuários...</p>}
          {error && <p className="p-5 text-red-500">{error}</p>}

          <nav className="w-full flex items-center gap-4">
            <div className="bg-gray-100 flex items-center text-gray-500 gap-2 px-4 py-2 rounded-lg w-full">
              <Search size={18} />
              <input
                type="search"
                className="outline-none w-full"
                placeholder="Pesquisar por nome, ID ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <ul className="text-gray-500 flex gap-3">
              <li className="border border-gray-300 rounded-lg p-2 w-32">
                <select
                  className="outline-none w-full"
                  value={selectedFuncao}
                  onChange={(e) => setSelectedFuncao(e.target.value)}>
                  <option value="all">Função</option>
                  {funcoes.map((funcao) => (
                    <option
                      key={funcao}
                      value={funcao.toLowerCase()}>
                      {funcao}
                    </option>
                  ))}
                </select>
              </li>
              <li className="border border-gray-300 rounded-lg p-2 w-24">
                <select
                  className="outline-none w-full"
                  value={selectedEstado}
                  onChange={(e) => setSelectedEstado(e.target.value)}>
                  <option value="all">Estado</option>
                  <option value="activo">Activo</option>
                  <option value="bloqueado">Bloqueado</option>
                  <option value="pendente">Pendente</option>
                </select>
              </li>
              <li>
                <button
                  className={`primary-btn gap-1 w-40 ${
                    users.length < 0 && "hidden"
                  }`}
                  onClick={() => setAddUserModalOpen(true)}>
                  <Plus size={18} /> Novo Usuário
                </button>
              </li>
            </ul>
          </nav>

          {!loading && users.length > 0 && (
            <UsersTable
              data={filteredUsers}
              onDelete={handleDeleteUser}
            />
          )}

          {!loading && users.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              Nenhum usuário encontrado
            </p>
          )}
        </div>

        <AddUserModal
          open={addUserModal}
          onClose={() => setAddUserModalOpen(false)}
        />
      </div>
    </>
  );
}
