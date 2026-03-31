/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import RiskRegisterModal from "./RiskRegisterModal";
import {
  CreatableSelect,
  type OptionType,
  type ValueType,
} from "@atlaskit/select";
import { useGetCategoriaRiscoByClientId } from "@/src/app/hooks/useGetCategoriaRiscoByClientId";
import { useRiskSubCategories } from "@/src/app/hooks/useRiskSubCategory";
import useGetClientData from "@/src/app/hooks/useGetClientData";
import { useGetDepartamentosCliente } from "@/src/app/hooks/useGetDepartamentoByClientId";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RiskStepTwoFormData) => void;
  handleBack: () => void;
}

type RiskStepTwoFormData = {
  categoria_risco_fk_id: number;
  categora_sub_risco_fk_id: number;
  departamento_organizacional_id: string;
  responsible: {
    label: string;
    value: string;
  } | null;
};

export default function CreateRiskRegisterTwo({
  open,
  onClose,
  onSubmit,
  handleBack,
}: ModalProps) {
  const [isLoading] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([
    { label: "Joel Germano", value: "joel" },
    { label: "Maria Borges", value: "maria" },
  ]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RiskStepTwoFormData>({
    mode: "onSubmit",
  });

  function handleCreate(inputValue: string) {
    const newOption = { label: inputValue, value: inputValue.toLowerCase() };
    setOptions((prev) => [...prev, newOption]);
  }

  const { clientData } = useGetClientData();

  const selectedCategoryId = watch("categoria_risco_fk_id");

  const { categorias: categories, loading } = useGetCategoriaRiscoByClientId({
    idCliente: clientData?.message.id_clientes,
  });

  const { data, loading: subCategoriesLoading } = useRiskSubCategories({
    categoriaDeRiscoId: selectedCategoryId,
  });

  const { departamentos } = useGetDepartamentosCliente(
    clientData?.message.id_clientes,
  );

  useEffect(() => {
    setValue("categora_sub_risco_fk_id", undefined as any);
  }, [selectedCategoryId, setValue]);

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
        <h2 className="font-semibold text-dark">
          Classificação e Responsabilidade
        </h2>

        <div className="flex w-full gap-4">
          <label className="flex flex-col text-gray-600 gap-2 w-full">
            <span className="font-medium text-sm">
              Categoria<span className="text-red-500">*</span>
            </span>
            <div
              className={`border rounded-lg px-4 py-2 ${
                errors.categoria_risco_fk_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}>
              <select
                className="w-full outline-none"
                {...register("categoria_risco_fk_id", {
                  required: "A categoria é obrigatória",
                  valueAsNumber: true,
                })}>
                <option value="">
                  {loading
                    ? "A carregar categorias..."
                    : "Selecionar a categoria de risco"}
                </option>
                {categories.map((category) => (
                  <option
                    key={category.id_lista_de_categoria_de_risco}
                    value={category.id_lista_de_categoria_de_risco}>
                    {category.categoria}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoria_risco_fk_id && (
              <span className="text-red-500 text-xs">
                {errors.categoria_risco_fk_id.message}
              </span>
            )}
          </label>

          <label className="flex flex-col text-gray-600 gap-2 w-full">
            <span className="font-medium text-sm">
              Subcategoria<span className="text-red-500">*</span>
            </span>
            <div
              className={`border rounded-lg px-4 py-2 ${
                errors.categora_sub_risco_fk_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}>
              <select
                className="w-full outline-none"
                disabled={!selectedCategoryId || subCategoriesLoading}
                {...register("categora_sub_risco_fk_id", {
                  required: "A subcategoria é obrigatória",
                  valueAsNumber: true,
                })}>
                <option value="">
                  {subCategoriesLoading
                    ? "A carregar subcategorias..."
                    : "Selecionar a subcategoria de risco"}
                </option>

                {data.map((sub) => (
                  <option
                    key={sub.id_lista_categoria_sub_de_risco}
                    value={sub.id_lista_categoria_sub_de_risco}>
                    {sub.descricao_categoria_sub}
                  </option>
                ))}
              </select>
            </div>
            {errors.categora_sub_risco_fk_id && (
              <span className="text-red-500 text-xs">
                {errors.categora_sub_risco_fk_id.message}
              </span>
            )}
          </label>
        </div>

        <label className="flex flex-col text-gray-600 gap-2 w-full">
          <span className="font-medium text-sm">
            Unidade Organizacional<span className="text-red-500">*</span>
          </span>
          <div
            className={`border rounded-lg px-4 py-2 ${
              errors.departamento_organizacional_id
                ? "border-red-500"
                : "border-gray-300"
            }`}>
            <select
              className="w-full outline-none"
              {...register("departamento_organizacional_id", {
                required: "A unidade organizacional é obrigatória",
                valueAsNumber: true,
              })}>
              <option value="">Selecionar a unidade organizacional</option>
              {departamentos.map((dept) => (
                <option
                  key={dept.id_departamento}
                  value={dept.id_departamento}>
                  {dept.departamento}
                </option>
              ))}
            </select>
          </div>
          {errors.departamento_organizacional_id && (
            <span className="text-red-500 text-xs">
              {errors.departamento_organizacional_id.message}
            </span>
          )}
        </label>

        <label className="text-gray-600 flex flex-col w-full gap-2">
          <p className="font-medium text-sm">
            Responsável<span className="text-red-500">*</span>
          </p>

          <div
            className={`flex gap-2 items-center border rounded-lg px-4 py-2 ${
              errors.responsible ? "border-red-500" : "border-gray-300"
            }`}>
            <Search size={20} />

            <div className="flex-1">
              <Controller
                name="responsible"
                control={control}
                rules={{
                  required: "O responsável é obrigatório",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    styles={{
                      control: (base: any) => ({
                        ...base,
                        border: "none",
                        boxShadow: "none",
                        background: "transparent",
                        minHeight: "auto",
                        padding: 0,
                      }),
                      indicatorsContainer: () => ({
                        display: "none",
                      }),
                      menu: (base: any) => ({
                        ...base,
                        zIndex: 100,
                      }),
                    }}
                    placeholder="Selecione o responsável por monitorar este risco"
                    isClearable
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    options={options}
                    onCreateOption={handleCreate}
                    value={field.value}
                    onChange={(value: ValueType<OptionType>) =>
                      field.onChange(value)
                    }
                  />
                )}
              />
            </div>
          </div>

          {errors.responsible && (
            <span className="text-red-500 text-xs">
              {typeof errors.responsible.message === "string"
                ? errors.responsible.message
                : "O responsável é obrigatório"}
            </span>
          )}
        </label>

        <div className="flex w-full justify-between items-center">
          <p className="text-gray-400 text-sm">Etapa 2 de 3</p>

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
