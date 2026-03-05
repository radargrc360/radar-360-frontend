"use client";

import { useRouter } from "@/src/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CircleAlert } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  open: boolean;
}

export default function FinishedModal({ open }: ModalProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-white flex flex-col items-center rounded-2xl shadow-xl p-6 w-full h-fit gap-4 max-w-3xl relative">
            <div className="flex items-center justify-center rounded-full h-16 w-16 bg-green-700">
              <Image
                src={"/icons/sucessful.png"}
                alt={"ícone de sucesso"}
                width={1920}
                height={1040}
                className="w-full object-contain"
              />
            </div>{" "}
            <h1 className="text-lg font-semibold">
              Configuração concluída com sucesso!
            </h1>
            <p className="text-sm text-gray-500">
              A tua estrutura de Governança foi validada e está pronta para
              alimentar os outros módulos.
            </p>
            <button className="primary-btn px-4 py-2 w-full" onClick={() => {
                router.push("/")
            }}>
              Ir para o Dashboard de Risco
            </button>
            <div className="border border-blue-400 bg-blue-50 rounded-md py-3 px-4 text-primary-100 flex gap-2 items-center w-full ">
              <CircleAlert
                size={16}
                className="min-w-4 min-h-4"
              />{" "}
              <p className="text-sm font-medium">
                O Governance Hub continuará aprendendo com as tuas decisões e
                adaptará as regras à medida que novas jurisdições ou
                regulamentações surgirem.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
