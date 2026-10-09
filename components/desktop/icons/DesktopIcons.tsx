"use client";

import { useEffect, useState } from "react";

import DesktopIcon from "./DesktopIcon";
import DesktopIconContextMenu from "./DesktopIconContextMenu";

import { appRegistry } from "@/core/apps/appRegistry";

import { desktopIcons } from "./desktopIconData";

import type { ContextMenuState, DesktopIconsProps, Position } from "./types";

import { useDesktopIconDrag } from "./hooks/useDesktopIconDrag";

const initialPositions: Record<string, Position> = Object.fromEntries(
  desktopIcons.map((icon) => [icon.id, icon.position]),
);

const DesktopIcons = ({ selectedIcon, setSelectedIcon }: DesktopIconsProps) => {
  const [positions, setPositions] =
    useState<Record<string, Position>>(initialPositions);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);

  const {
    workspaceRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useDesktopIconDrag({
    positions,
    setPositions,
    setSelectedIcon,
  });

  const handleOpen = (appId: string) => {
    console.log(`Launching application: ${appId}`);
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    iconId: string,
  ) => {
    event.preventDefault();

    setSelectedIcon(iconId);

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      iconId,
    });
  };

  useEffect(() => {
    const closeContextMenu = () => {
      setContextMenu(null);
    };

    window.addEventListener("click", closeContextMenu);

    return () => {
      window.removeEventListener("click", closeContextMenu);
    };
  }, []);

  return (
    <>
      <div ref={workspaceRef} className="absolute inset-0">
        {desktopIcons.map((item) => {
          const position = positions[item.id];
          const app = appRegistry.getById(item.appId);

          if(!app) {
            return null
          }

          return (
            <DesktopIcon
              key={item.id}
              label={app.name}
              icon={app.icon}
              selected={selectedIcon === item.id}
              x={position.x}
              y={position.y}
              onSelect={() => {
                setSelectedIcon(item.id);
                setContextMenu(null);
              }}
              onOpen={() => handleOpen(item.appId)}
              onContextMenu={(event) => handleContextMenu(event, item.id)}
              onPointerDown={(event) => handlePointerDown(event, item.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            />
          );
        })}
      </div>

      {contextMenu && (
        <DesktopIconContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onOpen={() => {
            const icon = desktopIcons.find(
              (item) => item.id === contextMenu.iconId,
            );

            if (icon) {
              handleOpen(icon.appId);
            }

            setContextMenu(null);
          }}
        />
      )}
    </>
  );
};

export default DesktopIcons;
