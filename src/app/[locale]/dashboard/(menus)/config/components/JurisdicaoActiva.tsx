import { useGetJurisdicaoActivaComFrameworks } from "@/src/app/hooks/useGetJurisdicaoActivaComFrameworks";
import { JurisdicaoActiva } from "@/src/app/types/juridisdicao";
import { OrganizationalCard } from "./OrganizationalCard";
import useGetClientData from "@/src/app/hooks/useGetClientData";
import { Flag } from "lucide-react";
import { useGetClienteComFrameworks } from "@/src/app/hooks/useGetClienteComFrameworks";

export function JurisdicoesAtivas({
  isEditing,
  selectedJurisdicao,
  onSelectJurisdicao,
}: {
  isEditing: boolean;
  selectedJurisdicao: number | null;
  onSelectJurisdicao: (id: number) => void;
}) {
  const { jurisdicoes } = useGetJurisdicaoActivaComFrameworks();

  const { clientData } = useGetClientData();

  const { jurisdicao } = useGetClienteComFrameworks(
    clientData?.message.id_clientes,
  );

  console.log("jurisdicao", jurisdicao);

  const apiJurisdicao = clientData?.message.cliente_jurisdicao_id ?? null;

  const currentJurisdicao = isEditing ? selectedJurisdicao : apiJurisdicao;

  return (
    <OrganizationalCard
      icon={<Flag />}
      title="Jurisdições Ativas"
      description="Países ou regiões onde a minha organização atua.">
      {isEditing ? (
        <ul>
          {jurisdicoes.map((jurisdicao: JurisdicaoActiva) => {
            const isSelected =
              currentJurisdicao === jurisdicao.jurisdicao_activa_id;

            return (
              <li
                key={jurisdicao.jurisdicao_activa_id}
                onClick={() =>
                  isEditing &&
                  onSelectJurisdicao(jurisdicao.jurisdicao_activa_id)
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
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          {jurisdicao ? (
            <li
              className={`flex gap-2 items-start px-4 py-3 rounded-lg cursor-pointer transition
          ${"bg-primary-100/10 border border-primary-100"}
        `}>
              <Flag
                size={20}
                className={"text-primary-100"}
              />

              <div className="flex items-center justify-between w-full">
                <span className="flex flex-col gap-1">
                  <h3 className={`font-medium text-sm ${"text-primary-100"}`}>
                    {jurisdicao.jurisdicao_activa_pais}
                  </h3>

                  <p className="bg-gray-200 text-gray-500 rounded-md px-2 text-sm font-medium w-fit">
                    {jurisdicao.jurisdicao_orgao_regulador}
                  </p>
                </span>
              </div>
            </li>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhuma jurisdição ativa selecionada.
            </p>
          )}
        </div>
      )}
    </OrganizationalCard>
  );
}
