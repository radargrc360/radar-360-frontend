"use client";

import useGetClientData from "@/src/app/hooks/useGetClientData";
import { useRiscosByCliente } from "@/src/app/hooks/useGetClientRisks";
import { Link } from "@/src/i18n/navigation";
import { ArrowRight, Database } from "lucide-react";

const SCORE_ORDER: Record<string, number> = {
  Alto: 1,
  Médio: 2,
  Baixo: 3,
};

export default function MainRisks() {
  const { clientData } = useGetClientData();
  const { riscos, loading } = useRiscosByCliente(
    clientData?.message.id_clientes,
  );

  const principaisRiscos = [...riscos]
    .sort((a, b) => {
      const scoreDiff =
        (SCORE_ORDER[a.score] || 99) - (SCORE_ORDER[b.score] || 99);

      if (scoreDiff !== 0) return scoreDiff;

      return (
        new Date(b.risco_update).getTime() - new Date(a.risco_update).getTime()
      );
    })
    .slice(0, 5);

  return (
    <div className="border border-gray-200 rounded-2xl flex flex-col gap-4 p-6 w-full shadow-md shadow-dark/8 min-h-96">
      <div className="flex justify-between items-center gap-18">
        <div>
          <h2 className="text-lg font-semibold text-dark">
            Os Principais Riscos
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Estes são os riscos que merecem atenção primeiro. Resolve os
            críticos e monitora os médios regularmente.
          </p>
        </div>

        {principaisRiscos.length > 4 && (
          <Link
            href={"/dashboard/risk-register"}
            className="flex font-medium text-primary-100 text-sm gap-2 w-60 justify-between hover:bg-primary-100/10 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer items-center">
            Explorar todos <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>

      <ul className="w-full h-full overflow-y-auto">
        {loading && (
          <li className="text-sm text-gray-400 px-4 py-3">
            A carregar riscos...
          </li>
        )}

        {!loading && principaisRiscos.length === 0 && (
          <li className="w-full flex flex-col items-center justify-center my-auto h-full">
            <h1 className="text-lg text-dark font-semibold">
              Nenhum risco cadastrado.
            </h1>
            <p className="text-gray-500 ">
              Crie o primeiro risco para começar a visualizar tendências e
              níveis de criticidade.
            </p>
          </li>
        )}

        {principaisRiscos.slice(0, 4).map((risco) => (
          <li key={risco.riscos_id}>
            <Link
              href={`/dashboard/risk-register/${risco.riscos_id}`}
              className="flex w-full gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-all duration-300 cursor-pointer">
              <Database
                className="text-dark"
                size={20}
              />

              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-dark">
                  {risco.titulo}{" "}
                  <span
                    className={`rounded-md px-2 text-sm font-medium border ml-2 ${
                      risco.score === "Alto"
                        ? "bg-red-50 border-red-400 text-red-600"
                        : risco.score === "Médio"
                          ? "bg-yellow-50 border-yellow-400 text-yellow-600"
                          : "bg-green-50 border-green-400 text-green-600"
                    }`}>
                    {risco.score}
                  </span>
                </h3>

                <p className="text-sm text-gray-500">
                  Categoria:{" "}
                  <span className="bg-gray-200 text-gray-600 rounded-md px-2 text-sm font-medium">
                    #{risco.categoria_risco_fk_id}
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  Proprietário:{" "}
                  <span className="text-dark font-medium">
                    {risco.responsavel}
                  </span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
