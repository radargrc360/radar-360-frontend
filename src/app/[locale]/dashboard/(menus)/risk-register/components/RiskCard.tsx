"use client";

import { Link } from "@/src/i18n/navigation";
import { EllipsisVertical, Building2 } from "lucide-react";
import Image from "next/image";

interface RiskCardProps {
  id: number;
  titulo: string;
  status_riscos: string;
  riskId: string;
  responsavel: string;
  responsibleImage?: string;
  unit: string;
  categoria_risco_fk_id: number;
  score: string;
  updatedAt: Date;
  type: "grid" | "list";
}

export default function RiskCard({
  id,
  titulo: title,
  status_riscos: severity,
  riskId,
  responsavel: responsible,
  responsibleImage = "/images/user.png",
  unit,
  categoria_risco_fk_id: category,
  score,
  updatedAt,
}: RiskCardProps) {
  return (
    <Link
      href={`/dashboard/risk-register/${id}`}
      className="w-full rounded-xl border bg-white hover:bg-gray-50 transition-all duration-300 p-5 shadow-sm ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

          <span
            className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium  ${
              severity === "Crítico"
                ? "bg-red-500/10 text-red-500 border border-red-500"
                : severity === "Em Avaliação"
                  ? "bg-orange-500 text-orange-500 border border-orange-500"
                  : severity === "Em Execução"
                    ? "bg-primary-100/10 text-primary-100 border border-primary-100"
                    : "bg-gray-500/10 text-gray-500 border border-gray-500"
            }`}>
            {severity}
          </span>
        </div>

        <button className="rounded-md p-1 hover:bg-gray-100 border border-gray-400 text-dark cursor-pointer">
          <EllipsisVertical size={16} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">ID de risco:</span>
          <span className="font-medium text-gray-900">{riskId}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Responsável:</span>
          <div className="flex items-center gap-2">
            <Image
              src={responsibleImage}
              alt={responsible}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="font-medium text-gray-900">{responsible}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Unidade:</span>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-gray-900">{unit}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Categoria:</span>
          <span className="w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            {category}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Score:</span>
          <span className="w-fit rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600 border border-red-500">
            {score}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Última Atualização</span>
          <span className="font-medium text-gray-900">
            {new Date(updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
