/* import { Link } from "@/src/i18n/navigation";
import { ArrowRight } from "lucide-react";
 */
export default function RecentsActivities() {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 w-full shadow-md shadow-dark/8 min-h-96">
      <div className="flex justify-between items-center ">
        <div>
          <h2 className="text-lg font-semibold text-dark">
            Atividades Recentes
          </h2>
        </div>

        {/* <Link
          href={"#"}
          className="flex font-medium text-primary-100 text-sm gap-2">
          Ver mais <ArrowRight className="w-5 h-5" />
        </Link> */}
      </div>

      <div className="w-full flex flex-col items-center justify-center my-auto h-full">
        <h1 className="text-lg text-dark font-semibold">
          Ainda não há atividades registradas.
        </h1>
        <p className="text-gray-500 ">
          Após criar ou atualizar um risco, as ações aparecerão aqui. 
        </p>
      </div>
    </div>
  );
}
