"use client";

import * as React from "react";
import { useState } from "react";
import * as ReactDOMServer from "react-dom/server";

import { IconDownload } from "@pelatform/icons";
import { AlertToast } from "@pelatform/ui/components";
import { useCopyToClipboard } from "@pelatform/ui/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@pelatform/ui/radix";
import { cn } from "@pelatform/utils";

export function IconListItem({
  name,
  Icon,
  iconStyle,
  iconSize,
  iconStroke,
  iconColor,
}: {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconStyle: string;
  iconSize: number;
  iconStroke: number;
  iconColor: string;
}) {
  const [isSelected, setSelected] = useState(false);

  const { copy: CopyName } = useCopyToClipboard({
    onCopy: () =>
      AlertToast({ message: "Name copied to clipboard", icon: "success", variant: "invert" }),
  });

  const { copy: CopyJsx } = useCopyToClipboard({
    onCopy: () =>
      AlertToast({ message: "Jsx copied to clipboard", icon: "success", variant: "invert" }),
  });

  const { copy: CopySvg } = useCopyToClipboard({
    onCopy: () =>
      AlertToast({ message: "SVG copied to clipboard", icon: "success", variant: "invert" }),
  });

  return (
    <div
      className={cn(
        "grid size-14 cursor-pointer place-content-center rounded-lg border text-foreground/80",
        "data-hovered:bg-secondary data-hovered:text-secondary-foreground",
        isSelected ? "bg-primary **:[svg]:text-white!" : "",
      )}
    >
      <DropdownMenu open={isSelected} onOpenChange={setSelected}>
        <Tooltip key={name}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <div
                onClick={() => setSelected(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(true);
                  }
                }}
              >
                <Icon
                  style={{
                    color: iconColor,
                    width: iconSize,
                    height: iconSize,
                    ...(iconStyle !== "filled" && { strokeWidth: iconStroke }),
                  }}
                />
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">{name}</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="start" className="sm:min-w-48">
          <DropdownMenuLabel className="font-mono font-normal text-xs sm:text-xs">
            {name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => CopyName(name)}>Copy Name</DropdownMenuItem>
          <DropdownMenuItem onClick={() => CopyJsx(`<${name} />`)}>Copy JSX</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => CopySvg(ReactDOMServer.renderToStaticMarkup(React.createElement(Icon)))}
          >
            Copy SVG
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => downloadSvg(Icon, name)}>
            Download SVG
            <IconDownload className="ms-auto size-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => downloadPng(Icon, name, iconStyle, iconSize, iconStroke, iconColor)}
          >
            Download PNG
            <IconDownload className="ms-auto size-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => downloadPng(Icon, name, iconStyle, 256, iconStroke, iconColor)}
          >
            Download PNG 256
            <IconDownload className="ms-auto size-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => downloadPng(Icon, name, iconStyle, 512, iconStroke, iconColor)}
          >
            Download PNG 512
            <IconDownload className="ms-auto size-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const downloadSvg = (IconComponent: React.ComponentType, fileName: string) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(React.createElement(IconComponent));
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.svg`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

const downloadPng = (
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  fileName: string,
  iconStyle: string,
  size: number,
  stroke: number,
  color: string,
) => {
  const svgElement = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      style: iconStyle === "filled" ? { fill: color } : { stroke: color, strokeWidth: stroke },
    }),
  );

  const blob = new Blob([svgElement], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  img.onload = () => {
    canvas.width = size;
    canvas.height = size;
    ctx?.clearRect(0, 0, size, size);
    ctx?.drawImage(img, 0, 0, size, size);

    const pngUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${fileName}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  img.onerror = (error) => {
    console.error("Error loading SVG for PNG conversion:", error);
  };
};
