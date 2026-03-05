"use client";

import { Link, useRouter } from "@/src/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowLeftToLine } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface RegisterFormInputs {
  companyName: string;
  corporateEmail: string;
  nif: string;
  phoneNumber: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    setLoading(true);
    localStorage.setItem("companyData", JSON.stringify(data));
    setLoading(false);
    router.push("/register/set-password");
  };

  return (
    <div className="text-primary-500 flex-1 flex flex-col h-full justify-center items-center relative">
      <Link
        href={"/login"}
        className="flex items-center font-medium gap-2 text-sm hover:scale-105 transition-all duration-300 absolute top-6 left-6">
        <ArrowLeftToLine className="w-6 h-6" /> Voltar
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
            Crie sua conta
          </motion.h1>
          <p className="text-gray-400">Bem-vindo! Insira seus dados.</p>
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
            <motion.label
              className="auth-label"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}>
              Nome da empresa
              <input
                type="text"
                placeholder="Digite o nome da empresa"
                {...register("companyName", {
                  required: "Nome da empresa é obrigatório",
                })}
                className="auth-input"
              />
              {errors.companyName && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.companyName.message}
                </span>
              )}
            </motion.label>

            <motion.div
              className="w-full flex flex-col items-end"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}>
              <label className="auth-label">
                E-mail corporativo
                <input
                  type="email"
                  {...register("corporateEmail", {
                    required: "E-mail corporativo é obrigatório",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Formato de e-mail inválido",
                    },
                  })}
                  placeholder="Digite o e-mail corporativo"
                  className="auth-input"
                />
                {errors.corporateEmail && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.corporateEmail.message}
                  </span>
                )}
              </label>
            </motion.div>

            <motion.div
              className="w-full flex flex-col items-end"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}>
              <label className="auth-label">
                NIF
                <input
                  type="text"
                  {...register("nif", {
                    required: "NIF é obrigatório",
                  })}
                  placeholder="Digite o NIF da sua empresa"
                  className="auth-input"
                />
                {errors.nif && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.nif.message}
                  </span>
                )}
              </label>
            </motion.div>

            <motion.div
              className="w-full flex flex-col items-end"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}>
              <label className="auth-label">
                Contacto telefónico
                <input
                  type="text"
                  {...register("phoneNumber", {
                    required: "Contacto é obrigatório",
                  })}
                  placeholder="Digite o contacto da sua empresa"
                  className="auth-input"
                />
                {errors.phoneNumber && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.phoneNumber.message}
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
                "Avançar"
              )}
            </motion.button>

            <Link
              href="/login"
              className="text-sm font-semibold hover:scale-105 transition-all duration-300 text-gray-400">
              Já tem uma conta? <span className="text-primary-100">Entrar</span>
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
