"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type LoginScreenProps = {
  onLogin: () => void;
};

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateTime = () => setNow(new Date());

    updateTime();

    const intervalId = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleLogin = () => {
    if (isExiting) return;

    setIsExiting(true);
  };

  const handleExitComplete = () => {
    if (isExiting) {
      onLogin();
    }
  };

  const exitDuration = shouldReduceMotion ? 0 : 0.5;

  return (
    <motion.section
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#03060D] px-6 py-10"
      initial={false}
      animate={
        isExiting
          ? {
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 1.025,
            }
          : {
              opacity: 1,
              scale: 1,
            }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onAnimationComplete={handleExitComplete}
    >
      {/* Ambient background */}
      <motion.div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_45%,rgba(8,145,178,0.16),transparent_60%)]
        "
        animate={{
          opacity: isExiting ? 0 : 1,
        }}
        transition={{ duration: exitDuration }}
      />

      {/* Main login content */}
      <motion.div
        className="
          relative grid w-full max-w-4xl
          items-center gap-12 md:grid-cols-2
        "
        initial={
          shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
        }
        animate={
          isExiting
            ? {
                opacity: 0,
                y: shouldReduceMotion ? 0 : -12,
              }
            : { opacity: 1, y: 0 }
        }
        transition={{
          duration: shouldReduceMotion ? 0 : isExiting ? 0.3 : 0.6,
          delay: isExiting ? 0 : shouldReduceMotion ? 0 : 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Welcome section */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <motion.div
              className="
                flex h-12 w-12 items-center
                justify-center rounded-xl
                border border-cyan-300/30
                bg-cyan-300/[0.06]
                text-lg font-bold text-cyan-200
                shadow-[0_0_30px_rgba(34,211,238,0.12)]
              "
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : 0.2,
              }}
            >
              C
            </motion.div>

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
            <motion.span
              className="
                h-2 w-2 rounded-full bg-emerald-400
                shadow-[0_0_10px_rgba(52,211,153,0.6)]
              "
              animate={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: [1, 0.45, 1],
                      scale: [1, 1.15, 1],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/70">
              Core systems initialized
            </span>
          </div>
        </div>

        {/* User profile card */}
        <motion.div
          className="
            rounded-2xl border border-cyan-300/20
            bg-[#080D18]/85 p-7
            shadow-[0_0_60px_rgba(0,0,0,0.3)]
            backdrop-blur-xl
          "
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            y: isExiting ? (shouldReduceMotion ? 0 : -8) : 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : isExiting ? 0.25 : 0.5,
            delay: isExiting ? 0 : shouldReduceMotion ? 0 : 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
            Select session
          </p>

          <motion.div
            className="
              mt-7 flex items-center gap-4 rounded-xl
              border border-cyan-300/20
              bg-cyan-300/[0.04] p-4
            "
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    borderColor: "rgba(103,232,249,0.4)",
                    backgroundColor: "rgba(34,211,238,0.07)",
                  }
            }
          >
            <div
              className="
                flex h-14 w-14 shrink-0 items-center
                justify-center rounded-xl
                border border-cyan-300/30
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

            <motion.span
              className="ml-auto h-2 w-2 shrink-0 rounded-full bg-cyan-300"
              animate={
                shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0.5, 1] }
              }
              transition={{
                duration: 2,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
              aria-label="Selected profile"
            />
          </motion.div>

          <motion.button
            type="button"
            disabled={isExiting}
            onClick={handleLogin}
            whileHover={
              shouldReduceMotion || isExiting ? undefined : { scale: 1.02 }
            }
            whileTap={
              shouldReduceMotion || isExiting ? undefined : { scale: 0.98 }
            }
            className="
              mt-6 flex w-full items-center
              justify-center gap-3 rounded-xl
              border border-cyan-300/30
              bg-cyan-300/10 px-4 py-3
              text-sm font-medium text-cyan-100
              hover:border-cyan-200/60
              hover:bg-cyan-300/15
              hover:shadow-[0_0_25px_rgba(34,211,238,0.10)]
              disabled:cursor-wait
              disabled:opacity-70
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/50
            "
          >
            {isExiting ? "Entering System..." : "Initialize Session"}

            {!isExiting && (
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? { x: 0 } : { x: [0, 3, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            )}

            {isExiting && (
              <motion.span
                className="
                  h-3.5 w-3.5 rounded-full
                  border border-cyan-100/30
                  border-t-cyan-100
                "
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                aria-hidden="true"
              />
            )}
          </motion.button>

          <p className="mt-5 text-center text-[10px] leading-5 text-slate-600">
            Prototype access screen. No password or credentials are checked yet.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LoginScreen;
