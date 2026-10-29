type BrowserHomeProps = {
  onNavigate: (url: string) => void;
};

const BrowserHome = ({ onNavigate }: BrowserHomeProps) => {
  const quickLinks = [
    {
      name: "Example",
      description: "Test website",
      url: "https://example.com",
    },
    {
      name: "Wikipedia",
      description: "Knowledge base",
      url: "https://www.wikipedia.org/",
    },
    {
      name: "MDN",
      description: "Developer resources",
      url: "https://developer.mozilla.org/",
    },
  ];

  return (
    <div className="max-w-xl text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/5 text-3xl text-cyan-300">
        ◉
      </div>

      <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-400">
        CYBERPUNKOS NETWORK
      </p>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
        Explore the net.
      </h1>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
        Your gateway to the digital world. Search for information or enter a
        website address to get started.
      </p>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {quickLinks.map((site) => (
          <button
            key={site.name}
            type="button"
            onClick={() => onNavigate(site.url)}
            className="rounded-xl border border-white/10 bg-white/2.5 p-4 text-left transition hover:border-cyan-300/30 hover:bg-cyan-300/5"
          >
            <p className="text-sm font-medium text-slate-200">{site.name}</p>

            <p className="mt-1 text-xs text-slate-500">{site.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrowserHome;
