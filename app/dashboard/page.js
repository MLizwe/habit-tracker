"use client"
import { useState, useEffect } from "react"
import HabitCard from "../components/HabitCard"

export default function Dashboard() {
  const [habits, setHabits] = useState([])

  useEffect(() => {
    fetch('/api/habits')
      .then((response) => response.json())
      .then((data) => setHabits(data))
  }, [])

  const deleteHabit = async (id) => {
    await fetch(`/api/habits/${id}`, {
      method: 'DELETE'
    })
    setHabits(habits.filter((habit) => habit._id !== id))
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <div className="flex flex-col gap-4">
        {habits.map((habit) => (
          <HabitCard key={habit._id} habit={habit} onDelete={deleteHabit} />
        ))}
      </div>
    </div>
  );
}