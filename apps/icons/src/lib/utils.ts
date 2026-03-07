"use client";

import { useSearchParams } from "next/navigation";

import * as icons from "@pelatform/icons";

export const useQueryParams = () => {
  const params = useSearchParams();

  return {
    query: params.get("query")?.toString() || "",
    category: params.get("category") || "all",
  };
};

export const getCategory = (category: string) => {
  return "all";
};

export const getCategoryOptions = () => {
  return [{ id: "all", title: "All" }];
};

export const filteredIcons = (iconStyle: string) => {
  const { query = "" } = useQueryParams();
  const queryLower = query?.toLowerCase() || "";
  const categoryIcons = null;

  return Object.entries(icons).filter(([name]) => {
    const nameLower = name.toLowerCase();
    const matchesSearch = nameLower.includes(queryLower);
    // biome-ignore lint/suspicious/noExplicitAny: <>
    const matchesCategory = !categoryIcons || (categoryIcons as any).has(name);
    const matchesStyle =
      iconStyle === "all"
        ? true
        : iconStyle === "outline"
          ? !nameLower.includes("filled")
          : nameLower.includes("filled");

    return matchesSearch && matchesCategory && matchesStyle;
  });
};

export const getHeading = (iconStyle: string) => {
  const { query, category } = useQueryParams();

  let heading = "All icons";
  if (iconStyle === "outline") {
    heading = "Outline icons";
  } else if (iconStyle === "filled") {
    heading = "Filled icons";
  } else if (query.trim() !== "") {
    heading = `Search results for "${query}"`;
  }

  const matchedCategory = getCategory(category);
  if (matchedCategory !== "all") {
    heading += ` in category ${matchedCategory.charAt(0).toUpperCase() + matchedCategory.slice(1)}`;
  }

  return heading;
};

export const getPlaceholder = (iconStyle: string) => {
  const icons = filteredIcons(iconStyle);
  const totalIcons = icons.length;

  let placeholder = `Search ${totalIcons}`;
  if (iconStyle === "outline") {
    placeholder += " outline icons";
  } else if (iconStyle === "filled") {
    placeholder += " filled icons";
  } else {
    placeholder += " icons";
  }

  return placeholder;
};
