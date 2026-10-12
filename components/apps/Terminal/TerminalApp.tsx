const TerminalApp = () => {
  return (
    <div className="min-h-full bg-[#05070D] p-5 font-mono text-sm text-slate-200">
      <p className="text-cyan-100">
        CYBERPUNK OS [Version 0.1.0]
      </p>

      <p className="mt-1 text-slate-500">
        System interface initialized.
      </p>

      <div className="mt-6 flex items-center gap-2">
        <span className="text-emerald-300">
          guest@nexus:~$
        </span>
        <span className="h-4 w-2 animate-pulse bg-cyan-300" />
      </div>
    </div>
  );
};

export default TerminalApp;