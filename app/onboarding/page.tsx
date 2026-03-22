"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ childName: "", age: 5, favoriteThings: "" });
  const router = useRouter();
  const { update } = useSession();

  const handleSubmit = async () => {
    const res = await fetch("/api/onboarding", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      // Update session to reflect onboarded: true
      await update(); 
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-b-8 border-pink-200 max-w-md w-full">
        <div className="text-center mb-8">
            <span className="text-5xl">🎒</span>
            <h2 className="text-2xl font-bold text-pink-600 mt-4">Let's get to know you!</h2>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-gray-700 font-bold">What is your name?</label>
            <input 
              type="text" 
              placeholder="Type your name here..."
              className="w-full p-4 rounded-2xl border-2 border-pink-100 focus:border-pink-400 outline-none text-lg text-pink-600 font-bold"
              onChange={(e) => setFormData({...formData, childName: e.target.value})}
            />
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:bg-pink-600 transition-all"
            >
              Next! ➡️
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-gray-700 font-bold">How old are you?</label>
            <input 
              type="number" 
              value={formData.age}
              className="w-full p-4 rounded-2xl border-2 border-pink-100 outline-none text-2xl text-center text-pink-600 font-bold"
              onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
            />
            <button 
              onClick={() => setStep(3)}
              className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:bg-pink-600 transition-all"
            >
              Almost there! ➡️
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <label className="block text-gray-700 font-bold">What is your favorite animal?</label>
            <input 
              type="text" 
              placeholder="Lions? Puppies? Dinosaurs?"
              className="w-full p-4 rounded-2xl border-2 border-pink-100 outline-none text-lg text-pink-600 font-bold"
              onChange={(e) => setFormData({...formData, favoriteThings: e.target.value})}
            />
            <button 
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:bg-green-600 transition-all"
            >
              Let's Play! 🎨
            </button>
          </div>
        )}
      </div>
    </main>
  );
}