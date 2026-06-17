export default function HabitCard({ habit }) {
  return (
    <div className="bg-gray-800 px-6 py-4 rounded-lg flex justify-between items-center">
      <p className="text-white font-medium">{habit.name}</p>
      <p className="text-purple-400 text-sm">🔥 {habit.streak} day streak</p>
    </div>
  );
}