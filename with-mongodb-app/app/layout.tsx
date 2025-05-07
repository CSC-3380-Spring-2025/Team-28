import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login - Hobby Helper",
  description: "The Login Page for the Hobby Helper webapp",
};

//Bare bones layout to display anything related to logging in
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full">
      <body>{children}</body>
    </html>
  );
}
