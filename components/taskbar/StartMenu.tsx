"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { appRegistry } from "@/core/apps/appRegistry";

type StartMenuProps = {
  onLaunchApp: (appId: string) => void;
};

const StartMenu = ({ onLaunchApp }: StartMenuProps) => {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const applications = appRegistry.getAll();

  const filteredApps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return applications;
    }

    return applications.filter((app) => {
      const searchableText = [app.name, app.description, app.category]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [applications, query]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <section
      id="cyberpunk-start-menu"
      role="dialog"
      aria-label="CyberpunkOS application launcher"
      className="
        absolute bottom-full left-0 z-50 mb-3
        flex w-96 max-w-[calc(100vw-2rem)]
        flex-col overflow-hidden rounded-2xl
        border border-cyan-300/20
        bg-[#070B14]/95
        shadow-[0_0_50px_rgba(0,0,0,0.5)]
        backdrop-blur-2xl
      "
    >
      {/* Header */}
      <div className="border-b border-white/[0.07] p-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/60">
          CyberpunkOS
        </p>

        <h2 className="mt-1 text-lg font-semibold text-cyan-50">
          Application Launcher
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Select an application to launch.
        </p>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-cyan-300/15 bg-black/30 px-3">
          <span className="text-cyan-300/60" aria-hidden="true">
            ⌕
          </span>

          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search applications..."
            aria-label="Search applications"
            className="
              h-10 min-w-0 flex-1 bg-transparent
              text-sm text-cyan-50 outline-none
              placeholder:text-slate-600
            "
          />

          <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">
            APP
          </kbd>
        </div>
      </div>

      {/* Application list */}
      <div className="max-h-[45vh] overflow-y-auto p-3">
        <div className="mb-2 flex items-center justify-between px-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Applications
          </span>

          <span className="text-[10px] text-slate-600">
            {filteredApps.length} available
          </span>
        </div>

        {filteredApps.length > 0 ? (
          <div className="space-y-1">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => onLaunchApp(app.id)}
                className="
                  flex w-full items-center gap-3
                  rounded-xl border border-transparent
                  p-3 text-left
                  transition-colors duration-150
                  hover:border-cyan-300/15
                  hover:bg-cyan-300/[0.07]
                  focus-visible:outline-none
                  focus-visible:ring-1
                  focus-visible:ring-cyan-300/50
                "
              >
                <span
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl border border-cyan-300/15
                    bg-cyan-300/6
                    text-xl text-cyan-100
                  "
                >
                  {app.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-slate-100">
                    {app.name}
                  </span>

                  <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                    {app.description}
                  </span>
                </span>

                <span
                  className="
                    text-xs text-cyan-300/50
                    transition-transform
                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                >
                  ↗
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="px-3 py-8 text-center">
            <p className="text-sm text-slate-300">No applications found</p>

            <p className="mt-1 text-xs text-slate-500">
              Try another search term.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
        <span className="text-[10px] uppercase tracking-wider text-slate-600">
          System Launcher
        </span>

        <span className="text-[10px] text-cyan-300/50">CYBERPUNK OS / 0.1</span>
      </div>
    </section>
  );
};

export default StartMenu;
