"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Heart, BookOpen, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ParentDashboard() {
  const router = useRouter();
  const { status: authStatus } = useSession();
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/");
    }
  }, [authStatus, router]);

  useEffect(() => {
    fetch("/api/parent/insights")
      .then(res => res.json())
      .then(data => {
        setInsights(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center font-bold text-blue-600">Generating Child Progress Report... 📊</div>;

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Dodo Parent Insights</h1>
          <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 font-semibold">
            <ArrowLeft size={20} /> Back to Play Mode
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Interests Card */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="font-bold text-slate-700 mb-2">Top Interests</h3>
            <div className="flex flex-wrap gap-2">
              {insights?.top_interests?.map((item: string) => (
                <span key={item} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mood Card */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 mb-4">
              <Heart size={24} />
            </div>
            <h3 className="font-bold text-slate-700 mb-2">Child's Mood</h3>
            <p className="text-slate-600 capitalize">{insights?.emotional_tone || "Curious & Happy"}</p>
          </motion.div>

          {/* Learning Card */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
              <BookOpen size={24} />
            </div>
            <h3 className="font-bold text-slate-700 mb-2">Learning Update</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{insights?.learning_milestones}</p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}