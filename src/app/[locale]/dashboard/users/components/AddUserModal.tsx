/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useGetClientData from "@/src/app/hooks/useGetClientData";
import { useUserRolesByClient } from "@/src/app/hooks/useUserRolesByClient";
import ModalLayout from "@/src/app/ui/dashboard/ModalLayout";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "@/src/app/api/config";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { UserRole } from "@/src/app/types/userRoles";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
};

export default function AddUserModal({ open, onClose }: ModalProps) {
  const { clientData } = useGetClientData();
  const { roles } = useUserRolesByClient(clientData?.mensagem.id_clientes);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);

      const empresaId = clientData?.mensagem.id_clientes;

      const payload = {
        email_: data.email,
        senha_: "SenhaForte123@",
        confirmar_senha: "SenhaForte123@",
        primeiro_nome_usuario: data.firstName,
        segundo_nome_usuario: data.lastName,
        tipo_usuario: Number(data.roleId),
        usuario_empresa_fk: empresaId,
      };

      const response = await api.post("/usuarios", payload, {
        headers: {
          gerador: empresaId,
        },
      });

      if (response.status === 201) {
        toast.success("Usuário criado com sucesso");
      }

      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.mensagem || "Erro ao criar usuário");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      title="Adicionar Novo Usuário">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 font-medium text-primary-500 w-full">
        <label className="relative flex items-center gap-4 text-primary-500 group cursor-pointer">
          <Image
            src={"/user.png"}
            alt={"User"}
            width={100}
            height={100}
            className="rounded-full w-12 h-12 bg-gray-500"
          />

          <button
            type="button"
            className="border-2 border-primary-500 rounded-sm text-sm px-4 py-1 font-semibold group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
            Escolher
          </button>

          <span className="text-sm text-gray-500">
            JPG, GIF ou PNG. 1 MB Max.
          </span>

          <input
            type="file"
            className="opacity-0 absolute top-0 left-0 w-full h-full z-20 cursor-pointer"
          />
        </label>

        <div className="flex w-full gap-4">
          <label className="w-1/2 flex flex-col gap-1">
            <p>
              Primeiro Nome<span className="text-red-500">*</span>
            </p>

            <input
              type="text"
              {...register("firstName", {
                required: "Primeiro nome é obrigatório",
              })}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="Digite o primeiro nome"
            />

            {errors.firstName && (
              <span className="text-xs text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </label>

          <label className="w-1/2 flex flex-col gap-1">
            <p>
              Último Nome <span className="text-red-500">*</span>
            </p>

            <input
              type="text"
              {...register("lastName", {
                required: "Último nome é obrigatório",
              })}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="Digite o último nome"
            />

            {errors.lastName && (
              <span className="text-xs text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </label>
        </div>

        <div className="flex w-full gap-4">
          <label className="w-1/2 flex flex-col gap-1">
            <p>
              E-mail<span className="text-red-500">*</span>
            </p>

            <input
              type="email"
              {...register("email", {
                required: "E-mail é obrigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "E-mail inválido",
                },
              })}
              className="border px-4 py-2 rounded-md w-full"
              placeholder="Digite o e-mail"
            />

            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="w-1/2 flex flex-col gap-1">
            <p>
              Níveis de Acesso <span className="text-red-500">*</span>
            </p>

            <div className="border px-4 py-2 rounded-md w-full">
              <select
                {...register("roleId", {
                  required: "Selecione um nível de acesso",
                })}
                className="w-full outline-none bg-transparent"
                disabled={loading}>
                <option value="">Selecione o nível de acesso</option>

                {roles?.map((role: UserRole) => (
                  <option
                    key={role.id_usuarios_funcoes}
                    value={role.id_usuarios_funcoes}>
                    {role.usuario_funcao}
                  </option>
                ))}
              </select>
            </div>

            {errors.roleId && (
              <span className="text-xs text-red-500">
                {errors.roleId.message}
              </span>
            )}
          </label>
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="py-1 px-4 min-w-44 flex items-center justify-center cursor-pointer transition-all duration-300 bg-primary-500 border border-primary-500 text-white rounded-md hover:bg-transparent hover:text-primary-500">
            {loading ? (
              <div className="border-t-2 border border-l-2 rounded-full animate-spin w-4 h-4"></div>
            ) : (
              "Adicionar Usuário"
            )}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}
