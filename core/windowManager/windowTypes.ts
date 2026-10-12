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

  position: WindowPosition;
  size: WindowSize;

  previousGeometry: WindowGeometry | null;

  state: WindowState;
  zIndex: number;
};

export type CreateWindowOptions = {
  windowId: string;
  appId: string;
  title: string;
  position?: WindowPosition;
  size?: WindowSize;
};