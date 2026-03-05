"use client";

import { useForm } from "react-hook-form";
import RiskRegisterModal from "./RiskRegisterModal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RiskFormData) => void;
}

type RiskFormData = {
  titulo: string;
  descricao_risco: string;
};

export default function CreateRiskRegisterOne({
  open,
  onClose,
  onSubmit,
}: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RiskFormData>({
    mode: "onSubmit",
  });

  return (
    <RiskRegisterModal
      open={open}
      onClose={onClose}
      title="Registar Novo Risco">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-semibold text-dark">Informações Básicas</h2>

        <label className="flex flex-col text-gray-600 gap-2">
          <span className="font-medium text-sm">
            Nome do Risco<span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            className={`border rounded-lg px-4 py-2 outline-none ${
              errors.titulo ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Digite o nome do risco"
            {...register("titulo", {
              required: "O nome do risco é obrigatório",
              minLength: {
                value: 3,
                message: "O nome deve ter pelo menos 3 caracteres",
              },
            })}
          />
          {errors.titulo && (
            <span className="text-red-500 text-xs">
              {errors.titulo.message}
            </span>
          )}
        </label>

        <label className="flex flex-col text-gray-600 gap-2">
          <span className="font-medium text-sm">
            Descrição detalhada<span className="text-red-500">*</span>
          </span>
          <textarea
            className={`border rounded-lg px-4 py-2 outline-none resize-none ${
              errors.descricao_risco ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Descreva as causas, contexto e possíveis consequências do risco."
            {...register("descricao_risco", {
              required: "A descrição do risco é obrigatória",
              minLength: {
                value: 10,
                message: "A descrição deve ter pelo menos 10 caracteres",
              },
            })}
          />
          {errors.descricao_risco && (
            <span className="text-red-500 text-xs">
              {errors.descricao_risco.message}
            </span>
          )}
        </label>

        <div className="flex w-full justify-between items-center">
          <p className="text-gray-400 text-sm">Etapa 1 de 3</p>

          <button
            className="primary-btn w-fit"
            type="submit">
            Continuar
          </button>
        </div>
      </form>
    </RiskRegisterModal>
  );
}
