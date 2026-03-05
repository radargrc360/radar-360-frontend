"use client";

import { FilePlusCorner } from "lucide-react";
import { useForm } from "react-hook-form";
import RiskRegisterModal from "./RiskRegisterModal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RiskStepThreeFormData) => void;
  handleBack?: () => void;
}

type RiskStepThreeFormData = {
  probabilidade: number;
  impacto: number;
  score: string;
  fonte: string;
  causa: string;
  consequencia: string;
  arquivo_de_evidencias: FileList;
};

export default function CreateRiskRegisterThree({
  open,
  onClose,
  onSubmit,
  handleBack,
}: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RiskStepThreeFormData>({
    mode: "onSubmit",
  });

  return (
    <RiskRegisterModal
      open={open}
      onClose={onClose}
      backBtn
      handleBack={handleBack}
      title="Registar Novo Risco">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-semibold text-dark">Avaliação Inicial</h2>

        <div className="flex w-full gap-4">
          <label className="flex flex-col text-gray-600 gap-2 w-full">
            <span className="font-medium text-sm">
              Probabilidade<span className="text-red-500">*</span>
            </span>
            <div
              className={`border rounded-lg px-4 py-2 ${
                errors.probabilidade ? "border-red-500" : "border-gray-300"
              }`}>
              <select
                className="w-full outline-none"
                {...register("probabilidade", {
                  required: "A probabilidade é obrigatória",
                })}>
                <option value="">Selecionar a probabilidade</option>
                <option value={1}>Baixa</option>
                <option value={2}>Média</option>
                <option value={3}>Alta</option>
              </select>
            </div>
            {errors.probabilidade && (
              <span className="text-red-500 text-xs">
                {errors.probabilidade.message}
              </span>
            )}
          </label>

          <label className="flex flex-col text-gray-600 gap-2 w-full">
            <span className="font-medium text-sm">
              Impacto<span className="text-red-500">*</span>
            </span>
            <div
              className={`border rounded-lg px-4 py-2 ${
                errors.impacto ? "border-red-500" : "border-gray-300"
              }`}>
              <select
                className="w-full outline-none"
                {...register("impacto", {
                  required: "O impacto é obrigatório",
                })}>
                <option value="">Selecionar o impacto</option>
                <option value={1}>Baixo</option>
                <option value={2}>Médio</option>
                <option value={3}>Alto</option>
              </select>
            </div>
            {errors.impacto && (
              <span className="text-red-500 text-xs">
                {errors.impacto.message}
              </span>
            )}
          </label>
        </div>

        <label className="flex flex-col text-gray-600 gap-2 w-full">
          <span className="font-medium text-sm">
            Score<span className="text-red-500">*</span>
          </span>
          <div
            className={`border rounded-lg px-4 py-2 ${
              errors.score ? "border-red-500" : "border-gray-300"
            }`}>
            <select
              className="w-full outline-none"
              {...register("score", {
                required: "O score é obrigatório",
              })}>
              <option value="">Selecionar o score</option>
              <option value="Baixo">Baixo</option>
              <option value="Médio">Médio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>
          {errors.score && (
            <span className="text-red-500 text-xs">{errors.score.message}</span>
          )}
        </label>

        <h2 className="font-semibold text-dark">Contexto e Evidências</h2>

        <label className="flex flex-col text-gray-600 gap-2 w-full">
          <span className="font-medium text-sm">
            Fonte de Risco<span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            className={`border rounded-lg px-4 py-2 ${
              errors.fonte ? "border-red-500" : "border-gray-300"
            }`}
            {...register("fonte", {
              required: "A fonte do risco é obrigatória",
            })}
          />
          {errors.fonte && (
            <span className="text-red-500 text-xs">{errors.fonte.message}</span>
          )}
        </label>

        <label className="flex flex-col text-gray-600 gap-2">
          <span className="font-medium text-sm">
            Causa Raíz<span className="text-red-500">*</span>
          </span>
          <textarea
            className={`border rounded-lg px-4 py-2 resize-none ${
              errors.causa ? "border-red-500" : "border-gray-300"
            }`}
            {...register("causa", {
              required: "A causa raiz é obrigatória",
              minLength: {
                value: 10,
                message: "Mínimo de 10 caracteres",
              },
            })}
          />
          {errors.causa && (
            <span className="text-red-500 text-xs">{errors.causa.message}</span>
          )}
        </label>

        <label className="flex flex-col text-gray-600 gap-2">
          <span className="font-medium text-sm">
            Consequência Potencial<span className="text-red-500">*</span>
          </span>
          <textarea
            className={`border rounded-lg px-4 py-2 resize-none ${
              errors.consequencia ? "border-red-500" : "border-gray-300"
            }`}
            {...register("consequencia", {
              required: "A consequência é obrigatória",
              minLength: {
                value: 10,
                message: "Mínimo de 10 caracteres",
              },
            })}
          />
          {errors.consequencia && (
            <span className="text-red-500 text-xs">
              {errors.consequencia.message}
            </span>
          )}
        </label>

        <div className="flex flex-col text-gray-600 gap-2 w-full">
          <p className="font-medium text-sm">
            Anexar Evidências<span className="text-red-500">*</span>
          </p>

          <label
            className={`border-2 border-dashed rounded-lg h-48 flex flex-col justify-center items-center w-full relative ${
              errors.arquivo_de_evidencias ? "border-red-500" : "border-dark"
            }`}>
            <span className="rounded-full p-2 bg-[#E7ECEF] text-primary-100">
              <FilePlusCorner size={24} />
            </span>

            <p className="text-dark font-semibold">
              Clique para carregar o documento
            </p>

            <p className="text-gray-400 text-sm">JPEG, PNG, PDF, até 50MB</p>

            <input
              type="file"
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
              {...register("arquivo_de_evidencias", {
                required: "O ficheiro é obrigatório",
              })}
            />
          </label>

          {errors.arquivo_de_evidencias && (
            <span className="text-red-500 text-xs">
              {errors.arquivo_de_evidencias.message}
            </span>
          )}
        </div>

        <div className="flex w-full justify-between items-center">
          <p className="text-gray-400 text-sm">Etapa 3 de 3</p>

          <button
            className="primary-btn w-fit"
            type="submit">
            Criar Registo de Risco
          </button>
        </div>
      </form>
    </RiskRegisterModal>
  );
}
