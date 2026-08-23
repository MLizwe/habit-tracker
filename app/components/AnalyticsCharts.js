"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsCharts({ habits }) {
    const categoryCount = habits.reduce((acc, habit) => {
        acc[habit.category] = (acc[habit.category] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.entries(categoryCount).map(([name, value]) => ({
        name,
        value
    }));

    const streakData = habits.map(habit => ({
        name: habit.name.length > 15 ? habit.name.substring(0, 15) + '...' : habit.name,
        streak: habit.streak
    }));

    return (
        <div className="flex flex-col gap-8">

            <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Habits by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Streak Progress</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={streakData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="streak" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Day Streak" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-400">{habits.length}</p>
                    <p className="text-gray-400 text-sm mt-1">Total Habits</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-400">
                        {habits.reduce((sum, h) => sum + h.streak, 0)}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">Total Streak Days</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-400">
                        {habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">Best Streak</p>
                </div>
            </div>
        </div>
    );
}