"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { moodQuotes } from "./mood-quotes";

const moods = [
  {
    icon: "🧠",
    title: "Deep Focus",
    subtitle: "Block the noise. Find your flow.",
  },
  {
    icon: "☕",
    title: "Chill & Relax",
    subtitle: "Take it easy. Keep it moving.",
  },
  {
    icon: "💻",
    title: "Coding Mode",
    subtitle: "Code. Debug. Repeat.",
  },
  {
    icon: "🌙",
    title: "Late Night",
    subtitle: "One more task. One more song.",
  },
];

export default function Home() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((current) => current + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMoodSelect = (moodTitle: string) => {
    setSelectedMood(moodTitle);
    router.push(`/player?mood=${encodeURIComponent(moodTitle)}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090c] text-black">
      <div className="office-background" aria-hidden="true">
        <div className="laptop-glow" />
        <div className="coffee-scene">
          <div className="steam" />
          <div className="steam" />
          <div className="steam" />
          <div className="cup" />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-4xl py-10 text-center md:py-12">
          <Image
            src="/kaamkidhun-logo.svg"
            alt="KaamKiDhun"
            width={660}
            height={140}
            loading="eager"
            className="mx-auto h-auto w-full max-w-[410px]"
          />

          <div className="mt-6">
            <h2 className="text-2xl font-bold md:text-3xl">
              What&apos;s your work mood today?
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {moods.map((mood) => (
                <button
                  key={mood.title}
                  onClick={() => handleMoodSelect(mood.title)}
                  className={`glass-card group rounded-[22px] border p-5 text-left backdrop-blur-xl transition-all duration-500 ${
                    selectedMood === mood.title
                      ? "scale-[1.02] border-black/20 bg-white/90 text-black shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
                      : "border-black/15 bg-white/65 text-black hover:scale-[1.01] hover:border-black/25 hover:bg-white/80"
                  }`}
                >
                  <div className="text-3xl">{mood.icon}</div>

                  <h3 className="mt-3 text-xl font-semibold">{mood.title}</h3>

                  <p
                    className={`mt-2 ${
                      selectedMood === mood.title ? "text-black/60" : "text-black/70"
                    }`}
                  >
                    {mood.subtitle}
                  </p>

                  <p key={quoteIndex} className="mood-quote mt-4 text-sm font-medium leading-relaxed text-black">
                    {moodQuotes[mood.title][quoteIndex % moodQuotes[mood.title].length]}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {selectedMood && (
            <div className="mt-10 text-black/75">
              You selected <span className="font-semibold text-black">{selectedMood}</span>.
              Your music is coming up 🎵
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

