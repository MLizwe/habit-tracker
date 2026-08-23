"use client"
import { useState } from "react"

export default function SuggestButton() {
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        setLoading(true);
        setSuggestions(null);
        setError(null);

        const response = await fetch('/api/suggest-habits', {
            method: "POST"
        });

        if (response.ok) {
            const data = await response.json();
            setSuggestions(data.suggestions);
            setLoading(false);
        } else {
            const data = await response.json();
            setLoading(false);
            setError(data.error);
        }
    }

    const addSuggestedHabit = async (name, category) => {
        await fetch('/api/habits', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, category })
        });
        window.location.href = '/dashboard';
    }

    return (
        <div className="flex flex-col gap-4 mt-8">
            <button
                onClick={handleClick}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 text-white px-6 py-3 rounded-lg transition-colors">
                {loading ? "Getting suggestions..." : "Get AI Habit Suggestions"}
            </button>

            {error && <p className="text-red-400">Error: {error}</p>}

            {suggestions && suggestions.map((suggestion, i) => (
                <div key={i} className="bg-gray-800 px-6 py-4 rounded-lg flex flex-col gap-2">
                    <h3 className="text-white font-semibold text-lg">{suggestion.name}</h3>
                    <p className="text-purple-400 text-sm">{suggestion.category}</p>
                    <p className="text-gray-300 text-sm">{suggestion.reason}</p>
                    <div className="flex justify-between items-center mt-1">
                        <div className="flex gap-4">
                            <span className="text-gray-400 text-xs">Difficulty: {suggestion.difficulty}</span>
                            <span className="text-gray-400 text-xs">Frequency: {suggestion.frequency}</span>
                        </div>
                        <button
                            onClick={() => addSuggestedHabit(suggestion.name, suggestion.category)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg text-xs transition-colors">
                            + Add Habit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}