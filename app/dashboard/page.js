import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { connectToDB } from "../api/db";
import HabitCard from "../components/HabitCard";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session){
    redirect('/login');
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(session.value, secret);

  const { db } = await connectToDB();
  const habits = await db.collection('habits')
    .find({ userId: payload.userId })
    .toArray();

  return (
     <div className="w-full flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {payload.name}!</p>
            <div className="flex flex-col gap-4">
                {habits.map((habit) => (
                    <HabitCard key={habit._id.toString()} habit={habit} />
                ))}
            </div>
        </div>
    );
  
}