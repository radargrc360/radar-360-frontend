"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CircleX } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  backBtn?: boolean;
  handleBack?: () => void;
}

export default function RiskRegisterModal({
  open,
  onClose,
  title,
  children,
  handleBack,
  backBtn,
}: ModalProps) {
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
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBack}
                  className={`${!backBtn && "hidden"} cursor-pointer`}>
                  <ArrowLeft className="text-gray-400" />
                </button>
                <h2 className="text-xl font-semibold text-dark">{title}</h2>
              </div>

              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
                <CircleX
                  size={20}
                  className="text-gray-500"
                />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto py-3 px-4 overflow-x-hidden">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
