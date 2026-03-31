"use client";

import api from "@/src/app/api/config";
import { useRouter } from "@/src/i18n/navigation";
import { motion } from "framer-motion";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ResetPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>();

  const router = useRouter();
  const [entidade, setEntidade] = useState<string>("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const entidadeString = localStorage.getItem("entidade_esqueci_senha");

    if (entidadeString) {
      const parsedEntidade = JSON.parse(entidadeString);
      setEntidade(parsedEntidade);
    }
  }, []);

  const passwordRules = {
    required: "Senha é obrigatória",
    minLength: {
      value: 8,
      message: "A senha deve ter no mínimo 8 caracteres",
    },
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).+$/,
      message:
        "A senha deve ter 1 letra maiúscula, 1 número e 1 caractere especial",
    },
  };

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    if (!entidade) {
      toast.error("Entidade não encontrada. Tente novamente.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.patch(
        `/customers/${entidade}/redifinir-senha`,
        {
          senha: data.newPassword,
          confirmar_senha: data.confirmPassword,
        }
      );

      if (response.status === 202) {
        localStorage.removeItem("entidade_esqueci_senha");
        toast.success("Palavra-passe redefinida com sucesso.");
        router.push("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 412) {
        toast.error("A senha e a confirmação de senha não coincidem.");
      } else {
        toast.error("Erro ao redefinir senha. Tente novamente.");
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
            Redefinir Senha
          </motion.h1>
          <p className="text-gray-400">
            Informe seu email para receber um link de recuperação de senha.
          </p>
        </div>

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
              className="auth-label-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}>
              Senha
              <div className="auth-input flex items-center justify-between gap-2">
                <input
                  type={show ? "text" : "password"}
                  {...register("newPassword", passwordRules)}
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
              {errors.newPassword && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.newPassword.message}
                </span>
              )}
            </motion.label>

            <motion.div
              className="w-full flex flex-col items-end"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}>
              <label className="auth-label-2">
                Confirmar senha
                <div className="auth-input flex items-center justify-between gap-2">
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword", {
                      validate: (value, formValues) =>
                        value === formValues.newPassword ||
                        "As senhas não coincidem",
                    })}
                    placeholder="**********"
                    className="outline-none w-full"
                  />
                  <button
                    type="button"
                    className="transition-all duration-300 cursor-pointer"
                    onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeClosed size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword.message}
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
                "Redefinir senha"
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
