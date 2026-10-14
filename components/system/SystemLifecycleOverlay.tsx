"use client";

import { useSystemManager } from "@/hooks/useSystemManager";

import LockScreen from "./LockScreen";
import ShutdownScreen from "./ShutdownScreen";
import SystemTransitionScreen from "./SystemTransitionScreen";
import SystemActionScreen from "./SystemActionScreen";
import LoginScreen from "./LoginScreen";

const SystemLifecycleOverlay = () => {
  const {
    state,
    unlock,
    wake,
    bootComplete,
    loginSuccess,
    restartComplete,
    shutdownComplete,
    powerOn,
  } = useSystemManager();

  let screen: React.ReactNode;

  switch (state) {
    case "locked":
      screen = <LockScreen onUnlock={unlock} />;
      break;

    case "sleeping":
      screen = (
        <SystemActionScreen
          eyebrow="Power Management"
          title="Sleep Mode"
          description="CyberpunkOS is sleeping. Wake the system to return to the secure lock screen."
          actionLabel="Wake System"
          onAction={wake}
        />
      );
      break;

    case "shutting-down":
      screen = <ShutdownScreen onComplete={shutdownComplete} />;
      break;

    case "off":
      screen = (
        <SystemActionScreen
          eyebrow="Power Status"
          title="System Offline"
          description="CyberpunkOS is powered off. Power on to begin a new startup sequence."
          actionLabel="Power On"
          onAction={powerOn}
        />
      );
      break;

    case "restarting":
      screen = (
        <SystemTransitionScreen
          title="Restarting System"
          message="Reinitializing system services..."
          onComplete={restartComplete}
        />
      );
      break;

    case "booting":
      screen = (
        <SystemTransitionScreen
          title="System Booting"
          message="Initializing CyberpunkOS..."
          onComplete={bootComplete}
        />
      );
      break;

    case "login":
      screen = (
        <LoginScreen onLogin={loginSuccess} />
      );
      break;

    default:
      return null;
  }

  return (
    <div className="pointer-events-auto absolute inset-0 z-100">{screen}</div>
  );
};

export default SystemLifecycleOverlay;
