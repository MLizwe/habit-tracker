"use client"
import { useState, useEffect } from "react"

export default function Dashboard() {

  const [habits, setHabits] = useState([])

  useEffect(() => {
    fetch('/api/habits')
      .then((response) => response.json())
      .then((data) => setHabits(data))
  }, [])

  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      <div className="flex flex-col gap-4">
        {habits.map((habit) => (
          <div key={habit.id} className="bg-gray-800 px-6 py-4 rounded-lg flex justify-between items-center">
            <p className="text-white font-medium">{habit.name}</p>
            <p className="text-purple-400 text-sm">🔥 {habit.streak} day streak</p>
          </div>
        ))}
      </div>
    </div>
  );
}