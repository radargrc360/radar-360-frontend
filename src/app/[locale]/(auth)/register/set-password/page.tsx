"use client";

import api from "@/src/app/api/config";
import { Link, useRouter } from "@/src/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowLeftToLine, Eye, EyeClosed, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

interface SetPasswordFormInputs {
  representativeName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormInputs>();

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const companyData = useMemo(() => {
    const data = localStorage.getItem("companyData");
    return data ? JSON.parse(data) : null;
  }, []);

  const router = useRouter();

  const onSubmit: SubmitHandler<SetPasswordFormInputs> = async (data) => {
    const combinedData = {
      nome_empresa: companyData.companyName,
      email: companyData.corporateEmail,
      nif: companyData.nif,
      senha: data.password,
      confirmar_senha: data.confirmPassword,
      contacto: companyData.phoneNumber,
    };

    try {
      setLoading(true);
      const response = await api.post("/clientes", combinedData);

      if (response.status === 201) {
        toast.success("Conta criada com sucesso!");
        localStorage.removeItem("companyData");
        router.push("/register/verification-account");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status === 409) {
        toast.error("Email já está em uso por outra empresa.");
      }
      console.error("Erro ao criar conta:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <ToastContainer />
      <div className="text-primary-500 flex-1 flex flex-col h-full justify-center items-center relative">
        <Link
          href={"/register"}
          className="flex items-center font-medium gap-2 text-sm hover:scale-105 transition-all duration-300 fixed top-6 left-6">
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
              Falta pouco
            </motion.h1>
            <p className="text-gray-400">
              Agora é só informar seus dados de acesso
            </p>
          </div>

          <motion.form
            className="flex flex-col items-center justify-center gap-8 w-full "
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
                Nome do representante
                <input
                  type="text"
                  {...register("representativeName", {
                    required: "Nome é obrigatório",
                  })}
                  placeholder="Digite o seu nome completo"
                  className="auth-input"
                />
                {errors.representativeName && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.representativeName.message}
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
                  E-mail
                  <input
                    type="email"
                    {...register("email", {
                      required: "E-mail é obrigatório",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Formato de e-mail inválido",
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

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="w-full flex flex-col items-end"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                  <label className="auth-label">
                    Senha
                    <div className="auth-input flex items-center justify-between gap-2">
                      <input
                        type={show ? "text" : "password"}
                        {...register("password", passwordRules)}
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
                      <span className="text-xs text-red-500 mt-1">
                        {errors.password.message}
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
                    Confirmar sua senha
                    <div className="auth-input flex items-center justify-between gap-2">
                      <input
                        type={showConfirm ? "text" : "password"}
                        {...register("confirmPassword", {
                          validate: (value, formValues) =>
                            value === formValues.password ||
                            "As senhas não coincidem",
                        })}
                        placeholder="**********"
                        className="outline-none w-full"
                      />
                      <button
                        type="button"
                        className="transition-all duration-300 cursor-pointer"
                        onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? (
                          <EyeClosed size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </label>
                </motion.div>
              </div>

              <motion.div
                className="w-full flex flex-col items-end gap-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}>
                <p className="auth-label">Sua senha deve conter:</p>
                <ul className="grid grid-cols-2 gap-3 text-primary-500">
                  {[
                    "Mínimo de 8 caracteres",
                    "Pelo menos um número",
                    "Pelo menos 1 caractere especial",
                    "Pelo menos uma letra maiúscula (ex: !@#$%)",
                  ].map((item, id) => (
                    <li
                      key={id}
                      className="text-gray-400 text-xs flex items-center gap-2">
                      <X className="min-h-3.5 h-3.5 min-w-3.5 w-3.5 text-primary" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
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
                  "Criar conta"
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
}
