// "use client";

// import Navbar from "@/components/Navbar";
// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Sparkles, Heart, Star } from "lucide-react";

// export default function DashboardPage() {
//   const { data: session } = useSession();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   const user = session?.user;

//   return (
//     <main 
//       className="min-h-screen w-full bg-cover bg-center bg-fixed relative"
//       style={{
//         backgroundImage: 'url(/cute.jpg)',
//       }}
//     >
//       {/* Overlay for better text readability */}
//       <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

//       {/* Content */}
//       <div className="relative z-10">
//         <Navbar />
        
//         <div className="container mx-auto px-4 py-12">
//           {/* Welcome Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-12"
//           >
//             <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
//               Welcome, {user?.name}! 👋
//             </h1>
//             <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
//               Ready to learn and play with Dodo? 🎭
//             </p>
//           </motion.div>

//           {/* Feature Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//             {/* Chat Feature */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 border-2 border-pink-200"
//             >
//               <div className="text-5xl mb-4">💬</div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-3">Chat Mode</h2>
//               <p className="text-gray-600 mb-6">
//                 Type messages and chat with Dodo. Learn new things while having fun!
//               </p>
//               <button className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-2xl transition-colors">
//                 Start Chatting
//               </button>
//             </motion.div>

//             {/* Stories Feature */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 border-2 border-purple-200"
//             >
//               <div className="text-5xl mb-4">📖</div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-3">Story Time</h2>
//               <p className="text-gray-600 mb-6">
//                 Listen to magical stories created just for you by Dodo!
//               </p>
//               <button className="w-full bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 rounded-2xl transition-colors">
//                 Tell me a Story
//               </button>
//             </motion.div>

//             {/* Learn Feature */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 border-2 border-blue-200"
//             >
//               <div className="text-5xl mb-4">⭐</div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-3">Learn Mode</h2>
//               <p className="text-gray-600 mb-6">
//                 Dodo will teach you new things in a fun and interactive way!
//               </p>
//               <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl transition-colors">
//                 Learn Now
//               </button>
//             </motion.div>
//           </div>

//           {/* Dodo Character Section */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="flex justify-center mb-12"
//           >
//             <div className="relative">
//               <motion.img
//                 src="/Dodo-img.png"
//                 alt="Dodo Character"
//                 className="w-40 h-40 md:w-56 md:h-56 drop-shadow-2xl"
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ duration: 3, repeat: Infinity }}
//               />
//               <motion.div
//                 className="absolute -top-4 -right-4 text-4xl"
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 ✨
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Stats/Info Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-pink-200 max-w-2xl mx-auto text-center"
//           >
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">
//               Have fun learning! 🎉
//             </h2>
//             <div className="flex justify-around items-center">
//               <div className="text-center">
//                 <div className="text-4xl font-bold text-pink-500">🌟</div>
//                 <p className="text-gray-600 mt-2">Keep Learning</p>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl font-bold text-purple-500">💪</div>
//                 <p className="text-gray-600 mt-2">Stay Curious</p>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl font-bold text-blue-500">😊</div>
//                 <p className="text-gray-600 mt-2">Have Fun!</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </main>
//   );
// }








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
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#993366_0%,#ffffff_100%)] flex flex-col items-center font-sans">
      <Navbar />
<motion.div 
    className="absolute -top-8 -left-8 w-6 h-6 bg-pink-300 rounded-full opacity-70"
    animate={{ scale: [1, 1.3, 1], y: [0, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  />
  <motion.div 
    className="absolute -top-4 -right-10 w-15 h-15 bg-purple-300 rounded-full opacity-60"
    animate={{ scale: [1, 1.2, 1], y: [0, 5, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
  />
  <motion.div 
    className="absolute top-1/4 -left-10 w-4 h-4 bg-blue-300 rounded-full opacity-65"
    animate={{ x: [0, -5, 0], y: [0, -3, 0] }}
    transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
  />
  <motion.div 
    className="absolute top-1/2 -right-12 w-5 h-5 bg-pink-400 rounded-full opacity-55"
    animate={{ scale: [1, 1.4, 1], y: [0, 4, 0] }}
    transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
  />
  <motion.div 
    className="absolute bottom-1/4 -left-6 w-3.5 h-3.5 bg-purple-400 rounded-full opacity-65"
    animate={{ x: [0, -4, 0], y: [0, 3, 0] }}
    transition={{ duration: 2.1, repeat: Infinity, delay: 0.5 }}
  />
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 relative">
        <motion.div 
    className="absolute -top-8 -left-8 w-6 h-6 bg-pink-300 rounded-full opacity-70"
    animate={{ scale: [1, 1.3, 1], y: [0, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  />
  <motion.div 
    className="absolute -top-4 -right-10 w-5 h-5 bg-purple-300 rounded-full opacity-60"
    animate={{ scale: [1, 1.2, 1], y: [0, 5, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
  />
  <motion.div 
    className="absolute top-1/4 -left-10 w-4 h-4 bg-blue-300 rounded-full opacity-65"
    animate={{ x: [0, -5, 0], y: [0, -3, 0] }}
    transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
  />
  <motion.div 
    className="absolute top-1/2 -right-12 w-5 h-5 bg-pink-400 rounded-full opacity-55"
    animate={{ scale: [1, 1.4, 1], y: [0, 4, 0] }}
    transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
  />
  <motion.div 
    className="absolute bottom-1/4 -left-6 w-3.5 h-3.5 bg-purple-400 rounded-full opacity-65"
    animate={{ x: [0, -4, 0], y: [0, 3, 0] }}
    transition={{ duration: 2.1, repeat: Infinity, delay: 0.5 }}
  />
       
        

        <div className="relative mb-12">
  <AnimatePresence>
    <motion.div
       initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -10 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      
       className="absolute   -right-10 px-7 py-4 rounded-4xl rounded-bl-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10 
                   border-2 border-pink-300"
    >
      <p className="font-bold text-xl text-[#111b1a] drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
        {aiText}
      </p>
    </motion.div>
  </AnimatePresence>

 
  <motion.div 
    className="absolute -top-8 -left-8 w-6 h-6 bg-pink-300 rounded-full opacity-70"
    animate={{ scale: [1, 1.3, 1], y: [0, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  />
  <motion.div 
    className="absolute -top-4 -right-10 w-5 h-5 bg-purple-300 rounded-full opacity-60"
    animate={{ scale: [1, 1.2, 1], y: [0, 5, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
  />
  <motion.div 
    className="absolute top-1/4 -left-10 w-4 h-4 bg-blue-300 rounded-full opacity-65"
    animate={{ x: [0, -5, 0], y: [0, -3, 0] }}
    transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
  />
  <motion.div 
    className="absolute top-1/2 -right-12 w-8 h-8 bg-pink-400 rounded-full opacity-55"
    animate={{ scale: [1, 1.4, 1], y: [0, 4, 0] }}
    transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
  />
  <motion.div 
    className="absolute bottom-1/4 -left-6 w-15 h-15 bg-purple-400 rounded-full opacity-65"
    animate={{ x: [0, -4, 0], y: [0, 3, 0] }}
    transition={{ duration: 2.1, repeat: Infinity, delay: 0.5 }}
  />
  <motion.div 
    className="absolute bottom-8 -right-8 w-16 h-16 bg-yellow-300 rounded-full opacity-60"
    animate={{ scale: [1, 1.3, 1], x: [0, 3, 0] }}
    transition={{ duration: 2.4, repeat: Infinity, delay: 0.1 }}
  />
  <motion.div 
    className="absolute bottom-2 -left-8 w-4 h-4 bg-pink-300 rounded-full opacity-70"
    animate={{ y: [0, -4, 0], x: [0, 3, 0] }}
    transition={{ duration: 2.1, repeat: Infinity, delay: 0.5 }}
  />
  <motion.div 
    className="absolute -top-2 right-0 w-13 h-13 bg-blue-400 rounded-full opacity-60"
    animate={{ y: [0, -3, 0], x: [0, 2, 0] }}
    transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
  />
  <motion.div 
    className="absolute top-2/3 -right-6 w-4 h-4 bg-pink-300 rounded-full opacity-65"
    animate={{ scale: [1, 1.2, 1], y: [0, 5, 0] }}
    transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
  />
  <motion.div 
    className="absolute bottom-1/3 right-0 w-3.5 h-3.5 bg-purple-300 rounded-full opacity-55"
    animate={{ x: [0, 4, 0], y: [0, -2, 0] }}
    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
  />

  <motion.div
    animate={status === "listening" ? { scale: [1, 1.05, 1] } : { y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className="relative z-0"  
  >
    <img
      src="/cuteee.png"
      alt="DODO"
      className="w-70 h-auto rounded-full" 
    />
  </motion.div>
</div>
        

       
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
