"use client";

import { Link, usePathname, useRouter } from "@/src/i18n/navigation";
import {
  BookOpen,
  FileSearchCorner,
  Users,
  House,
  Landmark,
  Radar,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import api from "../../api/config";

type MenuItem = {
  href: string;
  Icon: React.ElementType;
};

const MENU_ITEMS: MenuItem[] = [
  { href: "#", Icon: House },
  { href: "/dashboard/users", Icon: Users },
  { href: "#", Icon: Radar },
  { href: "/dashboard/config", Icon: Landmark },
  { href: "#", Icon: BookOpen },
  { href: "#", Icon: FileSearchCorner },
];

const linkClasses =
  "p-2.5 hover:bg-white/10 rounded-md transition-colors duration-300 w-full";

const iconClasses = "w-6 h-6 min-h-6 min-w-6";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();
  const cookies = new Cookies();

  async function handleLogout() {
    const entidade = cookies.get("cliente_entidade");

    if (!cookies.get("cliente_hash")) {
      toast.error("Sessão inválida. Por favor, faça login novamente.");
      router.push("/login");
      return;
    }

    try {
      const response = await api.post("/customers/logout", { entidade });

      if (response.status === 202) {
        cookies.remove("cliente_hash", { path: "/" });
        cookies.remove("cliente_entidade", { path: "/" });
        router.push("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 406) {
        toast.error("Cliente desconhecido");
      } else {
        toast.error("Erro ao realizar logout. Por favor, tente novamente.");
      }
    }
  }

  return (
    <nav className="2xl:px-4 lg:px-2 h-full text-white flex flex-col justify-center items-center lg:w-16 2xl:w-20 relative">
      <ul className="flex flex-col gap-2 w-full">
        {MENU_ITEMS.map(({ href, Icon }, index) => (
          <li
            key={index}
            className={`w-full flex items-center justify-center rounded-md ${
              pathname === href ? "border border-gray-200 bg-primary-500" : ""
            }`}>
            <Link
              href={href}
              className={linkClasses}>
              <Icon className={iconClasses} />
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-4 flex flex-col gap-2 items-center">
        <button>
          <Image
            src="/user.png"
            alt="User Avatar"
            width={1000}
            height={1000}
            className="object-cover w-11 h-11 rounded-full"
          />
        </button>

        <button
          onClick={handleLogout}
          className="cursor-pointer hover:bg-white/5 transition-all duration-300 p-3 rounded-md">
          <LogOut />
        </button>
      </div>
    </nav>
  );
}
