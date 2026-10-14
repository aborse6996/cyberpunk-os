"use client";

type LoginScreenProps = {
  onLogin: () => void;
};

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#03060D] px-6 py-10">
      {/* Ambient background */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_45%,rgba(8,145,178,0.16),transparent_60%)]
        "
      />

      <div className="relative flex w-full max-w-4xl items-center gap-12 ">
        {/* Welcome section */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div
              className="
                flex h-12 w-12 items-center
                justify-center rounded-xl
                border border-cyan-300/30
                bg-cyan-300/6
                text-lg font-bold text-cyan-200
                shadow-[0_0_30px_rgba(34,211,238,0.12)]
              "
            >
              C
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-50">
                CYBERPUNK OS
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-cyan-300/50">
                System Access Terminal
              </p>
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Welcome back, Operator
          </p>

          <h1 className="mt-4 text-4xl font-light leading-tight tracking-tight text-slate-100 sm:text-5xl">
            Your world.
            <span className="block text-cyan-300">Your system.</span>
          </h1>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            The network is ready. Initialize your session and return to the
            CyberpunkOS environment.
          </p>

          <div className="mt-8 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />

            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/70">
              Core systems initialized
            </span>
          </div>
        </div>

        {/* User profile card */}
        <div className="rounded-2xl border border-cyan-300/20 bg-[#080D18]/85 p-7 shadow-[0_0_60px_rgba(0,0,0,0.3) backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
            Select session
          </p>
          <div className="mt-7 flex items-center gap-4 rounded-xl border border-cyan-300/20 bg-cyan-300/4 p-4">
            <div
              className="
                flex h-14 w-14 shrink-0
                items-center justify-center
                rounded-xl border border-cyan-300/30
                bg-cyan-300/10
                text-xl font-semibold text-cyan-200
              "
            >
              C
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-medium text-cyan-50">Cyber</h2>

              <p className="mt-1 text-xs text-slate-500">
                Local operator · Guest session
              </p>
            </div>

            <span
              className="ml-auto h-2 w-2 shrink-0 rounded-full bg-cyan-300"
              aria-label="Selected profile"
            />
          </div>
          <button
            type="button"
            onClick={onLogin}
            className="
              mt-6 flex w-full items-center
              justify-center gap-3 rounded-xl
              border border-cyan-300/30
              bg-cyan-300/10 px-4 py-3
              text-sm font-medium text-cyan-100
              transition duration-200
              hover:border-cyan-200/60
              hover:bg-cyan-300/15
              hover:shadow-[0_0_25px_rgba(34,211,238,0.10)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/50
            "
          >
            Initialize Session
            <span aria-hidden="true">→</span>
          </button>

          <p className="mt-5 text-center text-[10px] leading-5 text-slate-600">
            Prototype access screen. No password or credentials are checked yet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
