import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Chat from "@/models/Chat";

export async function POST(req: Request) {

const { message, childName, age, language, isLearningMode, isStoryMode } = await req.json();

let systemPrompt = `You are Dodo, a friendly AI buddy for a ${age}-year-old kid named ${childName}.
  
  LANGUAGE: Respond in ${language}.
  
  TONE:
  - Keep sentences very short and cheerful.
  
  - Use simple vocabulary for a ${age} year old.
`;

if (isStoryMode) {
  systemPrompt = `You are Dodo, a master storyteller for kids. 
  Tell a creative, magical, and short story (under 100 words) that includes ${childName} as a character. 
  Use a gentle, exciting tone. End with a moral or a happy thought.
  Respond in ${language}.`;
} else if (isLearningMode) {
  systemPrompt += ` You are a kind teacher. 
  Pick ONE simple thing to teach (like the sound an animal makes, a color, or a letter). 
  Ask a very simple question at the end to keep the child engaged. 
  Keep it under 30 words.
  Respond in ${language}.`;
} else {
  systemPrompt += ` Speak in short, cheerful sentences with emojis in ${language}!`;
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
            content: systemPrompt
          },
          ...formattedHistory,
          { role: "user", content: message }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response:", data);
      return NextResponse.json({ text: "Oops! Dodo got confused. Try again!" }, { status: 500 });
    }
    
    const aiResponse = data.choices[0].message.content;

    // 2. Save both messages to MongoDB
    await Chat.create([
      { userId: (session.user as any).id, role: 'user', content: message },
      { userId: (session.user as any).id, role: 'assistant', content: aiResponse }
    ]);

    return NextResponse.json({ text: aiResponse });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ text: "Dodo's brain is sleeping. Try again soon! 😴" }, { status: 500 });
  }
}