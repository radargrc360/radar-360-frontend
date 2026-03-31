"use client";

import { useEffect, useState } from "react";
import { Link } from "@/src/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Flag,
  Search,
  Sparkles,
} from "lucide-react";
import { SetupTabs } from "../components/SetupTabs";
import { ProgressBar } from "../components/ProgressBar";
import ResumeModal from "./components/ResumeModal";
import { useGetIndustriasPrincipais } from "@/src/app/hooks/useGetIndustriasPrincipais";
import { toast, ToastContainer } from "react-toastify";
import { JurisdicaoActiva } from "@/src/app/types/juridisdicao";
import { useGetJurisdicaoActivaComFrameworks } from "@/src/app/hooks/useGetJurisdicaoActivaComFrameworks";
import useGetClientData from "@/src/app/hooks/useGetClientData";
import api from "@/src/app/api/config";
import { useGetJurisdicaoPorId } from "@/src/app/hooks/useGetJurisdicaoPorId";
import { useGetClientFrameworksTodos } from "@/src/app/hooks/useGetFrameworkTodos";
import ModalLayout from "@/src/app/ui/dashboard/ModalLayout";

export default function OrganizacionalSetup() {
  const [activeTab, setActiveTab] = useState("organizacao");
  const [step, setStep] = useState(1);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedIndustria, setSelectedIndustria] = useState<number | null>(
    null,
  );
  const [selectedJurisdicao, setSelectedJurisdicao] = useState<number | null>(
    null,
  );
  const [selectedFrameworks, setSelectedFrameworks] = useState<number[]>([]);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const tabs = [
    { id: "organizacao", label: "Configuração Organizacional" },
    {
      id: "taxonomia",
      label: "Taxonomia de Risco",
      href: "/dashboard/setup/taxonomy",
    },
    { id: "matriz", label: "Matriz de Risco", href: "/dashboard/setup/matrix" },
  ];

  const {
    clientData,
    refetch: refetchClientData,
    loading: loadingClientData,
  } = useGetClientData();

  const { industrias } = useGetIndustriasPrincipais();
  const { jurisdicoes } = useGetJurisdicaoActivaComFrameworks();
  const { refetch } = useGetClientFrameworksTodos({
    clientId: clientData?.message.id_clientes,
  });
  const {
    jurisdicoes: jurisdicoesPorId,
    loading,
    error,
  } = useGetJurisdicaoPorId({
    jurisdicaoId: clientData?.message.cliente_jurisdicao_id || 0,
    enabled: step === 3,
  });

  const frameworksList =
    jurisdicoesPorId?.flatMap((jurisdicao) => jurisdicao.frameworks) || [];

  useEffect(() => {
    if (clientData?.message?.cliente_industria_id) {
      setSelectedIndustria(clientData.message.cliente_industria_id);
    }

    if (clientData?.message?.cliente_jurisdicao_id) {
      setSelectedJurisdicao(clientData.message.cliente_jurisdicao_id);
    }
  }, [clientData]);

  const handleSubmitIndustria = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedIndustria) {
      toast.info("Por favor, selecione uma indústria principal.");
      return;
    }

    try {
      setLoadingBtn(true);
      const response = await api.patch(
        `/customers/${clientData?.message.id_clientes}/redifinir-industria`,
        {
          cliente_industria_id: selectedIndustria?.toString(),
        },
      );

      if (response.status === 202) {
        setStep(2);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensagem
      ) {
        toast.error(`Erro: ${error.response.data.mensagem}`);
        return;
      }
      toast.error("Erro ao processar a jurisdição selecionada:", error);
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleSubmitJurisdicao = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedJurisdicao) {
      toast.info("Por favor, selecione uma jurisdição.");
      return;
    }

    try {
      setLoadingBtn(true);
      const response = await api.patch(
        `/customers/${clientData?.message.id_clientes}/redifinir-jurisdicao`,
        {
          cliente_jurisdicao_id: selectedJurisdicao?.toString(),
        },
      );

      if (response.status === 202) {
        await refetchClientData();
        setStep(3);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensagem
      ) {
        toast.error(`Erro: ${error.response.data.mensagem}`);
        return;
      }
      toast.error("Erro ao processar a jurisdição selecionada:", error);
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleValidateFrameworks = async () => {
    if (selectedFrameworks.length === 0) {
      toast.info("Selecione pelo menos um framework.");
      return;
    }

    if (!clientData?.message?.id_clientes) {
      toast.error("Cliente não identificado.");
      return;
    }

    try {
      setLoadingBtn(true);

      const response = await api.post("/frameworks/escolher", {
        frameworks_id_fk: selectedFrameworks,
        clientes_id_fk: clientData.message.id_clientes,
      });

      if (response.status === 201) {
        toast.success("Frameworks associados com sucesso.");
        refetch();
        setResumeModalOpen(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.data?.mensagem) {
        toast.error(error.response.data.mensagem);
        return;
      }

      toast.error("Erro ao associar frameworks ao cliente.");
    } finally {
      setLoadingBtn(false);
    }
  };

  const toggleFramework = (frameworkId: number) => {
    setSelectedFrameworks((prev) => {
      if (prev.includes(frameworkId)) {
        return prev.filter((id) => id !== frameworkId);
      }
      return [...new Set([...prev, frameworkId])];
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="w-full min-h-svh bg-white rounded-2xl p-5 flex flex-col gap-6 text-dark">
        <nav className="text-xs text-gray-400">
          Governança de Risco /{" "}
          <span className="text-primary-100 font-semibold">
            Configuração Organizacional
          </span>
        </nav>

        <div className="flex flex-col gap-6">
          <SetupTabs
            tabs={tabs}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
          />

          <ProgressBar currentStep={step} />

          {step === 1 && (
            <form
              onSubmit={handleSubmitIndustria}
              className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">Industria Principal</h1>
                  <p className="text-sm text-gray-500">
                    Seleciona a indústria que melhor representa a tua área de
                    atuação. Isso ajudará o sistema a aplicar automaticamente
                    frameworks e regulamentações adequadas.
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <Search
                    size={18}
                    className="text-gray-400"
                  />{" "}
                  <input
                    className="text-sm outline-none w-full"
                    type="search"
                    placeholder="Pesquisar por nome"
                  />
                </div>

                <ul className="flex flex-col gap-2">
                  {industrias.map((industria) => {
                    const isSelected =
                      selectedIndustria === industria.id_industrias_principal;

                    return (
                      <li
                        key={industria.id_industrias_principal}
                        onClick={() =>
                          setSelectedIndustria(
                            industria.id_industrias_principal,
                          )
                        }
                        className={`flex gap-2 items-center px-4 py-2 rounded-lg cursor-pointer transition
          ${
            isSelected
              ? "bg-primary-100/10 border border-primary-100"
              : "hover:bg-primary-100/5"
          }
        `}>
                        <Building2
                          size={18}
                          className={isSelected ? "text-primary-100" : ""}
                        />

                        <p
                          className={`font-medium text-sm ${
                            isSelected ? "text-primary-100" : "text-dark"
                          }`}>
                          {industria.industrias_principal_descricao}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex justify-between items-center sticky bottom-5 left-0 w-full">
                <Link
                  href="/dashboard"
                  className="rounded-lg border px-4 py-2 flex bg-white items-center gap-2 text-dark font-semibold hover:scale-105 transition-all">
                  <ArrowLeft size={18} /> Voltar
                </Link>
                <p className="text-sm text-gray-500">Etapa 1 de 3</p>

                <button
                  className="primary-btn flex gap-2"
                  type="submit"
                  disabled={loadingBtn}>
                  {loadingBtn ? (
                    <div className="border-t-2 border border-l-2 rounded-full animate-spin w-4 h-4"></div>
                  ) : (
                    <>
                      Continuar
                      <ArrowRight size={18} />{" "}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={handleSubmitJurisdicao}
              className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">Jurisdições Ativas</h1>
                  <p className="text-sm text-gray-500">
                    Escolhe todos os países ou regiões onde tens presença. Cada
                    seleção filtrará automaticamente as normas locais
                    aplicáveis.
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <Search
                    size={18}
                    className="text-gray-400"
                  />{" "}
                  <input
                    className="text-sm outline-none w-full"
                    type="search"
                    placeholder="Pesquisar por nome"
                  />
                </div>

                <ul className="flex flex-col gap-2">
                  {jurisdicoes.map((jurisdicao: JurisdicaoActiva) => {
                    const isSelected =
                      selectedJurisdicao === jurisdicao.jurisdicao_activa_id;

                    return (
                      <li
                        key={jurisdicao.jurisdicao_activa_id}
                        onClick={() =>
                          setSelectedJurisdicao(jurisdicao.jurisdicao_activa_id)
                        }
                        className={`flex gap-2 items-start px-4 py-3 rounded-lg cursor-pointer transition
    ${
      isSelected
        ? "bg-primary-100/10 border border-primary-100"
        : "hover:bg-gray-100"
    }
  `}>
                        <Flag
                          size={20}
                          className={isSelected ? "text-primary-100" : ""}
                        />

                        <div className="flex items-center justify-between w-full">
                          <span className="flex flex-col gap-1">
                            <h3
                              className={`font-medium text-sm ${
                                isSelected ? "text-primary-100" : "text-dark"
                              }`}>
                              {jurisdicao.jurisdicao_activa_pais}
                            </h3>

                            <p className="bg-gray-200 text-gray-500 rounded-md px-2 text-sm font-medium w-fit">
                              {jurisdicao.jurisdicao_orgao_regulador}
                            </p>
                          </span>

                          <p className="bg-gray-200 text-gray-500 rounded-md px-2 text-sm font-medium">
                            {jurisdicao.frameworks.length} Frameworks
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex justify-between items-center sticky bottom-5 left-0 w-full">
                <button
                  type="button"
                  className="rounded-lg border px-4 py-2 flex bg-white items-center gap-2 text-dark font-semibold hover:scale-105 transition-all"
                  onClick={() => setStep(1)}>
                  <ArrowLeft size={18} /> Voltar
                </button>
                <p className="text-sm text-gray-500">Etapa 2 de 3</p>

                <button
                  className="primary-btn flex gap-2"
                  type="submit"
                  disabled={loadingBtn}>
                  {loadingBtn ? (
                    <div className="border-t-2 border border-l-2 rounded-full animate-spin w-4 h-4"></div>
                  ) : (
                    <>
                      Continuar
                      <ArrowRight size={18} />{" "}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
                <div className="flex items-center justify-between">
                  <span className="flex flex-col">
                    <h1 className="text-lg font-medium">
                      Vamos configurar os frameworks e regulamentações
                      aplicáveis
                    </h1>
                    <p className="text-sm text-gray-500">
                      Com base nas seleções anteriores, o sistema sugeriu
                      estruturas compatíveis. Podes aceitar, editar ou criar
                      frameworks personalizados.
                    </p>
                  </span>

                  <button className="text-sm flex items-center gap-2 text-primary-100 font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-100/10">
                    Sugestões de IA <Sparkles size={16} />
                  </button>
                </div>

                {loading && (
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="border-t-2 border border-l-2 rounded-full animate-spin w-4 h-4" />
                    A carregar frameworks aplicáveis…
                  </div>
                )}

                {!loading && error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm">
                    {error}
                  </div>
                )}

                {!loading && !error && (
                  <>
                    {frameworksList.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        Nenhum framework foi encontrado para a jurisdição
                        selecionada.
                      </p>
                    ) : (
                      <ul className="flex items-center gap-4 text-sm flex-wrap">
                        {frameworksList.map((framework) => {
                          const isSelected = selectedFrameworks.includes(
                            framework.framework_id,
                          );

                          return (
                            <li
                              key={framework.framework_id}
                              onClick={() =>
                                toggleFramework(framework.framework_id)
                              }
                              className={`px-5 py-1 rounded-xl font-medium text-sm w-30 flex items-center justify-center border cursor-pointer transition
                      ${
                        isSelected
                          ? "border-primary-100 bg-primary-100/10 text-primary-100"
                          : "border-gray-200 text-gray-500 hover:bg-gray-100"
                      }
                    `}>
                              {framework.framework_sigla ||
                                framework.framework_nome}
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    <div className="flex flex-col gap-4">
                      <label className="font-medium text-sm flex flex-col gap-2">
                        Framework Personalizado
                        <textarea
                          className="px-4 py-2 rounded-lg border border-gray-200 h-18 resize-none"
                          placeholder="Descreva em linguagem natural para gerar framework personalizado..."
                        />
                      </label>

                      <button
                        className="secondary-btn px-4 py-2 w-fit"
                        type="button">
                        Adicionar framework
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between items-center sticky bottom-5 left-0 w-full">
                <button
                  className="rounded-lg border px-4 py-2 flex bg-white items-center gap-2 text-dark font-semibold hover:scale-105 transition-all"
                  onClick={() => setStep(2)}>
                  <ArrowLeft size={18} /> Voltar
                </button>

                <p className="text-sm text-gray-500">Etapa 3 de 3</p>

                <button
                  className="primary-btn"
                  disabled={loading || !!error}
                  onClick={handleValidateFrameworks}>
                  {loadingBtn ? (
                    <div className="border-t-2 border border-l-2 rounded-full animate-spin w-4 h-4"></div>
                  ) : (
                    "Validar Seleção"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {loadingClientData === false && resumeModalOpen === true && (
          <ResumeModal
            title="Revisão e validação das tuas configurações"
            subtitle="O sistema verificou a coerência das tuas escolhas e identificou possíveis conflitos."
            open={resumeModalOpen}
            onClose={() => setResumeModalOpen(!resumeModalOpen)}
          />
        )}

        {loadingClientData && (
          <ModalLayout
            open
            onClose={() => {}}>
            <div className="border-t-2 border border-l-2 rounded-full animate-spin w-10 h-10" />
          </ModalLayout>
        )}
      </div>
    </>
  );
}
