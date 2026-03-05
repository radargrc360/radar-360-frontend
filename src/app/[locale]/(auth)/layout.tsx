"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden flex">
      <div className="w-1/2 h-full overflow-y-auto overflow-x-hidden relative">
        <ToastContainer />
        {children}
      </div>

      <div className="w-1/2 h-full flex relative bg-primary text-white">
        <motion.div
          className="flex flex-col gap-8 items-start justify-end absolute lg:bottom-0 right-0 3xl:max-w-4xl 3xl:w-full lg:max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: 40 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.9, ease: "easeOut" },
            },
          }}>
          <motion.div
            className="flex flex-col gap-1 w-full lg:max-w-lg"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}>
            <motion.p
              className="text-sm 3xl:text-base"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}>
              Simplicidade radical para gerir riscos e compliance
            </motion.p>

            <motion.h1
              className="font-bold text-lg 3xl:text-4xl"
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.2,
                    ease: "easeOut",
                    delay: 0.1,
                  },
                },
              }}>
              Acompanhe riscos, políticas e auditorias em um só lugar. Uma
              plataforma intuitiva, segura e pronta para acelerar sua
              governança.
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.5,
                type: "spring",
                stiffness: 120,
              },
            }}>
            <Image
              className="3xl:w-224 3xl:h-204 lg:w-150 object-cover object-left"
              src={"/images/dashboard.png"}
              alt={"Layout Image"}
              width={1920}
              height={1040}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
