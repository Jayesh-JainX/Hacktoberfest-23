import NavBar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "text To Speech",
  description: "Text TO speech webiste using SpeechSynthesis API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-700`}>
        <div className="w-full">
          <NavBar />
        </div>
        {children}
      </body>
    </html>
  );
}
