"use client";

import { useEffect, useState } from "react";

const SystemTray = () => {
  const [time, setTime] = useState("--:--");
  const [date, setDate] = useState("");
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      setDate(
        now.toLocaleDateString([], {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      );
    };

    updateClock();

    const intervalId = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(intervalId);
  }, []);
  return (
    <aside className="flex shrink-0 items-center gap-4">
      <div
        className="hidden items-center gap-2 sm:flex"
        title="CyberpunkOS interface status indicator"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />

        <span className="text-[10px] uppercase tracking-wider text-slate-400">
          Online
        </span>
      </div>

      <div className="flex min-w-20 flex-col items-end" title={date}>
        <time className="text-sm font-medium tabular-nums text-cyan-50">
          {time}
        </time>

        <span className="text-[10px] text-slate-500">{date}</span>
      </div>
    </aside>
  );
};

export default SystemTray;
