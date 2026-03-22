"use client";

import {
  Activity,
  Calendar,
  CircleCheck,
  FileInput,
  RotateCcw,
  Settings,
  Target,
  TriangleAlert,
  Zap,
} from "lucide-react";
import Dashcard, { DashcardProps } from "./components/Dashcard";
import RiskMatrix from "./components/RiskMatrix";
import CriticalAlerts from "./components/CriticalAlerts";
import MainRisks from "./components/MainRisks";
import RecentsActivities from "./components/RecentsActivities";
import { Link } from "@/src/i18n/navigation";
import { useRiscosByCliente } from "../../hooks/useGetClientRisks";
import useGetClientData from "../../hooks/useGetClientData";

export default function HomePage() {
  const { clientData } = useGetClientData();
  const { riscos } = useRiscosByCliente(clientData?.mensagem.id_clientes);

  const riscosAtivos = riscos.filter((r) =>
    ["Identificado", "Em Tratamento"].includes(r.status_riscos),
  );

  const riscosCriticos = riscos.filter((r) => r.score === "Alto");

  const riscosDentroApetite = riscos.filter(
    (r) => r.score === "Baixo" || r.score === "Médio",
  );

  const apetitePercentual = riscos.length
    ? Math.round((riscosDentroApetite.length / riscos.length) * 100)
    : 0;

  const mediaScore =
    riscos.reduce((acc, r) => acc + r.probabilidade * r.impacto, 0) /
    (riscos.length || 1);

  const resiliencia = Math.round(100 - (mediaScore / 25) * 100);

  const hoje = new Date();
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(hoje.getDate() - 30);

  const avaliacoesRecentes = riscos.filter(
    (r) => new Date(r.risco_update) >= trintaDiasAtras,
  ).length;

  const dashcardInfo: DashcardProps[] = [
    {
      title: "Apetite ao Risco",
      icon: <Target className="w-5 h-5" />,
      warnText:
        apetitePercentual >= 70 ? "Dentro da Tolerância" : "Fora da Tolerância",
      description: {
        number: `${apetitePercentual}%`,
      },
    },
    {
      title: "Riscos Ativos",
      icon: <Activity className="w-5 h-5" />,
      statNumber: riscosAtivos.length,
      description: {
        text: "em monitorização",
      },
    },
    {
      title: "Riscos Críticos",
      icon: <TriangleAlert className="w-5 h-5" />,
      statNumber: riscosCriticos.length,
      description: {
        text: "Requerem resposta imediata",
      },
    },
    {
      title: "Pontuação de Resiliência",
      icon: <Zap className="w-5 h-5" />,
      statNumber: `${resiliencia}%`,
      description: {
        text: "capacidade de resposta ao risco",
      },
    },
    {
      title: "Ações em Atraso",
      icon: <RotateCcw className="w-5 h-5" />,
      statNumber: "—",
      description: {
        text: "Endpoint em falta",
      },
    },
    {
      title: "Avaliações",
      icon: <CircleCheck className="w-5 h-5" />,
      statNumber: avaliacoesRecentes,
      description: {
        text: "últimos 30 dias",
      },
    },
  ];

  const configured =
    clientData?.mensagem.cliente_industria_id &&
    clientData?.mensagem.cliente_jurisdicao_id &&
    clientData?.mensagem.cliente_matriz_escala_id != null;

  return (
    <div className="w-full min-h-svh bg-white rounded-2xl p-5 flex flex-col gap-5">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-dark text-xl font-bold">
            Bem-vindo(a) de volta, {clientData?.mensagem.nome_empresa}!
          </h1>
          <p className="text-gray-400 text-sm">
            Aqui está o resumo do teu ambiente de risco dos últimos 30 dias.
          </p>
        </div>

        <div className="flex gap-2 items-center">
          {configured ? (
            <>
              <button className="border border-gray-300 flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <Calendar className="text-dark" />{" "}
                <span className="text-dark text-sm font-medium">
                  Últimos 30 dias
                </span>
              </button>
              <button className="bg-primary-100 text-white flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <FileInput className="" />
                <span className="text-sm font-medium">
                  Gerar Relatório de Risco
                </span>
              </button>{" "}
            </>
          ) : (
            <Link
              href={"/dashboard/setup/organizational"}
              className="primary-btn flex gap-2">
              <Settings size={18} /> Iniciar configuração
            </Link>
          )}

          {/* */}
        </div>
      </div>

      <div className="grid grid-cols-6 w-full gap-3">
        {dashcardInfo.map((card, index) => (
          <Dashcard
            key={index}
            title={card.title}
            icon={card.icon}
            statNumber={card.statNumber}
            warnText={card.warnText}
            description={card.description}
          />
        ))}
      </div>

      <div className="w-full gap-5 grid grid-cols-2">
        <RiskMatrix />
        <CriticalAlerts />
  
        <MainRisks />
        <RecentsActivities />
      </div>

      <div className="flex flex-col gap-4 text-dark">
        <h2 className="text-lg font-semibold text-dark">Estado do Módulo</h2>

        <ul className="w-full grid grid-cols-4 gap-5 h-32">
          <li className="flex flex-col gap-2 bg-[#F9FBFC] border border-[#EAECF0] rounded-2xl p-6 shadow-md shadow-dark/8">
            <h1 className="text-[#6B7280]">Governança e Taxonomia</h1>
            <span className="bg-[#EEF7FF] px-2 border border-[#89CDFF] rounded-full text-sm text-primary-100 w-fit">
              Configuração completa
            </span>
          </li>

          <li className="flex flex-col  bg-[#F9FBFC] border border-[#EAECF0] rounded-2xl p-6 shadow-md shadow-dark/8">
            <h1 className="text-[#6B7280]">Registro de Riscos</h1>
            <p className="text-2xl font-semibold">{riscos.length}</p>
            <p className="text-xs text-gray-500">Riscos Ativos</p>
          </li>

          <li className="flex flex-col  bg-[#F9FBFC] border border-[#EAECF0] rounded-2xl p-6 shadow-md shadow-dark/8">
            <h1 className="text-[#6B7280]">BRE</h1>
            <p className="text-2xl font-semibold">
              {resiliencia}%{" "}
              {resiliencia >= 70 ? (
                <span className="bg-[#F0FDF5] px-2 border border-green-400 rounded-full text-sm text-green-400 w-fit">
                  Bom
                </span>
              ) : (
                "Fora da Tolerância"
              )}
            </p>
            <p className="text-xs text-gray-500">Avalie o preparo da empresa</p>
          </li>

          <li className="flex flex-col gap-2 bg-[#F9FBFC] border border-[#EAECF0] rounded-2xl p-6 shadow-md shadow-dark/8">
            <h1 className="text-[#6B7280]">Apetite ao Risco</h1>
            {apetitePercentual >= 70 ? (
              <span className="bg-green-200 text-green-800 px-2 rounded-lg w-fit text-sm font-medium">
                {" "}
                Dentro da Tolerância{" "}
              </span>
            ) : (
              "Fora da Tolerância"
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
