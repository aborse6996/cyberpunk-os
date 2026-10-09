export type WindowState = "normal" | "minimized" | "maximized";

export type WindowPosition = {
  x: number;
  y: number;
};

export type WindowSize = {
  width: number;
  height: number;
};

export type WindowGeometry = {
  position: WindowPosition;
  size: WindowSize;
};

export type WindowDefinition = {
  windowId: string;
  appId: string;

  title: string;

  geometry: WindowGeometry;
  previousGeometry: WindowGeometry | null;

  state: WindowState;
  zIndex: number;
};
