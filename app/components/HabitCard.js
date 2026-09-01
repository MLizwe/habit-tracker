"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HabitCard({ habit }) {
    const router = useRouter();

    const handleDelete = async () => {
        await fetch(`/api/habits/${habit._id}`, {
            method: 'DELETE'
        });
        router.refresh();
    }

    const handleComplete = async () => {
        await fetch(`/api/habits/${habit._id}`, {
            method: 'PATCH'
        });
        router.refresh();
    }

    const handleReset = async () => {
        if (!confirm('Are you sure you want to reset this streak to 0?')) return;
        await fetch(`/api/habits/${habit._id}`, {
            method: 'POST'
        });
        router.refresh();
    }

    return (
        <div className="bg-gray-800 px-6 py-4 rounded-lg flex justify-between items-center">
            <p className="text-white font-medium">{habit.name}</p>
            <div className="flex items-center gap-4">
                <p className="text-purple-400 text-sm">🔥 {habit.streak} day streak</p>
                <button
                    onClick={handleComplete}
                    className="text-green-400 hover:text-green-300 text-sm transition-colors">
                    ✓ Complete
                </button>
                <button
                    onClick={handleReset}
                    className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
                    ↺ Reset
                </button>
                <Link
                    href={`/habits/edit/${habit._id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                    Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="text-red-400 hover:text-red-300 text-sm transition-colors">
                    Delete
                </button>
            </div>
        </div>
    );
}