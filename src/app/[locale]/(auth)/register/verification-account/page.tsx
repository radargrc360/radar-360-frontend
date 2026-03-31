"use client";

import api from "@/src/app/api/config";
import { useRouter } from "@/src/i18n/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface VerificationCodeFormInputs {
  verificationCode: string;
}

interface VerificationCodeInfo {
  entidade: number;
  tempo_de_vida_codigo_seguranca: number;
  email: string;
}

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationCodeFormInputs>();

  const [verificationCodeInfo, setVerificationCodeInfo] =
    useState<VerificationCodeInfo>();

  useEffect(() => {
    const verification_code_info = localStorage.getItem(
      "verification_code_info"
    );
    if (verification_code_info) {
      setVerificationCodeInfo(JSON.parse(verification_code_info));
    }
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<VerificationCodeFormInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/customers/activar-por-codigo", {
        codigo_confirmacao: data.verificationCode,
      });

      if (response.status === 202) {
        toast.success("Código validado com sucesso.");

        router.push("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error(
          error.response?.data?.messagem ||
            "Ocorreu um erro ao validar o código de segurança."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-primary-500 flex-1 flex flex-col h-full justify-center items-center relative">
      <motion.div
        className="flex flex-col items-center justify-center w-full max-w-sm gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut",
              staggerChildren: 0.15,
            },
          },
        }}>
        <div className="flex flex-col w-full">
          <motion.h1
            className="text-2xl font-semibold"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}>
            Código de Verificação
          </motion.h1>
        </div>

        <motion.form
          className="flex flex-col items-center justify-center gap-8 w-full"
          onSubmit={handleSubmit(onSubmit)}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}>
          <motion.div
            className="flex-col flex w-full gap-2"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}>
            <motion.div
              className="w-full flex flex-col items-end"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}>
              <label className="auth-label-2">
                Código de Verificação
                <input
                  type="text"
                  {...register("verificationCode", {
                    required: "Código de verificação é obrigatório",
                  })}
                  placeholder="Digite o código de confirmação"
                  className="auth-input"
                />
                {errors.verificationCode && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.verificationCode.message}
                  </span>
                )}
              </label>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-2 w-full"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}>
            <motion.button
              type="submit"
              className="primary-btn w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}>
              {loading ? (
                <div className="border-t-2 border border-l-2 rounded-full animate-spin w-4 h-4"></div>
              ) : (
                "Continuar"
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
