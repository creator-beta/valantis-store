import { Inter } from "next/font/google";
import { NavBar } from "./components/NavBar/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Valantis Store",
  description: "Тестовое задание для ООО Валантис",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
