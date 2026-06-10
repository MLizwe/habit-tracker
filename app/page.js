export default function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-8 text-center py-20">
      <h1 className="text-5xl font-bold text-white">Habit Tracker</h1>
      <p className="text-gray-400 text-xl">Build better habits, one day at a time.</p>
      <a href="/habits" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg transition-colors">
        Get Started
      </a>
    </div>
  );
}