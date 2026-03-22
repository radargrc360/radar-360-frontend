"use client";

import { useState } from "react";
import { Link, useRouter } from "@/src/i18n/navigation";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { SetupTabs } from "../components/SetupTabs";
import { ProgressBar } from "../components/ProgressBar";
import { useGetListaCategoriaRisco } from "@/src/app/hooks/useGetListaCategoriaRisco";
import api from "@/src/app/api/config";
import { toast, ToastContainer } from "react-toastify";
import useGetClientData from "@/src/app/hooks/useGetClientData";
import { useGetEscalasMatriz } from "@/src/app/hooks/useGetMatrizEscala";

export default function TaxonomySetup() {
  const [activeTab, setActiveTab] = useState("taxonomia");
  const [selectedCategorias, setSelectedCategorias] = useState<number[]>([]);
  const { refetch } = useGetEscalasMatriz();

  const [step] = useState(4);

  const { categorias } = useGetListaCategoriaRisco();
  const { clientData } = useGetClientData();

  const [loadingBtn, setLoadingBtn] = useState(false);

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

  const router = useRouter();

  function toggleCategoria(id: number) {
    setSelectedCategorias((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  const submitCategorias = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategorias.length === 0) return;
    setLoadingBtn(true);

    console.log("Selected categorias:", selectedCategorias);

    try {
      const response = await api.post("/categoria-ao-risco/", {
        categoria_risco: selectedCategorias,
        materialidade: "Reduzido",
        cliente_categorizado: clientData?.mensagem.id_clientes.toString(),
      });

      if (response.status === 201) {
        toast.success("Categorias de risco salvas com sucesso");
        refetch();
        router.push("/dashboard/setup/matrix");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Erro ao salvar categorias de risco", error);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full min-h-svh bg-white rounded-2xl p-5 flex flex-col gap-6 text-dark">
        <nav className="text-xs text-gray-500">
          Governança de Risco /{" "}
          <span className="text-primary-100 font-semibold">
            Taxonomia de Risco
          </span>
        </nav>

        <form
          className="flex flex-col gap-6"
          onSubmit={submitCategorias}>
          <SetupTabs
            tabs={tabs}
            activeTab={activeTab}
            onChangeTab={setActiveTab}
          />

          <ProgressBar currentStep={step} />

          {step === 4 && (
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">
                    Taxonomia de Riscos Herdada
                  </h1>
                  <p className="text-sm text-gray-500">
                    Tipos de risco automaticamente configurados baseados na sua
                    indústria e frameworks selecionados
                  </p>
                </div>

                <ul className="grid grid-cols-3 gap-5">
                  {categorias.map((categoria) => (
                    <li
                      key={categoria.id_lista_de_categoria_de_risco}
                      className="cursor-pointer w-full h-full min-h-64">
                      <label className="flex flex-col p-6 rounded-md border h-full border-gray-200 gap-4">
                        <div className="flex justify-between w-full">
                          <div className="flex flex-col">
                            <p className="text-sm text-gray-500">
                              {categoria.categoria}
                            </p>
                            <h1 className="text-xl font-semibold">
                              {categoria.categoria}
                            </h1>
                          </div>

                          <input
                            type="checkbox"
                            className="border border-gray-100 w-5 h-5"
                            checked={selectedCategorias.includes(
                              categoria.id_lista_de_categoria_de_risco,
                            )}
                            onChange={() =>
                              toggleCategoria(
                                categoria.id_lista_de_categoria_de_risco,
                              )
                            }
                          />
                        </div>

                        <hr className="w-full border border-gray-200" />

                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <p className="">Unidade:</p>{" "}
                          <span className="font-medium text-dark flex items-center gap-2">
                            <Building2 /> {categoria.categoria_descricao}
                          </span>
                        </div>

                        <div className="text-sm text-gray-500 flex gap-2">
                          <p className="">Frameworks:</p>

                          <ul className="flex gap-2 items-center flex-wrap ">
                            {categoria.frameworks.map((framework) => (
                              <li
                                key={framework.framework_id}
                                className="bg-gray-200 text-gray-600 rounded-xl px-2">
                                {framework.framework_sigla}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between">
                  <Link
                    href="/dashboard/setup/organizational"
                    className="rounded-lg border px-4 py-2 flex items-center gap-2 text-dark font-semibold hover:scale-105 transition-all">
                    <ArrowLeft size={18} /> Voltar
                  </Link>
                  <p className="text-sm text-gray-500">Etapa 2 de 3</p>

                  <button
                    className="primary-btn flex gap-2"
                    type="submit">
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
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
