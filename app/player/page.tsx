"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { moodQuotes } from "../mood-quotes";

const moodPlaylists: Record<string, { id: string; label: string }> = {
  "Deep Focus": { id: "37i9dQZF1DWZeKCadgRdKQ", label: "Deep Focus" },
  "Chill & Relax": { id: "0S7BspoyF9SivXiDRMKoIC", label: "Chill & Relax" },
  "Coding Mode": { id: "0dVN8YejILBjL9lPJVPXkY", label: "Coding Mode" },
  "Late Night": { id: "7nsMxK04hv0Y1EOGCQbEVm", label: "Late Night" },
};

function PlayerContent({ mood }: { mood: string }) {
  const playlist = moodPlaylists[mood] ?? moodPlaylists["Deep Focus"];
  const quotes = moodQuotes[mood] ?? moodQuotes["Deep Focus"];
  const playlistUrl = `https://open.spotify.com/playlist/${playlist.id}`;
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`;
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent px-6 py-10 text-black">
      <div className="office-background" data-mood={mood} aria-hidden="true">
        <div className="laptop-glow" />
        <div className="coffee-scene">
          <div className="steam" />
          <div className="steam" />
          <div className="steam" />
          <div className="cup" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mb-10 text-center">
          <Image
            src="/kaamkidhun-logo.svg"
            alt="KaamKiDhun"
            width={660}
            height={140}
            loading="eager"
            className="mx-auto h-auto w-full max-w-[360px]"
          />
          <p className="mt-6 text-black/75">☕ First coffee. Then productivity. Maybe.</p>
        </div>

        <div className="rounded-3xl border border-black/15 bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-8 text-sm text-black/70">
            {mood === "Deep Focus"
              ? "🧠"
              : mood === "Chill & Relax"
                ? "☕"
                : mood === "Coding Mode"
                  ? "💻"
                  : "🌙"}{" "}
            {mood}
          </div>

          <p
            key={quoteIndex}
            className="mood-quote mb-6 text-center text-base font-medium text-black"
          >
            {quotes[quoteIndex]}
          </p>

          <div className="overflow-hidden rounded-xl border border-black/10 bg-[#0f0f13]">
            <iframe
              title={`${playlist.label} Spotify playlist`}
              src={embedUrl}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="block w-full border-0"
            />
          </div>

          <div className="mt-5 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-black/70">
              Sign in to Spotify if prompted, then press Play in the playlist.
            </p>
            <a
              href={playlistUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-black underline-offset-4 transition hover:underline"
            >
              Open playlist in Spotify
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-black/75 transition hover:text-black">
            ← Back to KaamKiDhun
          </Link>
        </div>
      </div>
    </main>
  );
}

function PlayerRoute() {
  const searchParams = useSearchParams();
  const mood = searchParams.get("mood") ?? "Deep Focus";

  return <PlayerContent key={mood} mood={mood} />;
}

export default function PlayerPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#d8e5e9] px-6 py-10 text-black">
          <div className="text-lg">Loading player...</div>
        </main>
      }
    >
      <PlayerRoute />
    </Suspense>
  );
}


