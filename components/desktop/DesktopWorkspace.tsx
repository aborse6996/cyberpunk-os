"use client";

import { useState } from "react";
import DesktopIcons from "./icons/DesktopIcons";
import WindowLayer from "../window/WindowLayer";
import { launchApp } from "@/core/apps/appLauncher";

const DesktopWorkspace = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  return (
    <section
      onClick={() => {
        setSelectedIcon(null);
      }}
      className="absolute inset-x-0 top-0 bottom-16 z-10"
    >
      <DesktopIcons
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        onLaunchApp={launchApp}
      />

      <WindowLayer />
    </section>
  );
};

export default DesktopWorkspace;
