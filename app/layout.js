import "./globals.css";
import Link from "next/link";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import Navbar from "@/components/Navbar";

export default async function RootLayout({ children }) {

  async function logout() {
    'use server'
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/login');
  }

  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  let user = null;

  if (session) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(session.value, secret);
        user = payload;
    } catch (error) {
        user = null;
    }
}
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-900 text-white">
        <nav className="w-full bg-gray-800 px-8 py-4 flex gap-8 items-center">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/habits" className="text-gray-300 hover:text-white transition-colors">Habits</Link>
          
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <>
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full"/>
                <span className="text-gray-300 text-sm">{user.name}</span>
                <form action={logout}>
                  <button type="submit" className="text-red-400 hover:text-red-300 text-sm transition-colors">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                Login
              </Link>
            )}
          </div>
        </nav>

        <main className="flex-1 flex flex-col px-4 py-10 w-full max-w-3xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}