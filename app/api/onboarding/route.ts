// app/api/onboarding/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Correct import path
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { childName, age, favoriteThings } = body;

    await connectDB();
    await User.findOneAndUpdate(
      { email: session.user?.email },
      { 
        childName, 
        age, 
        preferences: { favoriteAnimals: [favoriteThings] },
        onboarded: true 
      }
    );

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}