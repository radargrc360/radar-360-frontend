"use client";

import { Link, useRouter } from "@/src/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { useState } from "react";
import api from "../../../api/config";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";

interface LoginFields {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const router = useRouter();
  const cookies = new Cookies();
  const [loading, setLoading] = useState<boolean>(false);

  const [show, setShow] = useState(false);

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/customers/login", {
        email: data.email,
        senha: data.password,
      });

      if (res.status === 202) {
        const { hash, entidade } = res.data.message;

        cookies.set("cliente_hash", hash, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          path: "/",
        });

        cookies.set("cliente_entidade", entidade, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          path: "/",
        });

        localStorage.setItem("cliente_hash", hash);
        localStorage.setItem("cliente_entidade", JSON.stringify(entidade));

        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Email ou palavra-passe inválidos.");
      } else {
        toast.error("Erro ao tentar iniciar sessão. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-primary-500 flex-1 flex flex-col h-full justify-center items-center relative">
      <ToastContainer position="bottom-right" />

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
        <motion.h1
          className="text-2xl font-semibold"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}>
          Entre na sua conta
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-8 w-full"
          variants={{}}>
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
              E-mail
              <input
                type="email"
                placeholder="Digite o seu e-mail"
                {...register("email", { required: "O e-mail é obrigatório" })}
                className="auth-input"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </motion.label>

            <motion.div
              className="w-full flex flex-col items-end"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}>
              <motion.label
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="auth-label">
                Senha
                <div className="auth-input flex items-center justify-between gap-2">
                  <input
                    type={show ? "text" : "password"}
                    {...register("password", {
                      required: "Insira a sua palavra-passe",
                    })}
                    placeholder="**********"
                    className="outline-none w-full"
                  />
                  <button
                    type="button"
                    className="transition-all duration-300 cursor-pointer"
                    onClick={() => setShow(!show)}>
                    {show ? <EyeClosed size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </motion.label>
              <Link
                href="/recover-password"
                className="text-sm border-b border-primary-500 hover:scale-105 transition-all duration-300">
                Esqueceu sua senha?
              </Link>
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
                "Entrar"
              )}
            </motion.button>

            <Link
              href="/register"
              className="text-sm font-semibold hover:scale-105 transition-all duration-300 text-gray-400">
              Não tem uma conta?{" "}
              <span className="text-primary-100">Crie sua conta</span>
            </Link>
          </motion.div>
        </motion.form>

        <motion.div
          className="w-full flex items-center gap-2 text-gray-400"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}>
          <motion.hr
            className="border border-gray-200 w-full"
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          />
          ou
          <motion.hr
            className="border border-gray-200 w-full"
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          />
        </motion.div>

        <motion.button
          type="button"
          className="px-3 py-2 w-full rounded-lg bg-white text-primary font-semibold border border-gray-400 hover:scale-105 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              stiffness: 120,
              delay: 0.3,
            },
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}>
          <Image
            src="/icons/google.png"
            alt="Google Icon"
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
          />
          Continuar com o Google
        </motion.button>
      </motion.div>
    </div>
  );
}
