"use client";

import { useState } from "react";
import DesktopIcons from "./icons/DesktopIcons";
import WindowLayer from "../window/WindowLayer";

const DesktopWorkspace = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  return (
    <section
      onClick={() => {
        setSelectedIcon(null);
      }}
      className="absolute inset-0 z-10"
    >
      <DesktopIcons
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
      />

      <WindowLayer />
    </section>
  );
};

export default DesktopWorkspace;
