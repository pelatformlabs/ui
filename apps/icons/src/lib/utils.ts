"use client";

import { categories as categoriesImport } from "@pelatform/icons/categories";
import iconsByCategoryModule from "@pelatform/icons/icons-by-category";
import type { IconCategory } from "@pelatform/icons/types";

export type CategoryOption = { id: "all" | IconCategory; title: string };
export type IconStyle = "all" | "outline" | "filled";

const baseCategories = Array.isArray(categoriesImport)
  ? (categoriesImport as CategoryOption[])
  : [];
const hasAllCategory = baseCategories.some((cat) => cat.id === "all");

export const categories: CategoryOption[] = hasAllCategory
  ? baseCategories
  : [{ id: "all", title: "All" }, ...baseCategories];

const iconsByCategory = (iconsByCategoryModule as Record<string, string[]> | undefined) ?? {};

// Cache for computed results to avoid repeated calculations
const categoryCache = new Map<string, string[]>();
const componentNameCache = new Map<string, string>();

export function normalizeCategory(category: string): "all" | IconCategory {
  const found = categories.find((item) => item.id === category);
  return (found?.id ?? "all") as "all" | IconCategory;
}

export const getCategoryOptions = () => categories;

export function getCategoryTitle(category: "all" | IconCategory) {
  return categories.find((item) => item.id === category)?.title ?? "All";
}

export function getIconsByCategory(
  category: "all" | IconCategory,
  style: IconStyle = "all",
): string[] {
  // Create cache key
  const cacheKey = `${category}-${style}`;

  // Return cached result if available
  if (categoryCache.has(cacheKey)) {
    return categoryCache.get(cacheKey)!;
  }

  const baseIcons =
    category === "all" ? Object.values(iconsByCategory).flat() : iconsByCategory[category] || [];

  let result: string[];

  if (style === "all") {
    const filledIcons = baseIcons.map((icon) => `${icon}-filled`);
    result = [...baseIcons, ...filledIcons];
  } else if (style === "filled") {
    result = baseIcons.map((icon) => `${icon}-filled`);
  } else {
    result = baseIcons;
  }

  // Cache the result
  categoryCache.set(cacheKey, result);

  return result;
}

export function iconNameToComponentName(iconName: string): string {
  // Return cached result if available
  if (componentNameCache.has(iconName)) {
    return componentNameCache.get(iconName)!;
  }

  const componentName =
    "Icon" +
    iconName
      .split("-")
      .map((word) => {
        if (word.length === 0) return "";
        if (/^\d+$/.test(word)) return word;
        if (word.length === 1) return word.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");

  // Cache the result
  componentNameCache.set(iconName, componentName);

  return componentName;
}
