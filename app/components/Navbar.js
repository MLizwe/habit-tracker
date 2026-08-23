"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ user, onLogout }) {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <nav className="w-full bg-gray-800 px-8 py-4 flex gap-8 items-center">
            <Link href="/" className={`transition-colors ${isActive('/') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}>
                Home
            </Link>
            <Link href="/dashboard" className={`transition-colors ${isActive('/dashboard') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}>
                Dashboard
            </Link>
            <Link href="/habits" className={`transition-colors ${isActive('/habits') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}>
                Habits
            </Link>
            <Link href="/analytics" className={`transition-colors ${isActive('/analytics') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}>
                Analytics
            </Link>

            <div className="ml-auto flex items-center gap-4">
                {user ? (
                    <>
                        <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full"/>
                        <span className="text-gray-300 text-sm">{user.name}</span>
                        <form action={onLogout}>
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
    );
}