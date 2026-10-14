"use client";

import { useEffect } from "react";

type ShutdownScreenProps = {
  onComplete: () => void;
};

const ShutdownScreen = ({ onComplete }: ShutdownScreenProps) => {
  useEffect(() => {
    const timeoutId = window.setTimeout(onComplete, 1600);

    return () => window.clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <section
      role="status"
      aria-live="polite"
      className="flex h-full w-full items-center justify-center bg-[#020408] text-center"
    >
      <div>
        <div className="mx-auto mb-6 h-12 w-12 animate-pulse rounded-full border border-rose-400/40 bg-rose-400/10 shadow-[0_0_35px_rgba(251,113,133,0.15)]" />

        <p className="text-xs uppercase tracking-[0.3em] text-rose-300/60">
          System Power
        </p>

        <h1 className="mt-4 text-2xl font-light tracking-wide text-slate-100">
          Shutting down
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Terminating the CyberpunkOS session...
        </p>
      </div>
    </section>
  );
};

export default ShutdownScreen;
