"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ModalProps {
  open: boolean;
  setClose: () => void;
  onClick: () => void;
}

export default function ConfirmModal({ open, setClose, onClick }: ModalProps) {
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
            className="bg-white flex flex-col items-center rounded-2xl shadow-xl text-dark p-6 w-full h-fit gap-4 max-w-3xl relative">
            <div className="flex items-center justify-center rounded-full h-16 w-16 bg-orange-50">
              <Image
                src={"/icons/alert.png"}
                alt={"ícone de sucesso"}
                width={1920}
                height={1040}
                className="w-full object-contain"
              />
            </div>{" "}
            <h1 className="text-lg font-semibold">ATENÇÃO: Impacto Crítico</h1>
            <p className="text-sm text-gray-500 text-center">
              Esta configuração afeta diretamente a forma como o sistema calcula
              e gere o risco. A sua alteração pode exigir reprocessamento de
              dados e impactar a visualização e os relatórios em todos os
              módulos dependentes. Confirma que deseja prosseguir?
            </p>
            <div className="flex gap-4 w-full justify-center">
              <button
                className="px-4 py-2 w-full bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors duration-300 cursor-pointer"
                onClick={setClose}>
                NÃO, CANCELAR
              </button>
              <button
                className="px-4 py-2 w-full bg-green-500 text-white rounded-sm hover:bg-green-700 transition-colors duration-300 cursor-pointer"
                onClick={onClick}>
                SIM, PROSSEGUIR
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
