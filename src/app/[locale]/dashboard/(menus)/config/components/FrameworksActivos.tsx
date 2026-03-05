import useGetClientData from "@/src/app/hooks/useGetClientData";
import { useGetFrameworksByCliente } from "@/src/app/hooks/useGetFrameworksByCliente";
import { BookOpen } from "lucide-react";
import { OrganizationalCard } from "./OrganizationalCard";

export function FrameworksAtivos() {
  const { clientData } = useGetClientData();
  const { frameworks } = useGetFrameworksByCliente(
    clientData?.mensagem.id_clientes
  );

  return (
    <OrganizationalCard
      title="Frameworks Ativos"
      description="Base de conformidade organizacional com sugestões inteligentes"
      icon={<BookOpen />}>
      <div className="flex flex-wrap gap-2">
        {frameworks.map((fw) => (
          <span
            key={fw.framework_id}
            className="rounded-full border px-3 py-1 text-xs font-medium">
            {fw.framework_sigla}
          </span>
        ))}
      </div>
    </OrganizationalCard>
  );
}
