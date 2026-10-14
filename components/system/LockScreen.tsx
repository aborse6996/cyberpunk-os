"use client";

import { useEffect, useState } from "react";

type LockScreenProps = {
  onUnlock: () => void;
};

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="flex h-full w-full items-center justify-center bg-[#03060D] text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,145,178,0.16),transparent_60%)]" />
      <div className="relative w-full max-w-lg px-6">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/6 text-2xl font-bold text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.12)]">
          C
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/60">
          CyberpunkOS · Secure Session
        </p>

        <h1 className="mt-5 text-6xl font-light tracking-tight text-cyan-50">
          {now
            ? now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "--:--"}
        </h1>

        <p className="mt-3 text-sm text-slate-400">
          {now
            ? now.toLocaleDateString([], {
                weekday: "long",
                day: "numeric",
                month: "long",
              })
            : "Session secured"}
        </p>

        <div className="mx-auto mt-9 h-px w-24 bg-cyan-300/30" />

        <p className="mt-7 text-sm text-slate-400">Your session is locked.</p>

        <button
          type="button"
          onClick={onUnlock}
          className="mt-6 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50"
        >
          Unlock Session
          <span aria-hidden="true" className="ml-3">
            →
          </span>
        </button>
      </div>
    </section>
  );
};

export default LockScreen;
