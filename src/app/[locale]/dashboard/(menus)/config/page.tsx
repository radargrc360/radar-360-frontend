"use client";

import {
  Building2,
  Calendar,
  ClockFading,
  Edit,
  SaveAll,
  User,
} from "lucide-react";

import { SetupTabs } from "../setup/components/SetupTabs";
import { useEffect, useState } from "react";
import useGetClientData from "@/src/app/hooks/useGetClientData";
import { toast, ToastContainer } from "react-toastify";
import api from "@/src/app/api/config";
import ConfirmModal from "./components/ConfirmModal";
import { IndustriaPrincipal } from "./components/IndustriaPrincipal";
import { JurisdicoesAtivas } from "./components/JurisdicaoActiva";
import { FrameworksAtivos } from "./components/FrameworksActivos";
import { useGetCategoriaRiscoByClientId } from "@/src/app/hooks/useGetCategoriaRiscoByClientId";
import { useGetEscalasMatriz } from "@/src/app/hooks/useGetMatrizEscala";
import { Toggle } from "./components/ToggleBtn";
import { useGetClienteComFrameworks } from "@/src/app/hooks/useGetClienteComFrameworks";
import Image from "next/image";

export default function ConfiguracaoOrganizacional() {
  const tabs = [
    {
      id: "organizacao",
      label: "Configuração Organizacional",
    },
    { id: "taxonomia", label: "Taxonomia de Risco" },
    { id: "matriz", label: "Matriz de Risco" },
    { id: "versionamento", label: "Versionamento" },
  ];

  const [activeTab, setActiveTab] = useState("organizacao");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndustria, setSelectedIndustria] = useState<number | null>(
    null,
  );
  const [selectedJurisdicao, setSelectedJurisdicao] = useState<number | null>(
    null,
  );

  const [confirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const { clientData } = useGetClientData();
  const { escalaMatriz } = useGetClienteComFrameworks(
    clientData?.mensagem.id_clientes,
  );
  const [selectedEscalaId, setSelectedEscalaId] = useState<number | null>(null);

  useEffect(() => {
    if (escalaMatriz?.risco_escala_id) {
      setSelectedEscalaId(escalaMatriz.risco_escala_id);
    }
  }, [escalaMatriz]);

  const [submitting, setSubmitting] = useState(false);

  const handleSaveIndustria = async () => {
    if (!selectedIndustria) {
      toast.info("Por favor, selecione uma indústria principal.");
      return;
    }

    try {
      const response = await api.patch(
        `/clientes/${clientData?.mensagem.id_clientes}/redifinir-industria`,
        {
          cliente_industria_id: selectedIndustria.toString(),
        },
      );

      if (response.status === 202) {
        toast.success("Indústria atualizada com sucesso!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.response?.data?.mensagem ??
          "Erro ao atualizar a indústria principal.",
      );
    }
  };

  const handleSaveJurisdicao = async () => {
    if (!selectedJurisdicao) {
      toast.info("Por favor, selecione uma jurisdição.");
      return;
    }

    try {
      const response = await api.patch(
        `/clientes/${clientData?.mensagem.id_clientes}/redifinir-jurisdicao`,
        {
          cliente_jurisdicao_id: selectedJurisdicao?.toString(),
        },
      );

      if (response.status === 202) {
        toast.success("Jurisdição atualizada com sucesso!");
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
    }
  };

  const handleSaveEscala = async (escalaId: number) => {
    try {
      setSubmitting(true);

      const response = await api.patch(
        `/clientes/${clientData?.mensagem.id_clientes}/redifinir-escala-matriz`,
        {
          cliente_matriz_escala_id: String(escalaId),
        },
      );

      if (response.status === 202) {
        toast.success("Escala da matriz redefinida com sucesso!");
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

  const handleSave = () => {
    setIsEditing(false);
    setOpenConfirmModal(!confirmModal);
  };

  const { categorias } = useGetCategoriaRiscoByClientId({
    idCliente: clientData?.mensagem.id_clientes,
  });

  const { escalas } = useGetEscalasMatriz();

  return (
    <>
      <ToastContainer />

      <div className="w-full min-h-svh bg-white text-dark rounded-2xl p-5 flex flex-col gap-5">
        <nav className="text-xs text-gray-400">
          {" "}
          Governança de Risco /{" "}
          <span className="text-primary-100 font-semibold">
            {activeTab === "organizacao" && "Configuração Organizacional"}
            {activeTab === "taxonomia" && "Taxonomia de Risco"}
            {activeTab === "matriz" && "Matriz de Risco"}
            {activeTab === "versionamento" && "Versionamento"}
          </span>{" "}
        </nav>

        <SetupTabs
          tabs={tabs}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {activeTab === "organizacao" && (
          <>
            <div className="w-full flex justify-end items-center">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-dark flex gap-2 items-center font-medium border px-4 py-2 rounded-lg hover:bg-gray-50">
                  <Edit size={16} /> Editar configuração
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="primary-btn px-4 py-2 flex gap-2 items-center font-medium">
                  <SaveAll size={16} /> Salvar
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <IndustriaPrincipal
                isEditing={isEditing}
                selectedIndustria={selectedIndustria}
                onSelectIndustria={setSelectedIndustria}
              />

              <JurisdicoesAtivas
                isEditing={isEditing}
                selectedJurisdicao={selectedJurisdicao}
                onSelectJurisdicao={setSelectedJurisdicao}
              />
              <FrameworksAtivos />
            </div>

            <ConfirmModal
              open={confirmModal}
              setClose={() => setOpenConfirmModal(!confirmModal)}
              onClick={() => {
                handleSaveIndustria();
                handleSaveJurisdicao();
                setOpenConfirmModal(!confirmModal);
              }}
            />
          </>
        )}

        {activeTab === "taxonomia" && (
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
              <div className="flex flex-col">
                <h1 className="text-lg font-medium">Taxonomia de Risco</h1>
                <p className="text-sm text-gray-500">Universo de risco</p>
              </div>

              <ul className="grid grid-cols-3 gap-4">
                {categorias.map((categoria) => (
                  <li
                    key={categoria.id_lista_de_categoria_de_risco}
                    className="cursor-pointer w-full h-full min-h-64 ">
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
                      </div>

                      <hr className="w-full border border-gray-200" />

                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <p className="">Unidade:</p>{" "}
                        <span className="font-medium text-dark flex items-center gap-2">
                          <Building2 />{" "}
                          {categoria.id_lista_de_categoria_de_risco}
                        </span>
                      </div>

                      <div className="text-sm text-gray-500 flex gap-2">
                        <p>Frameworks:</p>

                        {categoria.frameworks.length > 0 ? (
                          <ul className="flex gap-2 items-center flex-wrap">
                            {categoria.frameworks.map((framework) => (
                              <li
                                key={framework.framework_id}
                                className="bg-gray-200 text-gray-600 rounded-xl px-2">
                                {framework.framework_sigla}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="italic text-gray-400">
                            Nenhum framework associado
                          </span>
                        )}
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "matriz" && (
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
              <div className="flex flex-col">
                <h1 className="text-lg font-medium">Matrizes de Risco</h1>
                <p className="text-sm text-gray-500">
                  Tipos de risco automaticamente configurados baseados na sua
                  indústria e frameworks selecionados
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

                      <Toggle
                        checked={selectedEscalaId === escala.risco_escala_id}
                        onChange={() => {
                          if (selectedEscalaId === escala.risco_escala_id)
                            return;

                          setSelectedEscalaId(escala.risco_escala_id);
                          handleSaveEscala(escala.risco_escala_id);
                        }}
                      />
                    </div>

                    <hr className="w-full border-gray-200" />

                    <p className="text-sm ">{escala.risco_escala_descricao}</p>

                    <div className="px-3 py-2 rounded-lg flex flex-col bg-gray-100 text-sm">
                      <p className="text-gray-500">Escala de Avaliação</p>
                      <p className="font-medium">
                        {escala.classifacoes.length} Níveis:{" "}
                        {escala.classifacoes
                          .map((c) => c.risco_classificacao_nome)
                          .join(", ")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "versionamento" && (
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-5 shadow-md rounded-2xl bg-white border border-gray-100 p-6 text-dark">
              <div className="flex flex-col">
                <h1 className="text-lg font-medium">Versionamento</h1>
                <p className="text-sm text-gray-500">
                  Snapshots de configuração para auditoria e rollback
                </p>
              </div>
              <ul className="max-w-full w-full grid grid-cols-1 gap-6">
                <li className="w-full border border-gray-200 flex gap-4 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <ClockFading />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h1 className="text-black">v1.3</h1>
                    <p>Adicionado framework Basel III</p>

                    <div className="flex items-center gap-2">
                      <span className="flex gap-2 items-center">
                        <User
                          size={18}
                          className="text-gray-500"
                        />{" "}
                        Responsável:
                      </span>

                      <span className="flex gap-2 items-center text-black font-medium">
                        <Image
                          src="/user.png"
                          alt="Imagem de versionamento"
                          width={44}
                          height={44}
                          className="rounded-full object-cover"
                        />
                        <p>Joel Silva</p>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex gap-2 items-center">
                        <Calendar
                          size={18}
                          className="text-gray-500"
                        />{" "}
                        Data:
                      </span>

                      <p className="text-black font-medium">12/09/2024</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
