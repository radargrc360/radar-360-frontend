"use client";

/* import { CircleAlert, CircleCheck, TriangleAlert } from "lucide-react"; */
import ModalLayout from "../../../../../../ui/dashboard/ModalLayout";
import { useRouter } from "@/src/i18n/navigation";
import useGetClientData from "@/src/app/hooks/useGetClientData";
import { useGetClienteComFrameworks } from "@/src/app/hooks/useGetClienteComFrameworks";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function ResumeModal({ open, onClose, title }: ModalProps) {
  const router = useRouter();

  const { clientData } = useGetClientData();

  const { frameworks, industria, jurisdicao, cliente } =
    useGetClienteComFrameworks(clientData?.mensagem.id_clientes);

  const handleClick = () => {
    router.push("/dashboard/setup/taxonomy");
  };

  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      title={title}>
      <div className="p-4 rounded-lg bg-gray-50 flex flex-col gap-4 w-full border">
        {/*  <ul className="flex flex-col text-sm gap-2">
          <li className="flex items-center gap-2 text-green-600">
            <CircleCheck size={16} /> Basileia III compatível com Banking e
            Angola.
          </li>

          <li className="flex items-center gap-2 text-green-600">
            <CircleCheck size={16} />
            ISO 3100 aplicável globalmente.
          </li>

          <li className="flex items-center gap-2 text-yellow-500">
            <TriangleAlert size={16} /> COSO pode não ser aplicável à jurisdição
            “Internacional”
          </li>
        </ul>

        <div className="border border-blue-400 bg-blue-50 rounded-md py-3 px-4 text-primary-100 flex gap-2 items-center ">
          <CircleAlert size={16} />{" "}
          <p className="text-sm font-medium">
            Recomendação: Substituir por “ISO 27001” ou “NIST CSF”
          </p>
        </div> */}
      </div>

      <hr className="border-gray-200 w-full my-4" />

      <ul className="w-full flex flex-col gap-4">
        <li className="flex justify-between w-full text-sm text-gray-400 items-center">
          ID da Organização:{" "}
          <span className="text-dark">{cliente?.hash_autenticador}</span>
        </li>
        <li className="flex justify-between w-full text-sm text-gray-400 items-center">
          Nome: <span className="text-dark">{cliente?.nome_empresa}</span>
        </li>

        <li className="flex justify-between w-full text-sm text-gray-400 items-center">
          Indústria Principal:{" "}
          <span className="bg-gray-200 text-gray-600 rounded-xl px-2">
            {industria?.industrias_principal_descricao}
          </span>
        </li>

        <li className="flex justify-between w-full text-sm text-gray-400 items-center">
          Jurisdições Ativas:{" "}
          <div className="flex flex-wrap max-w-50 items-center justify-end gap-2">
            <span className="bg-gray-200 text-gray-600 rounded-xl px-2">
              {jurisdicao?.jurisdicao_activa_pais}
            </span>
          </div>
        </li>

        <li className="flex justify-between w-full text-sm text-gray-400 items-center">
          Frameworks Aplicáveis:
          <div className="flex flex-wrap max-w-lg items-center justify-end gap-2">
            {frameworks.map((framework) => (
              <span
                key={framework.framework_id}
                className="bg-gray-200 text-gray-600 rounded-xl px-2">
                {framework.framework_sigla}
              </span>
            ))}
          </div>
        </li>

        <li className="flex justify-between w-full text-sm text-gray-400 items-center">
          Status da Configuração:{" "}
          <span className="bg-green-100 text-green-600 border border-green-400 flex items-center justify-center rounded-xl px-2">
            Validada
          </span>
        </li>
      </ul>

      <hr className="border-gray-200 w-full my-4" />

      <button
        onClick={handleClick}
        className="primary-btn w-full px-4 py-2 sticky bottom-0 left-0">
        Continuar
      </button>
    </ModalLayout>
  );
}
