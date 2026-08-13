import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { connectToDB } from "@/api/db";
import HabitListItem from "@/components/HabitListItem";
import AddHabitForm from "@/components/AddHabitForm";

export default async function Habits() {
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

    const categories = ['Health', 'Learning', 'Fitness'];

    return (
        <div className="w-full flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-white">Habits</h1>

            {categories.map(category => (
                <div key={category}>
                    <h2 className="text-xl font-semibold text-purple-400 mb-2">{category}</h2>
                    <ul className="flex flex-col gap-2">
                        {habits
                            .filter(habit => habit.category === category)
                            .map(habit => (
                                <HabitListItem key={habit._id.toString()} name={habit.name} />
                            ))
                        }
                    </ul>
                </div>
            ))}

            <AddHabitForm />
        </div>
    );
}