"use client";

import { useState } from "react";

import { IconChevronRight, IconCopy, IconCopyCheck } from "@pelatform/icons";
import { AlertToast } from "@pelatform/ui/components";
import { useCopyToClipboard } from "@pelatform/ui/hooks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@pelatform/ui/radix";

type Tool = "NPM" | "PNPM" | "Bun" | "Yarn";

export function InstallIcon() {
  const [isCopied, setIsCopied] = useState(false);
  const [command, setCommand] = useState("");

  const { copy } = useCopyToClipboard({
    onCopy: () =>
      AlertToast({ message: "Installer copied to clipboard", icon: "success", variant: "invert" }),
  });

  const installMap: Record<Tool, string> = {
    NPM: "npm i",
    PNPM: "pnpm add",
    Bun: "bun add",
    Yarn: "yarn add",
  };

  const handleCopy = (tool: Tool) => {
    const newCommand = `${installMap[tool]} @pelatform/icons`;
    copy(newCommand);
    setCommand(newCommand);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex h-10 w-full items-center justify-between rounded-lg border p-1 ps-2 font-mono text-sm">
      <div className="flex items-center">
        <IconChevronRight className="-ms-1.5 size-5 text-muted-foreground" />
        {command || "npm i @pelatform/icons"}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="size-7 rounded-sm"
            aria-label="Copy npm command"
          >
            {isCopied ? <IconCopyCheck className="text-primary" /> : <IconCopy />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleCopy("NPM")}>NPM</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCopy("PNPM")}>PNPM</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCopy("Bun")}>Bun</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCopy("Yarn")}>Yarn</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
