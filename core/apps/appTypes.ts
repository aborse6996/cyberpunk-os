export type AppCategory =
  | "system"
  | "utility"
  | "productivity"
  | "entertaiment"
  | "development";

export type AppDefinition = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AppCategory;
};
