"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SetupTabs } from "../components/SetupTabs";
import { ProgressBar } from "../components/ProgressBar";
import FinishedModal from "./components/FinishedModal";
import { useGetEscalasMatriz } from "@/src/app/hooks/useGetMatrizEscala";
import useGetClientData from "@/src/app/hooks/useGetClientData";
import api from "@/src/app/api/config";
import { toast, ToastContainer } from "react-toastify";

export default function TaxonomySetup() {
  const [activeTab, setActiveTab] = useState("matriz");
  const [finishedModalOpen, setfinishedModalOpen] = useState(false);
  const [step] = useState(5);
  const [selectedEscalaId, setSelectedEscalaId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { escalas } = useGetEscalasMatriz();
  const { clientData } = useGetClientData();

  const tabs = [
    {
      id: "organizacao",
      label: "Configuração Organizacional",
      href: "/dashboard/setup/organizational",
    },
    {
      id: "taxonomia",
      label: "Taxonomia de Risco",
    },
    { id: "matriz", label: "Matriz de Risco", href: "/dashboard/setup/matrix" },
  ];

  const handleSubmit = async () => {
    if (!selectedEscalaId) return;

    try {
      setSubmitting(true);

      const response = await api.patch(
        `/clientes/${clientData?.mensagem.id_clientes}/redifinir-escala-matriz`,
        {
          cliente_matriz_escala_id: String(selectedEscalaId),
        },
      );

      if (response.status === 202) {
        toast.success("Escala da matriz redefinida com sucesso!");
        setfinishedModalOpen(true);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        err?.response?.data?.mensagem || "Erro ao redefinir a escala da matriz",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full min-h-svh bg-white rounded-2xl p-5 flex flex-col gap-6 text-dark">
        <nav className="text-xs text-gray-400">
          Governança de Risco /{" "}
          <span className="text-primary-100 font-semibold">
            Matriz e Thresholds
          </span>
        </nav>

        <div className="flex flex-col gap-6">
          <SetupTabs
            tabs={tabs}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
          />

          <ProgressBar currentStep={step} />

          {step === 5 && (
            <form className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">Matrizes de Risco</h1>
                  <p className="text-sm text-gray-500">
                    Selecione a matriz que melhor se adapta à complexidade e ao
                    porte da sua organização
                  </p>
                </div>
                <ul className="max-w-full w-full grid grid-cols-3 gap-6">
                  {escalas?.map((escala) => (
                    <li
                      key={escala.risco_escala_id}
                      className="max-w-xl w-full border border-gray-200 flex flex-col gap-4 p-6 rounded-lg">
                      <div className="flex w-full items-center justify-between">
                        <h2 className="text-xl font-semibold">
                          {escala.risco_escala_nome}
                        </h2>
                      </div>

                      <hr className="w-full border-gray-200" />

                      <p className="text-sm ">
                        {escala.risco_escala_descricao}
                      </p>

                      <div className="px-3 py-2 rounded-lg flex flex-col bg-gray-100 text-sm">
                        <p className="text-gray-500">Escala de Avaliação</p>
                        <p className="font-medium">
                          {escala.classifacoes.length} Níveis:{" "}
                          {escala.classifacoes
                            .map((c) => c.risco_classificacao_nome)
                            .join(", ")}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedEscalaId(escala.risco_escala_id)
                        }
                        className={`rounded-md px-4 py-2 border font-medium duration-300 transition-all 
    ${
      selectedEscalaId === escala.risco_escala_id
        ? " bg-primary-100 text-white hover:scale-105 "
        : "  text-primary-100 border-primary-100"
    }
  `}>
                        {selectedEscalaId === escala.risco_escala_id
                          ? "Matriz Selecionada"
                          : "Selecionar Matriz"}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center">
                  <Link
                    href="/dashboard/setup/taxonomy"
                    className="rounded-lg border px-4 py-2 flex items-center gap-2 text-dark font-semibold hover:scale-105 transition-all">
                    <ArrowLeft size={18} /> Voltar
                  </Link>
                  <p className="text-sm text-gray-500">Etapa 3 de 3</p>

                  <button
                    type="button"
                    disabled={!selectedEscalaId || submitting}
                    className="primary-btn flex gap-2"
                    onClick={handleSubmit}>
                    {submitting ? "A guardar..." : "Continuar"}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        <FinishedModal open={finishedModalOpen} />
      </div>
    </>
  );
}
