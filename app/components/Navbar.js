import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 px-8 py-4 flex gap-8">
      <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
      <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
      <Link href="/habits" className="text-gray-300 hover:text-white transition-colors">Habits</Link>
    </nav>
  );
}