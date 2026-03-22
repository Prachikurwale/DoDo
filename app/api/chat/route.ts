import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Chat from "@/models/Chat";

export async function POST(req: Request) {

const { message, childName, age, isStoryMode } = await req.json();

let systemPrompt = `You are Dodo, a friendly AI buddy for a ${age}-year-old kid named ${childName}. Speak in very short, cheerful sentences. Use emojis.`;

if (isStoryMode) {
  systemPrompt = `You are Dodo, a master storyteller for kids. 
  Tell a creative, magical, and short story (under 100 words) that includes ${childName} as a character. 
  Use a gentle, exciting tone. End with a moral or a happy thought.`;
}
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return new NextResponse("Unauthorized", { status: 401 });


  await connectDB();

  // 1. Fetch last 5 messages for memory
  const history = await Chat.find({ userId: (session.user as any).id })
    .sort({ createdAt: -1 })
    .limit(5);

  const formattedHistory = history.reverse().map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
        messages: [
          { 
            role: "system", 
            content: `You are Dodo, a friendly AI buddy for a ${age}-year-old kid named ${childName}. Speak in very short, cheerful sentences. Use emojis! 🎈` 
          },
          ...formattedHistory,
          { role: "user", content: message }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // 2. Save both messages to MongoDB
    await Chat.create([
      { userId: (session.user as any).id, role: 'user', content: message },
      { userId: (session.user as any).id, role: 'assistant', content: aiResponse }
    ]);

    return NextResponse.json({ text: aiResponse });
  } catch (error) {
    return new NextResponse("AI Error", { status: 500 });
  }
}