"use client";

import api from "@/src/app/api/config";
import { Link, useRouter } from "@/src/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowLeftToLine } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
  }>();

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

 
  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    try {
      setLoading(true);
      const response = await api.post(
        "/customers/codigo-seguranca/pedir",
        {
          email: data.email,
          canal: "E-mail",
        },
        {
          headers: {
            confirmacao: "confirmacaoDeConta",
          },
        }
      );

      if (response.status === 202) {
        localStorage.setItem(
          "verification_code_info",
          JSON.stringify(response.data.info)
        );
        toast.success("Código de segurança enviado para o seu email.");
        router.push("/recover-password/verification-code");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error(
          error.response?.data?.messagem ||
            "Ocorreu um erro ao enviar o código de segurança."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-primary-500 flex-1 flex flex-col h-full justify-center items-center relative">
      <Link
        href={"/register"}
        className="flex items-center font-medium gap-2 text-sm hover:scale-105 transition-all duration-300 absolute top-6 left-6">
        <ArrowLeftToLine className="w-6 h-6" /> Voltar para o login
      </Link>

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
            Recuperar senha
          </motion.h1>
          <p className="text-gray-400">
            Informe seu email para receber um link de recuperação de senha.
          </p>
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
                E-mail
                <input
                  type="email"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "E-mail inválido",
                    },
                  })}
                  placeholder="Digite o seu e-mail"
                  className="auth-input"
                />
                {errors.email && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.email.message}
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
                "Enviar"
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
