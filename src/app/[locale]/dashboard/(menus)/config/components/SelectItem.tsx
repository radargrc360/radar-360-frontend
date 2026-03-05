import { cn } from "@/lib/utils";
import { OrganizationalItem } from "../types/Item";
import { Building2, Check } from "lucide-react";

export function SelectItem({ item }: { item: OrganizationalItem }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
        item.disabled && "opacity-40",
        item.active &&
          "border border-gray-200 bg-gray-200/10 hover:bg-primary-100/5"
      )}>
      <div className="flex flex-col gap-2 items-center text-sm cursor-pointer">
        <div className="flex items-start gap-2">
          <Building2 size={18} />{" "}
          <div className="flex flex-col gap-1">
            <p className="font-medium"> {item.label}</p>{" "}
            {item.subtitle && (
              <p className="bg-gray-200 text-gray-600 rounded-xl px-2 ">
                {item.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      {item.active && <Check className="h-4 w-4 text-primary" />}
    </div>
  );
}
