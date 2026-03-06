"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { IconDeviceDesktop, IconMoonStars, IconSun } from "@pelatform/icons";
import { Button } from "@pelatform/ui/radix";
import { THEME_MODES, type ThemeMode } from "@pelatform/utils";

const cycleOrder: ThemeMode[] = [THEME_MODES.SYSTEM, THEME_MODES.LIGHT, THEME_MODES.DARK];

export function ModeSwitcher() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    const currentIndex = cycleOrder.indexOf(theme as ThemeMode);
    const nextIndex = (currentIndex + 1) % cycleOrder.length;
    const nextTheme = cycleOrder[nextIndex];

    setTheme(nextTheme);
  }, [theme, setTheme]);

  const getCurrentIcon = () => {
    if (theme === THEME_MODES.SYSTEM) {
      return <IconDeviceDesktop />;
    }

    if (theme === THEME_MODES.DARK) {
      return <IconMoonStars />;
    }

    return <IconSun />;
  };

  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme} aria-label="Switch theme">
      {getCurrentIcon()}
    </Button>
  );
}
