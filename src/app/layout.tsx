import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radar 360 - Plataforma de Gestão de Riscos",
  description:
    "Plataforma inovadora para gestão de riscos empresariais, oferecendo monitoramento em tempo real, análises detalhadas e relatórios personalizados para ajudar sua empresa a mitigar riscos e tomar decisões informadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${manrope.variable} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
