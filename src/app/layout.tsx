import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Header } from "@/components/Header/Header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkedIn -Clone-",
  description: "LinkedIn Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Toaster richColors />
          <header className="sticky top-0 bg-white border-b z-50">
            <Header />
          </header>

          <div className="bg-[#F4F2ED] flex-1 w-full">
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
