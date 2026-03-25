// components/Navbar.tsx
'use client';

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ChatDialog from "./ChatDialog";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const user = session?.user;
  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="w-full bg-[#ffffff] p-4 flex justify-between items-center relative z-50">
      
      <div className="flex items-center gap-2 relative">
         
       
        <h1 className="text-4xl font-bold text-[#993366] tracking-tighter" style={{ fontFamily: 'cursive' }}>
        DoDo
        </h1>
       
      </div>

    
      <button
        onClick={() => setIsChatOpen(true)}
        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 text-white rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
      >
        <MessageCircle size={20} />
        <span>Chat with Dodo</span>
      </button>

    
      <button
        onClick={() => setIsChatOpen(true)}
        className="sm:hidden p-2 hover:bg-pink-100 rounded-full transition-colors"
      >
        <MessageCircle size={24} className="text-pink-400" />
      </button>

    
      <div className="relative">
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-md flex items-center justify-center bg-pink-400 text-white font-bold text-xl"
        >
          {user?.image ? (
            <img src={user.image} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <span>{initial}</span>
          )}
        </button>

        
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 flex flex-col items-center gap-3 relative"
            >
             
              
              <div className="w-20 h-20 rounded-full bg-pink-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg relative">
               
                 {user?.image ? <img src={user.image} className="rounded-full" /> : initial}
              </div>
              <div className="text-center">
                <p className="font-black text-gray-800 text-lg">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button 
                onClick={() => signOut()}
                className="mt-2 w-full py-3 bg-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

 
      <ChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </nav>
  );
}