import "./globals.css";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Navbar />
        <main className="flex-1 flex flex-col px-4 py-10 w-full max-w-3xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}