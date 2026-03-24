// components/Navbar.tsx
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user;
  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="w-full bg-[#6D8F8F] p-4 flex justify-between items-center relative z-50">
      {/* Quizzy Logo/Chat Icon */}
      <div className="flex items-center gap-2">
        <span className="text-3xl text-pink-300">💬</span>
        <h1 className="text-4xl font-bold text-white tracking-tighter" style={{ fontFamily: 'cursive' }}>
        DoDo
        </h1>
      </div>

      {/* User Profile Icon */}
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

        {/* Profile Popup */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 rounded-full bg-pink-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
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
    </nav>
  );
}