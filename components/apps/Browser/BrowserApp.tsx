const BrowserApp = () => {
  return (
    <div className="min-h-full bg-[#080D18] p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/60">
        Netrunner Network
      </p>

      <h3 className="mt-4 text-xl font-semibold text-cyan-50">
        Welcome to the Grid
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        Browser interface initialized.
      </p>

      <div className="mt-6 rounded-lg border border-cyan-400/20 bg-black/30 p-4">
        <p className="font-mono text-sm text-cyan-200">
          net://cyberpunk.local
        </p>
      </div>
    </div>
  );
};

export default BrowserApp;