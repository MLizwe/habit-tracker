import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/habits">Habits</Link>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}