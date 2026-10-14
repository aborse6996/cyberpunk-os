"use client";

import { useEffect } from "react";

type SystemTransitionScreenProps = {
  title: string;
  message: string;
  onComplete: () => void;
  duration?: number;
};

const SystemTransitionScreen = ({
  title,
  message,
  onComplete,
  duration = 1400,
}: SystemTransitionScreenProps) => {
  useEffect(() => {
    const timeoutId = window.setTimeout(onComplete, duration);

    return () => window.clearTimeout(timeoutId);
  }, [onComplete, duration]);

  return (
    <section
      role="status"
      aria-live="polite"
      className="flex h-full w-full items-center justify-center bg-[#03060D] text-center"
    >
      <div>
        <div className="relative mx-auto mb-7 flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border border-cyan-300/20 border-t-cyan-300" />

          <span className="text-xl font-bold text-cyan-200">C</span>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/60">
          CyberpunkOS
        </p>

        <h1 className="mt-4 text-2xl font-light tracking-wide text-cyan-50">
          {title}
        </h1>

        <p className="mt-3 text-sm text-slate-500">{message}</p>

        <div className="mx-auto mt-7 h-1 w-44 overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-cyan-300/70" />
        </div>
      </div>
    </section>
  );
};

export default SystemTransitionScreen;
