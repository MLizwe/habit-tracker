"use client"
import { useState, useEffect } from "react"


export default function Dashboard() {

  const [habits, setHabits] = useState([])

  useEffect (() => {
    fetch('/api/habits')
    .then((response) => response.json())
    .then ((data) => setHabits(data))

  }, [])

  return (
    <div>
      <h1>Dashboard</h1>

      {habits.map((habit) => (
        <p>{habit.name}</p>
      ))}

    </div>
  );
}