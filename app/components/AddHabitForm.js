"use client"
import { useState } from "react"

export default function AddHabitForm() {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("Health")

    const addHabit = async () => {
        await fetch('/api/habits', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, category })
        })
        setName("")
        window.location.reload()
    }

    return (
        <div className="flex gap-4 mt-4">
            <input
                type="text"
                placeholder="Habit name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-800 text-white px-4 py-3 rounded-lg"
            >
                <option>Health</option>
                <option>Learning</option>
                <option>Fitness</option>
            </select>
            <button
                onClick={addHabit}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                Add Habit
            </button>
        </div>
    )
}