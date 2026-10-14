type SystemActionScreenProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

const SystemActionScreen = ({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}: SystemActionScreenProps) => {
  return (
    <section className="flex h-full w-full items-center justify-center bg-[#03060D] px-6 text-center">
      <div className="max-w-md">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/60">
          {eyebrow}
        </p>

        <h1 className="mt-5 text-3xl font-light text-cyan-50">{title}</h1>

        <p className="mt-4 text-sm leading-6 text-slate-400">{description}</p>

        <button
          type="button"
          onClick={onAction}
          className="mt-8 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm text-cyan-100 transition hover:bg-cyan-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50"
        >
          {actionLabel}
        </button>
      </div>
    </section>
  );
};

export default SystemActionScreen;
