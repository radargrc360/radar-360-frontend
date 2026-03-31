/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChevronDown,
  CircleCheck,
  Clock2,
  Database,
  Download,
  LayoutGrid,
  Menu,
  Plus,
  Search,
  Settings,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import CreateRiskRegisterOne from "./components/CreateRiskRegisterOne";
import CreateRiskRegisterTwo from "./components/CreateRiskRegisterTwo";
import CreateRiskRegisterThree from "./components/CreateRiskRegisterThree";
import type { OptionType } from "@atlaskit/select";
import api from "@/src/app/api/config";
import { useRiscosByCliente } from "@/src/app/hooks/useGetClientRisks";
import useGetClientData from "@/src/app/hooks/useGetClientData";
import RiskCard from "./components/RiskCard";
import { toast, ToastContainer } from "react-toastify";
import { RisksTable } from "./components/RisksTable";

type StepOneData = {
  titulo: string;
  descricao_risco: string;
};

type StepTwoData = {
  categoria_risco_fk_id: number | string;
  categora_sub_risco_fk_id: number | string;
  departamento_organizacional_id: number | string;
  responsible?: OptionType | null;
};

type StepThreeData = {
  fonte: string;
  causa: string;
  consequencia: string;
  probabilidade: number | string;
  impacto: number | string;
  score: string;
  arquivo_de_evidencias?: FileList;
};

type RiskRegisterData = {
  stepOne?: StepOneData;
  stepTwo?: StepTwoData;
  stepThree?: StepThreeData;
};

type CreateRiskPayload = {
  empresa_id: number;
  titulo: string;
  descricao_risco: string;
  categoria_risco_fk_id: number;
  categora_sub_risco_fk_id: number;
  departamento_organizacional_id: number;
  fonte: string;
  causa: string;
  consequencia: string;
  probabilidade: number;
  impacto: number;
  score: string;
  niveis_aceitacao_id: number;
  apetite_risco_id: number;
  arquivo_de_evidencias: string;
  responsavel: string;
  status_riscos: string;
};

function mapRiskRegisterToPayload(
  data: RiskRegisterData,
  clientData: ReturnType<typeof useGetClientData>["clientData"],
): CreateRiskPayload {
  if (!data.stepOne || !data.stepTwo || !data.stepThree) {
    throw new Error("Dados incompletos para criação do risco");
  }

  return {
    empresa_id: clientData!.message.id_clientes,
    titulo: data.stepOne.titulo,
    descricao_risco: data.stepOne.descricao_risco,

    categoria_risco_fk_id: Number(data.stepTwo.categoria_risco_fk_id),
    categora_sub_risco_fk_id: Number(data.stepTwo.categora_sub_risco_fk_id),
    departamento_organizacional_id: Number(
      data.stepTwo.departamento_organizacional_id,
    ),

    fonte: data.stepThree.fonte,
    causa: data.stepThree.causa,
    consequencia: data.stepThree.consequencia,

    probabilidade: Number(data.stepThree.probabilidade),
    impacto: Number(data.stepThree.impacto),
    score: data.stepThree.score,

    niveis_aceitacao_id: 2,
    apetite_risco_id: 2,

    arquivo_de_evidencias: data.stepThree.arquivo_de_evidencias?.item(0)
      ? data.stepThree.arquivo_de_evidencias.item(0)!.name
      : "",

    responsavel: data.stepTwo.responsible?.label ?? "",
    status_riscos: "Identificado",
  };
}

export default function RiskRegister() {
  const [riskData, setRiskData] = useState<RiskRegisterData>({});

  const { clientData } = useGetClientData();

  const { error, loading, riscos } = useRiscosByCliente(
    clientData?.message.id_clientes,
  );

  const riskDash = [
    {
      icon: <Database size={18} />,
      title: "Total de Risco",
      stat: riscos.length,
    },
    {
      icon: <TriangleAlert size={18} />,
      title: "Riscos Críticos",
      stat: riscos.filter((risk: { score: string }) => risk.score === "Crítico")
        .length,
    },
    {
      icon: <Clock2 size={18} />,
      title: "Em Avaliação",
      stat: 0,
    },
    {
      icon: <Settings size={18} />,
      title: "Em Execução",
      stat: 0,
    },
    {
      icon: <CircleCheck size={18} />,
      title: "Mitigado",
      stat: 0,
    },
  ];

  const [openStepOne, setStepOneOpen] = useState(false);
  const [openStepTwo, setStepTwoOpen] = useState(false);
  const [openStepThree, setStepThreeOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const filteredRisks = riscos.filter((risk) => {
    const matchesSearch =
      risk.titulo.toLowerCase().includes(search.toLowerCase()) ||
      risk.codigo_risco.toLowerCase().includes(search.toLowerCase()) ||
      risk.responsavel.toLowerCase().includes(search.toLowerCase());

    const matchesSeverity = severityFilter
      ? risk.score === severityFilter
      : true;

    const matchesStatus = statusFilter
      ? risk.status_riscos === statusFilter
      : true;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleSubmit = async (data: RiskRegisterData) => {
    try {
      const payload = mapRiskRegisterToPayload(data, clientData);

      const response = await api.post("/riscos", payload);

      if (response.status === 201) {
        toast.success("Risco criado com sucesso!");
      }
    } catch (error: any) {
      if (error?.response && error.response.status === 403) {
        toast.error(
          "Erro ao criar risco. Verifique os dados e tente novamente.",
        );
      }
      console.error("Erro ao criar risco:", error);
    }
  };

  return (
    <div className="w-full min-h-svh bg-white rounded-2xl p-5 flex flex-col gap-5">
      <ToastContainer />
      <nav className="text-xs text-gray-400">
        Registro de Risco /{" "}
        <span className="text-primary-100 font-semibold">Registo de Risco</span>
      </nav>

      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col w-full">
          <h1 className="text-dark text-xl font-bold">Registro de Risco</h1>
          <p className="text-gray-400 text-sm">
            Gerencie e monitore riscos de privacidade em toda a sua organização
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="secondary-btn gap-2 px-4 py-2 flex items-center"
            onClick={() => {}}
            disabled>
            <Download size={18} /> Exportar <ChevronDown size={16} />
          </button>

          <button
            className="primary-btn min-w-52 gap-2"
            onClick={() => setStepOneOpen(true)}>
            <Plus size={18} /> Registar Novo Risco
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-5 w-full gap-4 text-dark items-center">
        {riskDash.map((item, id) => (
          <li
            key={id}
            className="flex flex-col gap-1 p-6 rounded-2xl w-full h-32 bg-gray-100 shadow-md">
            <span className="text-gray-500 flex items-center gap-2 font-medium">
              {item.icon} {item.title}
            </span>

            <p className="font-semibold text-3xl">{item.stat}</p>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 min-h-96 shadow-md rounded-2xl bg-white border border-gray-100 p-6">
        <nav className="w-full flex items-center gap-4">
          <div className="bg-gray-100 flex items-center text-gray-500 gap-2 px-4 py-2 rounded-lg w-full">
            <Search size={18} />{" "}
            <input
              type="search"
              className="outline-none w-full"
              placeholder="Pesquisar por nome, ID ou responsável..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ul className="text-gray-500 flex gap-3">
            <li>
              <button
                className={`border rounded-lg p-2 ${
                  viewType === "list" ? "bg-gray-200" : "border-gray-300"
                }`}
                onClick={() => setViewType("list")}>
                <Menu />
              </button>
            </li>
            <li>
              <button
                className={`border rounded-lg p-2 ${
                  viewType === "grid" ? "bg-gray-200" : "border-gray-300"
                }`}
                onClick={() => setViewType("grid")}>
                <LayoutGrid />
              </button>
            </li>

            <li className="border border-gray-300 rounded-lg p-2 w-32">
              <select
                className="outline-none w-full"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}>
                <option value="">Gravidade</option>
                <option value="Crítico">Crítico</option>
                <option value="Alto">Alto</option>
                <option value="Médio">Médio</option>
                <option value="Baixo">Baixo</option>
              </select>
            </li>

            <li className="border border-gray-300 rounded-lg p-2 w-24">
              <select
                className="outline-none w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Estado</option>
                <option value="Identificado">Identificado</option>
                <option value="Em Avaliação">Em Avaliação</option>
                <option value="Em Execução">Em Execução</option>
                <option value="Mitigado">Mitigado</option>
              </select>
            </li>
          </ul>
        </nav>

        <div className="flex w-full h-full my-auto items-center justify-center">
          {loading ? (
            <p className="">Carregando riscos...</p>
          ) : error ? (
            <p className="text-red-500">Erro ao carregar riscos: {error}</p>
          ) : null}

          {filteredRisks.length > 0 && loading === false ? (
            viewType === "grid" ? (
              <div className="w-full h-full grid grid-cols-3 gap-4">
                {filteredRisks.map((risco) => (
                  <RiskCard
                    key={risco.riscos_id}
                    id={risco.riscos_id}
                    titulo={risco.titulo}
                    status_riscos={risco.status_riscos}
                    riskId={risco.codigo_risco}
                    responsavel={risco.responsavel}
                    responsibleImage="/user.png"
                    unit={risco.departamento_organizacional_id.toString()}
                    categoria_risco_fk_id={risco.categoria_risco_fk_id}
                    score={risco.score}
                    updatedAt={new Date(risco.risco_update)}
                    type={"grid"}
                  />
                ))}
              </div>
            ) : (
              <RisksTable data={filteredRisks} />
            )
          ) : (
            <p className="text-gray-500">Nenhum risco encontrado.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 shadow-md rounded-2xl bg-white border border-gray-100 p-6">
        <div className="flex flex-col w-full">
          <h1 className="text-dark text-xl font-semibold">Formulário Rápido</h1>
          <p className="text-gray-400 text-sm">
            Adicione um novo risco rapidamente com herança automática do DNA
          </p>
        </div>

        <form className="flex flex-col w-full gap-3 items-end">
          <div className="flex flex-wrap w-full gap-4">
            <label className="text-gray-500 flex flex-col w-full max-w-sm">
              <p className="font-medium">
                Nome do Risco <span className="text-red-500 text-lg">*</span>
              </p>

              <input
                type="text"
                placeholder="Digite o nome do risco"
                className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
              />
            </label>

            <label className="text-gray-500 flex flex-col w-full max-w-sm">
              <p className="font-medium">
                Descrição <span className="text-red-500 text-lg">*</span>
              </p>

              <input
                type="text"
                placeholder="Breve descrição"
                className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
              />
            </label>

            <label className="text-gray-500 flex flex-col w-full max-w-sm">
              <p className="font-medium">
                Responsável <span className="text-red-500 text-lg">*</span>
              </p>

              <div className="flex gap-2 items-center border border-gray-300 rounded-lg px-4 py-2 ">
                <Search
                  size={20}
                  className="text-gray-300"
                />
                <input
                  type="text"
                  placeholder="Selecione o responsável"
                  className="outline-none w-full"
                />
              </div>
            </label>

            <label className="text-gray-500 flex flex-col w-full max-w-sm">
              <p className="font-medium">
                Unidade Organizacional{" "}
                <span className="text-red-500 text-lg">*</span>
              </p>

              <div className="flex gap-2 items-center border border-gray-300 rounded-lg px-4 py-2 ">
                <Search
                  size={20}
                  className="text-gray-300"
                />
                <input
                  type="text"
                  placeholder="Selecione a unidade organizacional"
                  className="outline-none w-full"
                />
              </div>
            </label>
          </div>

          <button
            className="w-fit primary-btn"
            type="submit">
            Guardar
          </button>
        </form>
      </div>

      <CreateRiskRegisterOne
        open={openStepOne}
        onClose={() => setStepOneOpen(false)}
        onSubmit={(data: StepOneData) => {
          setRiskData((prev) => ({
            ...prev,
            stepOne: data,
          }));

          setStepOneOpen(false);
          setStepTwoOpen(true);
        }}
      />

      <CreateRiskRegisterTwo
        open={openStepTwo}
        onClose={() => setStepTwoOpen(false)}
        handleBack={() => {
          setStepTwoOpen(false);
          setStepOneOpen(true);
        }}
        onSubmit={(data: StepTwoData) => {
          setRiskData((prev) => ({
            ...prev,
            stepTwo: data,
          }));

          setStepTwoOpen(false);
          setStepThreeOpen(true);
        }}
      />

      <CreateRiskRegisterThree
        open={openStepThree}
        onClose={() => setStepThreeOpen(false)}
        handleBack={() => {
          setStepThreeOpen(false);
          setStepTwoOpen(true);
        }}
        onSubmit={(data) => {
          handleSubmit({ ...riskData, stepThree: data });

          setStepThreeOpen(false);
          setRiskData({});
        }}
      />
    </div>
  );
}
