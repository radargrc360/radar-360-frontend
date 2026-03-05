"use client";

import { Link, usePathname } from "@/src/i18n/navigation";
import {
  Activity,
  Bell,
  Bolt,
  ChartNoAxesCombined,
  Database,
  LayoutDashboard,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/dashboard",
      label: "Página Inicial",
      icon: <LayoutDashboard className="w-6 h-6 min-h-6 min-w-6" />,
    },
    {
      href: "#",
      label: "Central de Governança",
      icon: <ShieldCheck className="w-6 h-6 min-h-6 min-w-6" />,
    },
    {
      href: "/dashboard/risk-register",
      label: "Registro de Risco",
      icon: <Database className="w-6 h-6 min-h-6 min-w-6" />,
    },
    {
      href: "#",
      label: "Dados de Perda",
      icon: <ChartNoAxesCombined className="w-6 h-6 min-h-6 min-w-6" />,
    },
    {
      href: "#",
      label: "BRE",
      icon: <Zap className="w-6 h-6 min-h-6 min-w-6" />,
    },
    {
      href: "#",
      label: "Apetite de Risco",
      icon: <Target className="w-6 h-6 min-h-6 min-w-6" />,
    },
    {
      href: "#",
      label: "Avaliação",
      icon: <Activity className="w-6 h-6 min-h-6 min-w-6" />,
    },
    {
      href: "#",
      label: "Tratamento",
      icon: <Bolt className="w-6 h-6 min-h-6 min-w-6" />,
    },
  ];

  return (
    <header className="text-white px-4 py-2 flex items-center justify-between">
      <Image
        src={"/logo.png"}
        alt={"Logotipo"}
        width={500}
        height={100}
        className="object-contain w-24"
      />

      <ul className="flex items-center gap-2">
        {navLinks.map((link, id) => (
          <li key={id}>
            <Link
              href={link.href}
              className={`flex gap-1 font-semibold p-2 rounded-lg lg:text-sm hover:bg-primary-500 transition-colors duration-300 ${
                pathname === link.href
                  ? "border border-gray-200 bg-primary-500"
                  : ""
              }`}>
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 w-fit">
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300 border border-gray-200 relative">
          <Bell className="w-6 h-6 min-h-6 min-w-6" />

          <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>{" "}
        
        <button className="">
          <Image
            src={"/emis.png"}
            alt={"User Avatar"}
            width={500}
            height={500}
            className="object-cover w-10 h-10 rounded-lg"
          />
        </button>
      </div>
    </header>
  );
}
