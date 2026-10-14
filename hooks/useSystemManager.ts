"use client";

import { useSyncExternalStore } from "react";

import { systemManager } from "@/core/system/systemManager";

export const useSystemManager = () => {
  const state = useSyncExternalStore(
    systemManager.subscirbe,
    systemManager.getSnapshot,
    systemManager.getServerSnapshot,
  );

  return {
    state,

    bootComplete: systemManager.bootComplete,
    loginSuccess: systemManager.loginSuccess,
    logout: systemManager.logout,

    lock: systemManager.lock,
    unlock: systemManager.unlock,

    sleep: systemManager.sleep,
    wake: systemManager.wake,

    restart: systemManager.restart,
    restartComplete: systemManager.restartComplete,

    shutdown: systemManager.shutdown,
    shutdownComplete: systemManager.shutdownComplete,
    powerOn: systemManager.powerOn,
  };
};
