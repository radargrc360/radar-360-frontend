import { Link } from "@/src/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function CriticalAlerts() {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 w-full shadow-md shadow-dark/8 min-h-96">
      <div className="flex justify-between items-center ">
        <div>
          <h2 className="text-lg font-semibold text-dark">Alertas críticas</h2>
          <p className="text-gray-500 text-sm mt-1">
            Estes são avisos urgentes que exigem resposta imediata.
          </p>
        </div>

        <Link
          href={"#"}
          className="flex font-medium text-primary-100 text-sm gap-2">
          Ver mais <ArrowRight className="w-5 h-5"/>
        </Link>
      </div>
    </div>
  );
}
