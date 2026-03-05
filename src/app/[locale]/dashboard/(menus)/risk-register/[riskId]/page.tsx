"use client";

import { Link } from "@/src/i18n/navigation";
import {
  ArrowLeft,
  Building2,
  Plus,
} from "lucide-react";
import Image from "next/image";

import { use } from "react";
import { EvidenceTable } from "./components/EvidenceTable";
import { useRiscoById } from "@/src/app/hooks/useRiskById";

export default function RiskDetails({
  params,
}: {
  params: Promise<{ riskId: number }>;
}) {
  const { riskId } = use(params);

  const { riscoById } = useRiscoById(riskId);

  const evidencias = [
    {
      id: "1",
      nome: "Relatório de Logs – Core Banking",
      tipo: "Monitoramento e Acompanhamento",
      dataEmissao: "09 de Abril de 2024",
    },
    {
      id: "2",
      nome: "Matriz de Vulnerabilidade 2024",
      tipo: "Avaliação do Risco",
      dataEmissao: "09 de Abril de 2024",
    },
  ];

  return (
    <div className="w-full min-h-svh bg-white rounded-2xl p-5 flex flex-col gap-5">
      <nav className="text-xs text-gray-400">
        Registro de Risco / Lista de Risco /{" "}
        <span className="text-primary-100 font-semibold">
          {riscoById?.titulo}
        </span>
      </nav>

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/risk-register"
          className="text-dark">
          <ArrowLeft size={24} />
        </Link>

        <h1 className="text-dark text-xl font-bold">{riscoById?.titulo}</h1>
        <span className="border border-red-500 rounded-xl px-2 text-red-500 bg-red-500/10">
          Crítico
        </span>
      </div>

      <div className="flex flex-col gap-8 min-h-96 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
        <h1 className="text-lg font-semibold">Detalhe do Risco</h1>
        <div className="flex flex-col gap-1 max-w-2xl">
          <h2 className="text-sm text-gray-500">Descrição:</h2>
          <p className="text-sm font-medium">{riscoById?.descricao_risco}</p>
        </div>

        <hr className="border border-gray-200 w-full" />

        <ul className="flex w-full gap-16 text-sm">
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Categoria:</p>
            <span className="flex gap-2 items-center">
              <p className="w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-400">
                {riscoById?.categoria_risco_fk_id}
              </p>
              <p className="w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-400">
                {riscoById?.categora_sub_risco_fk_id}
              </p>
              <p className="w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-400">
                {riscoById?.codigo_risco}
              </p>
            </span>
          </li>

          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Subcategoria:</p>
            <span className="flex gap-2 items-center">
              <p className="w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-400">
                {riscoById?.categora_sub_risco_fk_id}
              </p>
            </span>
          </li>

          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Responsável:</p>
            <div className="flex items-center gap-2">
              <Image
                src={"/user.png"}
                alt={"responsible"}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="font-medium text-gray-900">
                {riscoById?.responsavel}
              </span>
            </div>
          </li>

          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Unidade Organizacional:</p>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-900">
                {" "}
                {riscoById?.departamento_organizacional_id}
              </span>
            </div>
          </li>
        </ul>

        <hr className="border border-gray-200 w-full" />

        <ul className="flex w-full gap-16 text-sm">
          <li className="flex flex-col gap-2 max-w-78">
            <p className="text-gray-500">Fonte de Risco:</p>
            <p className="text-dark font-medium">{riscoById?.fonte}</p>
          </li>

          <li className="flex flex-col gap-2 max-w-xs">
            <p className="text-gray-500">Causa Raíz:</p>
            <p className="text-dark font-medium">{riscoById?.causa}</p>
          </li>

          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Consequência Potencial:</p>
            <p className="text-dark font-medium">{riscoById?.consequencia}</p>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
        <h1 className="text-dark text-xl font-semibold">Avaliação de Risco</h1>

        <ul className="flex items-center gap-6">
          <li className="rounded-md border border-gray-100 bg-gray-50 p-5 flex flex-col gap-4 w-full max-w-lg">
            <p className="text-gray-500">Probabilidade</p>

            <span className="border w-fit text-sm font-medium border-red-500 bg-red-500/10 text-red-500 px-2 rounded-md">
              Alto
            </span>
          </li>

          <li className="rounded-md border border-gray-100 bg-gray-50 p-5 flex flex-col gap-4 w-full max-w-lg">
            <p className="text-gray-500">Impacto</p>

            <span className="border w-fit text-sm font-medium bg-gray-500/10 text-gray-500 px-2 rounded-md">
              {riscoById?.impacto}
            </span>
          </li>

          <li className="rounded-md border border-gray-100 bg-gray-50 p-5 flex flex-col gap-4 w-full max-w-lg">
            <p className="text-gray-500">Score Final</p>

            <span className="border w-fit text-sm font-medium border-yellow-400 bg-yellow-400/10 text-yellow-500 px-2 rounded-md">
              {riscoById?.score}
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
        <div className="flex justify-between items-center">
          <h1 className="text-dark text-xl font-semibold">
            Evidências Anexadas
          </h1>

          <button className="primary-btn gap-2">
            <Plus size={18} /> Adicionar Evidências
          </button>
        </div>

        <EvidenceTable data={evidencias} />
      </div>
    </div>
  );
}
