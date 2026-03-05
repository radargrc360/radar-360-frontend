import useGetClientData from "@/src/app/hooks/useGetClientData";
import { useGetIndustriasPrincipais } from "@/src/app/hooks/useGetIndustriasPrincipais";
import { Building2 } from "lucide-react";
import { OrganizationalCard } from "./OrganizationalCard";
import { useGetClienteComFrameworks } from "@/src/app/hooks/useGetClienteComFrameworks";

export function IndustriaPrincipal({
  isEditing,
  selectedIndustria,
  onSelectIndustria,
}: {
  isEditing: boolean;
  selectedIndustria: number | null;
  onSelectIndustria: (id: number) => void;
}) {
  const { industrias } = useGetIndustriasPrincipais();
  const { clientData } = useGetClientData();

  const { industria } = useGetClienteComFrameworks(
    clientData?.mensagem.id_clientes,
  );

  const apiIndustria = clientData?.mensagem.cliente_industria_id ?? null;

  const currentIndustria = isEditing ? selectedIndustria : apiIndustria;

  return (
    <OrganizationalCard
      title="Indústria Principal"
      icon={<Building2 />}
      description="Indústria que representa a tua área de atuação.">
      {isEditing ? (
        industrias.map((industria) => {
          const isSelected =
            currentIndustria === industria.id_industrias_principal;

          return (
            <li
              key={industria.id_industrias_principal}
              onClick={() =>
                isEditing &&
                onSelectIndustria(industria.id_industrias_principal)
              }
              className={`flex gap-2 items-center px-4 py-2 rounded-lg transition
              ${
                isSelected
                  ? "bg-primary-100/10 border border-primary-100"
                  : "hover:bg-primary-100/5"
              }
              ${isEditing ? "cursor-pointer" : "cursor-default"}
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
        })
      ) : industria ? (
        <li
          className={`flex gap-2 items-center px-4 py-2 rounded-lg transition
              ${"bg-primary-100/10 border border-primary-100"}
            `}>
          <Building2
            size={18}
            className={"text-primary-100"}
          />
          <p
            className={`font-medium text-sm text-primary-100
              `}>
            {industria.industrias_principal_descricao}
          </p>
        </li>
      ) : (
        <p className="text-sm text-gray-500">
          Nenhuma industria ativa selecionada.
        </p>
      )}
    </OrganizationalCard>
  );
}
