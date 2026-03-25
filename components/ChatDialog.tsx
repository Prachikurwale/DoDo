'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'dodo';
  timestamp: Date;
}

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [childInfo, setChildInfo] = useState({
    childName: 'Friend',
    age: 8,
    language: 'English',
    isLearningMode: false,
    isStoryMode: false,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 
  useEffect(() => {
    const savedInfo = localStorage.getItem('childInfo');
    if (savedInfo) {
      try {
        setChildInfo(JSON.parse(savedInfo));
      } catch (e) {
        console.error('Error loading child info:', e);
      }
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          childName: childInfo.childName,
          age: childInfo.age,
          language: childInfo.language,
          isLearningMode: childInfo.isLearningMode,
          isStoryMode: childInfo.isStoryMode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const dodoMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text || 'Sorry, I could not understand that. Can you say it again?',
        sender: 'dodo',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, dodoMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! I'm having trouble right now. Please try again! 🎭",
        sender: 'dodo',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const Bubbles = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-30"
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(i) * 10, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: `${15 + i * 10}px`,
            height: `${15 + i * 10}px`,
            left: `${10 + i * 10}%`,
            top: `${10 + i * 12}%`,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,192,203,${0.2 + i * 0.1}))`,
          }}
        />
      ))}
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-100 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-[350px]  h-117.5 flex flex-col border-2 border-pink-200 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
           
            <div className="absolute inset-0 pointer-events-none">
              <Bubbles />
            </div>

           
            <div className="bg-linear-to-r from-pink-400 to-pink-300 rounded-t-3xl p-4 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎭</span>
                <div>
                  <h2 className="text-xl font-bold text-white">Dodo Chat</h2>
                  <p className="text-sm text-white/80">Chat with Dodo!</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-linear-to-b from-pink-50 to-purple-50 relative z-10">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <span className="text-5xl">👋</span>
                  <p className="text-center text-gray-600">Hello! I'm Dodo! 🎭</p>
                  <p className="text-center text-gray-500 text-sm">
                    Let's chat! Type something to get started!
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-pink-400 text-white rounded-br-none'
                            : 'bg-white text-gray-800 border-2 border-pink-200 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white text-gray-800 border-2 border-pink-200 rounded-2xl rounded-bl-none px-4 py-2">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></span>
                          <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

          
            <form
              onSubmit={handleSendMessage}
              className="border-t-2 border-pink-200 p-4 bg-white rounded-b-3xl flex gap-2 relative z-10"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border-2 text-black border-pink-200 rounded-2xl focus:outline-none focus:border-pink-400 disabled:opacity-50 bg-pink-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-pink-400 hover:bg-pink-500 disabled:opacity-50 text-white p-2 rounded-full transition-colors"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
