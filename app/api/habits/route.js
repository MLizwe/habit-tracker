export async function GET() {
  const habits = [
    { id: 1, name: "Drink water", streak: 3 },
    { id: 2, name: "Exercise", streak: 7 },
    { id: 3, name: "Read", streak: 1 },
  ];

  return Response.json(habits);
}