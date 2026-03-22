"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // If they are logged in, check if they finished onboarding
      if ((session?.user as any).onboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    }
  }, [status, session, router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-yellow-300 max-w-md w-full text-center">
        {/* Animated Avatar Placeholder */}
        <div className="w-40 h-40 bg-yellow-200 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl animate-bounce">
          🦤
        </div>
        
        <h1 className="text-4xl font-bold text-purple-600 mb-2">Hi! I'm Dodo</h1>
        <p className="text-gray-500 mb-8 font-medium">Your new AI learning buddy!</p>

        <button
          onClick={() => signIn("google")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
        >
          <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" />
          Start Playing with Google
        </button>
        
        <p className="mt-6 text-sm text-gray-400">Safe and fun for kids aged 4-10</p>
      </div>
    </main>
  );
}