import HabitListItem from "../components/HabitListItem";

export default function Habits() {
  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-white">Habits</h1>

      <div>
        <h2 className="text-xl font-semibold text-purple-400 mb-2">Health</h2>
        <ul className="flex flex-col gap-2">
          <HabitListItem name="Drink water" />
          <HabitListItem name="Sleep 8 hours" />
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-purple-400 mb-2">Learning</h2>
        <ul className="flex flex-col gap-2">
          <HabitListItem name="Reading" />
          <HabitListItem name="Journaling" />
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-purple-400 mb-2">Fitness</h2>
        <ul className="flex flex-col gap-2">
          <HabitListItem name="30 minute Exercise" />
          <HabitListItem name="10 000 steps" />
        </ul>
      </div>

      <form className="flex gap-4 mt-4">
        <input type="text" placeholder="Add a new habit" className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg outline-none" />
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">Add Habit</button>
      </form>
    </div>
  );
}