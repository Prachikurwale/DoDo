// "use client";

 
// import Navbar from "@/components/Navbar";
 

// import { useSession } from "next-auth/react";
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Loader2, Sparkles, Lightbulb } from "lucide-react";

// export default function DodoMobileDashboard() {
//   const { data: session } = useSession();
//   const [isReady, setIsReady] = useState(false);
// const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
//   const [aiText, setAiText] = useState("Hi I'm Dodo!");
  
 
//   const ttsRef = useRef<any>(null);
//   const sttRef = useRef<any>(null);

  
// useEffect(() => {
//   async function initSpeech() {
   
// const { sharedAudioPlayer } = await import("speech-to-speech");

// sharedAudioPlayer.setPlayingChangeCallback((isPlaying) => {
//   if (isPlaying) {
//     setStatus("speaking");
//   } else {
    
//     setStatus("listening");
//     sttRef.current?.start(); 
//   }
// });
    
//     try {
//       const { TTSLogic, STTLogic, sharedAudioPlayer } = await import("speech-to-speech");

     
//       sharedAudioPlayer.configure({ autoPlay: true });
 
//       const tts = new TTSLogic({ voiceId: "en_US-hfc_female-medium" });
//       await tts.initialize();
//       ttsRef.current = tts;
//       // We use a Promise.race to make sure we don't wait forever
//       await Promise.race([
//         tts.initialize(),
//         new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 10000))
//       ]);
      
//       ttsRef.current = tts;

//       const stt = new STTLogic(
//                   (msg) => console.log(msg),
//                     (transcript) => handleVoiceInput(transcript)
//       );
//       sttRef.current = stt;
   
//       setIsReady(true);
//       console.log("Dodo is awake and ready! 🔓");

//     } catch (err) {
//       console.error("Dodo initialization hiccup:", err);
    
//       setIsReady(true); 
//     }
//   }
//   initSpeech();
// }, []);
// const stripEmojis = (text: string) => {
  
//   return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu, '');
// };

// const handleVoiceInput = async (transcript: string) => {
//   if (!transcript.trim()) return;
  
//   // 1. Pehle Mic ko stop karo taaki Dodo khud ki awaaz na sune
//   sttRef.current?.stop(); 
//   setStatus("thinking");

//   try {
//     const res = await fetch("/api/chat", {
//       method: "POST",
//       body: JSON.stringify({ message: transcript, childName: session?.user?.name })
//     });
//     const data = await res.json();
    
//     if (data.text) {
//       setAiText(data.text);
//       const cleanText = stripEmojis(data.text);

//       const result = await ttsRef.current.synthesize(cleanText);
//       const { sharedAudioPlayer } = await import("speech-to-speech");
      
//       sharedAudioPlayer.addAudioIntoQueue(result.audio, result.sampleRate);
      
//       // 2. Dodo bolna shuru karega
//       await sharedAudioPlayer.playAudiosFromQueue(); 
      
//       // 3. MAGIC STEP: Bolne ke baad Mic apne aap on ho jayega
//       setTimeout(() => {
//         wakeUpDodo(); // Khud se mic on kar do!
//       }, 500); 
//     }
//   } catch (error) {
//     console.error("Dodo error:", error);
//     setStatus("idle");
//   }
// };

//  const wakeUpDodo = () => {
 
//   if (!isReady || !sttRef.current) {
//     console.warn("Dodo is still waking up... 😴");
//     setAiText("Wait a second, I'm waking up! ✨");
//     return;
//   }

//   try {
//     setStatus("listening");
//     setAiText("I'm listening... 👂");
    
//     // Start the microphone
//     sttRef.current.start();
//   } catch (err) {
//     console.error("Mic error:", err);
//     setStatus("idle");
//     setAiText("I couldn't hear you. Try again! 🎤");
//   }
// };

 
 

   

//   return (

// <div className="min-h-screen bg-white flex flex-col items-center">
//     <Navbar />
    
      

      
//       <div className="flex-1 flex flex-col items-center gap-12 justify-center max-w-md ">
        
        
      
//           <div className="relative">

//           </div>
//           <motion.div 
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="absolute -top-4 -right-20 bg-pink-400 text-white px-6 py-3 rounded-[2rem] rounded-bl-none shadow-lg z-10"
//           >
//             <p className="font-bold text-xl">I'm Listening!</p>
//           </motion.div>
       

//         {/* Dodo Character (Purple Penguin) */}
//         <motion.div
//           animate={status === "listening" ? { scale: [1, 1.05, 1] } : { y: [0, -10, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           className="relative w-64 h-64"
//         >
//           <div className="w-64 h-64 rounded-full border-[6px] border-[#FF4D00] overflow-hidden shadow-2xl">
//             <img 
//   src="/cute.jpg"  
//   alt="Dodo" 
//   className="w-full h-full rounded-full object-cover"
// />
//           </div>
//         </motion.div>

//         <p className="mt-8 text-[#9333EA] font-semibold text-center max-w-[200px]">
//           Wakeup toy to begin conversations?
//         </p>
//       </div>

//       {/* Bottom Actions */}
//       <div className="w-full max-w-sm space-y-4 mb-8">
//       <button
//   onClick={wakeUpDodo}
//   disabled={!isReady}
//   className={`w-full py-5 text-white rounded-2xl font-bold text-lg shadow-xl transition-all ${
//     status === "listening" ? "bg-red-500 animate-pulse" : "bg-[#A855F7]"
//   }`}
// >

//   {!isReady ? (
//     <Loader2 className="animate-spin" size={24} />
//   ) : status === "listening" ? (
//     "DODO IS LISTENING... 👂"
//   ) : (
//     "WAKEUP DODO"
//   )}
// </button>

//         {/* Info Card */}
//         <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between shadow-sm border border-white">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
//               <Lightbulb className="text-pink-500" size={20} />
//             </div>
//             <p className="text-sm font-bold text-gray-700 leading-tight">
//               How Dodo makes your<br/>child smart?
//             </p>
//           </div>
//           <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
//             <Play size={12} className="text-gray-400 fill-gray-400" />
//           </button>
//         </div>
//       </div>
     
//  </div>




//   );
// }





"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Loader2, Sparkles, Lightbulb } from "lucide-react";

export default function DodoMobileDashboard() {
  const { data: session } = useSession();
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [aiText, setAiText] = useState("Hi I'm Dodo!");

  const ttsRef = useRef<any>(null);
  const sttRef = useRef<any>(null);

  useEffect(() => {
    async function initSpeech() {
      const { sharedAudioPlayer } = await import("speech-to-speech");

      sharedAudioPlayer.setPlayingChangeCallback((isPlaying) => {
        if (isPlaying) {
          setStatus("speaking");
        } else {
          setStatus("listening");
          sttRef.current?.start();
        }
      });

      try {
        const { TTSLogic, STTLogic, sharedAudioPlayer } = await import("speech-to-speech");

        sharedAudioPlayer.configure({ autoPlay: true });

        const tts = new TTSLogic({ voiceId: "en_US-hfc_female-medium" });
        await tts.initialize();
        ttsRef.current = tts;
        
        await Promise.race([
          tts.initialize(),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 10000))
        ]);

        ttsRef.current = tts;

        const stt = new STTLogic(
          (msg) => console.log(msg),
          (transcript) => handleVoiceInput(transcript)
        );
        sttRef.current = stt;

        setIsReady(true);
        console.log("Dodo is awake and ready! 🔓");

      } catch (err) {
        console.error("Dodo initialization hiccup:", err);
        setIsReady(true);
      }
    }
    initSpeech();
  }, []);

  const stripEmojis = (text: string) => {
    return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu, '');
  };

  const handleVoiceInput = async (transcript: string) => {
    if (!transcript.trim()) return;
    sttRef.current?.stop();
    setStatus("thinking");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: transcript, childName: session?.user?.name })
      });
      const data = await res.json();

      if (data.text) {
        setAiText(data.text);
        const cleanText = stripEmojis(data.text);
        const result = await ttsRef.current.synthesize(cleanText);
        const { sharedAudioPlayer } = await import("speech-to-speech");

        sharedAudioPlayer.addAudioIntoQueue(result.audio, result.sampleRate);
        await sharedAudioPlayer.playAudiosFromQueue();

        setTimeout(() => {
          if (status !== "idle") wakeUpDodo();
        }, 500);
      }
    } catch (error) {
      console.error("Dodo error:", error);
      setStatus("idle");
    }
  };

  const wakeUpDodo = () => {
    if (!isReady || !sttRef.current) {
      console.warn("Dodo is still waking up... 😴");
      setAiText("Wait a second, I'm waking up! ✨");
      return;
    }
    try {
      setStatus("listening");
      setAiText("I'm Listening!");
      sttRef.current.start();
    } catch (err) {
      console.error("Mic error:", err);
      setStatus("idle");
      setAiText("I couldn't hear you. Try again! 🎤");
    }
  };

  const stopConversation = async () => {
    const { sharedAudioPlayer } = await import("speech-to-speech");
    sttRef.current?.stop();
    sharedAudioPlayer.stopAndClearQueue();
    setStatus("idle");
    setAiText("Talk to you later! 👋");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 relative">
        
        {/* Character Section with Bubble */}
        <div className="relative mb-12">
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-4 -right-16 bg-pink-400 text-white px-6 py-3 rounded-[2rem] rounded-bl-none shadow-lg z-10"
            >
              <p className="font-bold text-xl">{aiText}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            animate={status === "listening" ? { scale: [1, 1.05, 1] } : { y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-64 h-64 rounded-full border-[6px] border-[#FF4D00] overflow-hidden shadow-2xl bg-gray-100"
          >
            <img
              src="/cute.jpg"
              alt="Quizzy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Start / Stop Buttons Row */}
        <div className="flex gap-4 w-full mb-12">
          <button
            onClick={wakeUpDodo}
            disabled={!isReady || status === "listening"}
            className="flex-1 py-5 bg-[#6D8F8F] text-white rounded-[2.5rem] font-bold text-xl shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {!isReady ? <Loader2 className="animate-spin" size={24} /> : "Start Talking"}
          </button>

          <button
            onClick={stopConversation}
            className="flex-1 py-5 bg-[#6D8F8F] text-white rounded-[2.5rem] font-bold text-lg shadow-lg active:scale-95 transition-all"
          >
            End Conversation
          </button>
        </div>

        {/* Info Card */}
        <div className="w-full bg-white/80 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
              <Lightbulb className="text-pink-500" size={20} />
            </div>
            <p className="text-sm font-bold text-gray-700 leading-tight">
              How Dodo makes your<br />child smart?
            </p>
          </div>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
            <Play size={12} className="text-gray-400 fill-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
