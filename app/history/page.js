import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { connectToDB } from "@/api/db";

export default async function History() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
        redirect('/login');
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(session.value, secret);

    const { db } = await connectToDB();
    const habits = await db.collection('habits')
        .find({ userId: payload.userId })
        .toArray();

    const serializedHabits = habits.map(habit => ({
        _id: habit._id.toString(),
        name: habit.name,
        category: habit.category,
        streak: habit.streak,
        completedDates: habit.completedDates || []
    }));

    return (
        <div className="w-full flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-white">Completion History</h1>
            <p className="text-gray-400">See when you completed each habit</p>

            <div className="flex flex-col gap-6">
                {serializedHabits.map((habit) => (
                    <div key={habit._id} className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-white font-semibold text-lg">{habit.name}</h2>
                                <p className="text-purple-400 text-sm">{habit.category}</p>
                            </div>
                            <p className="text-gray-400 text-sm">🔥 {habit.streak} day streak</p>
                        </div>

                        {habit.completedDates.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {habit.completedDates.sort().reverse().map((date) => (
                                    <span key={date} className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-xs">
                                        {new Date(date).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No completions yet — click Complete on the dashboard!</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}