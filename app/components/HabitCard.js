"use client"
import Link from "next/link";

export default function HabitCard({ habit, onDelete }) {
  return (
    <div className="bg-gray-800 px-6 py-4 rounded-lg flex justify-between items-center">
      <p className="text-white font-medium">{habit.name}</p>
      <div className="flex items-center gap-4">
        <p className="text-purple-400 text-sm">🔥 {habit.streak} day streak</p>
        <Link
          href={`/habits/edit/${habit._id}`}
          className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
          Edit
        </Link>
        <button
          onClick={() => onDelete && onDelete(habit._id)}
          className="text-red-400 hover:text-red-300 text-sm transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}