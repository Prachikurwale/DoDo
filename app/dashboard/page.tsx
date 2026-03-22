"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, LogOut, Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data: session, status: authStatus } = useSession();
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [aiText, setAiText] = useState("Hi! Tap the button to talk to me!");
  
  const recognitionRef = useRef<any>(null);

  // --- HELPER FUNCTIONS (Moved up so useEffect can see them) ---

  const speak = useCallback((text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      utterance.voice = voices.find(v => v.lang.includes("en-US")) || voices[0];
      utterance.pitch = 1.3; 
      utterance.rate = 1.0;

      utterance.onstart = () => {
        setStatus("speaking");
        setAiText(text);
      };
      utterance.onend = () => setStatus("idle");

      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleAIResponse = useCallback(async (userText: string) => {
    setStatus("thinking");
    setAiText("Let me think... 🤔");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userText,
          childName: (session?.user as any)?.childName || "Friend",
          age: (session?.user as any)?.age || 5
        }),
      });
      const data = await res.json();
      speak(data.text);
    } catch (error) {
      console.error("Chat Error:", error);
      setStatus("idle");
      setAiText("My brain is a bit tired. Can you say that again?");
    }
  }, [session, speak]);

  // --- USE EFFECTS ---

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition && !recognitionRef.current) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleAIResponse(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech Error:", event.error);
          setStatus("idle");
          setAiText("I couldn't hear you. Try again! 😊");
        };
      }
    }
  }, [handleAIResponse]);

  // Handle Speech End Cleanup
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = () => {
        if (status === "listening") setStatus("idle");
      };
    }
  }, [status]);

  if (authStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        setStatus("listening");
        setAiText("I'm listening... 👂");
        recognitionRef.current.start();
      } catch (e) {
        console.error("Start error:", e);
      }
    } else {
      alert("Oops! Your browser doesn't support talking yet. Try Chrome!");
    }
  };

  const startStoryMode = async () => {
  setStatus("thinking");
  setAiText("Let me find my big book of stories... 📖");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message: "Tell me a magical story!", 
        isStoryMode: true, // We send this flag to the API
        childName: (session?.user as any)?.childName || "Friend",
        age: (session?.user as any)?.age || 5
      }),
    });
    const data = await res.json();
    speak(data.text);
  } catch (error) {
    setStatus("idle");
    setAiText("I lost my story book! Let's try again.");
  }
};

  return (
    <main className="min-h-screen bg-[#F0F7FF] flex flex-col items-center p-6 relative overflow-hidden">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8 bg-white/50 p-4 rounded-3xl backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">🌟</div>
          <div>
            <h2 className="font-bold text-blue-600 text-lg">Hi, {(session?.user as any)?.childName || "Friend"}!</h2>
          </div>
        </div>
        <button onClick={() => signOut()} className="p-3 bg-red-100 text-red-500 rounded-2xl hover:bg-red-200">
          <LogOut size={20} />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className="relative mb-12">
          <AnimatePresence mode="wait">
            <motion.div 
              key={aiText}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-3xl shadow-xl border-2 border-blue-100 min-w-[250px] text-center"
            >
              <p className="text-blue-600 font-bold text-lg leading-tight">{aiText}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            animate={
              status === "listening" ? { scale: [1, 1.1, 1] } :
              status === "thinking" ? { rotate: [0, 10, -10, 0] } :
              status === "speaking" ? { y: [0, -15, 0] } : 
              { y: [0, -5, 0] }
            }
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-48 h-48 bg-yellow-300 rounded-[4rem] shadow-2xl flex items-center justify-center text-8xl border-8 border-white"
          >
            🦤
          </motion.div>
        </div>

        <div className="flex gap-4 mb-10">
           <div className={`px-4 py-2 rounded-full font-bold transition-all ${status === 'listening' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}>👂 Listening</div>
           <div className={`px-4 py-2 rounded-full font-bold transition-all ${status === 'thinking' ? 'bg-purple-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}>🤔 Thinking</div>
        </div>
      </div>

      <button
        onClick={startListening}
        disabled={status !== "idle"}
        className={`w-full max-w-xs py-6 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-2 transition-all active:scale-95 mb-10 ${
          status === "listening" ? "bg-red-500 animate-pulse" : "bg-blue-500"
        } ${status !== "idle" && status !== "listening" ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Mic className="text-white" size={32} />
        <span className="text-white font-black text-xl tracking-wide uppercase">
          {status === "listening" ? "I'm Listening..." : "Tap to Talk"}
        </span>
      </button>

      <div className="flex gap-4 w-full max-w-xs mb-4">
  <button
    onClick={startStoryMode}
    disabled={status !== "idle"}
    className="flex-1 py-4 bg-orange-400 hover:bg-orange-500 text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
  >
    <span>📖</span> Story Time
  </button>
</div>
    </main>
  );
}