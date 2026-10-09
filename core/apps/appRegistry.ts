import type { AppDefinition } from "./appTypes";

const applications: AppDefinition[] = [
  {
    id: "terminal",
    name: "Terminal",
    description: "Command-line interface for CyberpunkOS.",
    icon: "⌘",
    category: "development",
  },

  {
    id: "file-manager",
    name: "Files",
    description: "Browse and manage the virtual filesystem.",
    icon: "▣",
    category: "utility",
  },

  {
    id: "browser",
    name: "Browser",
    description: "Access the Cyberpunk network.",
    icon: "◉",
    category: "utility",
  },
];

export const appRegistry = {
  getAll(): AppDefinition[] {
    return applications;
  },

  getById(id: string): AppDefinition | undefined {
    return applications.find((app) => app.id === id);
  },

  has(id: string): boolean {
    return applications.some((app) => app.id === id);
  },
};
