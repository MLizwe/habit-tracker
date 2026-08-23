import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { connectToDB } from "@/api/db";
import AnalyticsCharts from "@/components/AnalyticsCharts";

export default async function Analytics() {
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
        name: habit.name,
        streak: habit.streak,
        category: habit.category,
    }));

    return (
        <div className="w-full flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400">Track your habit progress and streaks</p>
            <AnalyticsCharts habits={serializedHabits} />
        </div>
    );
}