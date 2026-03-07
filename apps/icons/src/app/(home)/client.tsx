"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseColor } from "@react-stately/color";
import { useDebouncedCallback } from "use-debounce";

import * as icons from "@pelatform/icons";
import { IconPalette } from "@pelatform/icons";
import {
  Button,
  Input,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Slider,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@pelatform/ui/radix";
import { filteredIcons, getCategoryOptions, getHeading, getPlaceholder } from "@/lib/utils";

const ITEMS_PER_PAGE = 150;

export function ClientPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // all state
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // icon state
  const [currentStyle, setCurrentStyle] = useState<string>("all");
  const [currentSize, setCurrentSize] = useState(24);
  const [currentStroke, setCurrentStroke] = useState(2);
  const [currentColor, setCurrentColor] = useState(parseColor("#a6a09b"));

  const query = searchParams.get("query")?.toString() || "";
  const category = searchParams.get("category") || "all";

  const heading = getHeading(currentStyle);
  const placeholder = getPlaceholder(currentStyle);
  const allIcons = filteredIcons(currentStyle);

  const totalIcons = allIcons.length;
  const totalPages = Math.ceil(totalIcons / ITEMS_PER_PAGE);
  const _paginatedIcons = allIcons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleReset = () => {
    setCurrentStyle("all");
    setCurrentSize(24);
    setCurrentStroke(2);
    setCurrentColor(parseColor("#a6a09b"));

    params.delete("query");
    params.delete("category");
    router.replace(pathname);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Keep existing category if present
    const existingCategory = searchParams.get("category");
    if (existingCategory && existingCategory !== "all") {
      params.set("category", existingCategory);
    }

    router.push(`${pathname}?${params.toString()}`);
    setCurrentPage(1);
  }, 300);

  const handleCategory = useDebouncedCallback((selected: string) => {
    const params = new URLSearchParams(searchParams);
    if (selected && selected !== "all") {
      params.set("category", selected);
    } else {
      params.delete("category");
    }

    // Keep existing query if present
    const existingQuery = searchParams.get("query");
    if (existingQuery) {
      params.set("query", existingQuery);
    }

    router.push(`${pathname}?${params.toString()}`);
    setCurrentPage(1);
  }, 300);

  const styles = [
    { id: "all", label: "All" },
    { id: "outline", label: "Outline" },
    { id: "filled", label: "Filled" },
  ];

  return (
    <>
      <div className="relative mb-6 flex items-center gap-2 md:mb-8 md:gap-4">
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={query}
          aria-label="Search icons"
          placeholder={placeholder}
          className="w-full *:md:h-12 **:[input]:pl-4! **:[svg]:md:top-3.5! **:[svg]:md:size-5!"
        />
        <Button
          size="icon"
          variant="outline"
          className="size-10 md:size-12"
          onClick={() => setIsOpen(true)}
        >
          <IconPalette className="size-5! md:size-6!" />
        </Button>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="gap-6">
              Customize icons
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" onClick={handleReset}>
                    <icons.IconReload />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Reset settings to default.</TooltipContent>
              </Tooltip>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-5 px-6 py-4">
            <div>
              <h3 className="mb-2 font-medium text-sm">Style:</h3>
              <ToggleGroup
                spacing={4}
                type="single"
                value={currentStyle}
                onValueChange={(v) => {
                  if (v) setCurrentStyle(v);
                }}
              >
                {styles.map(({ id, label }) => (
                  <ToggleGroupItem
                    key={id}
                    value={id}
                    className={
                      currentStyle === id ? "border-brand-700! bg-brand-700! text-white!" : ""
                    }
                  >
                    {label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-sm">Size:</h3>
              <Slider
                step={4}
                value={[currentSize]}
                min={20}
                max={48}
                onValueChange={(v) => setCurrentSize(v[0])}
                className="mb-1"
              />
              <span className="text-muted-foreground text-xs">{currentSize} px</span>
            </div>
            {currentStyle !== "filled" && (
              <div>
                <h3 className="mb-2 font-medium text-sm">Stroke:</h3>
                <Slider
                  step={0.25}
                  value={[currentStroke]}
                  min={1}
                  max={2}
                  onValueChange={(v) => setCurrentStroke(v[0])}
                  className="mb-1"
                />
                <span className="text-muted-foreground text-xs">{currentStroke} px</span>
              </div>
            )}
            <div>
              <h3 className="mb-2 font-medium text-sm">Color:</h3>
              <Input
                type="color"
                value={currentColor.toString("hex")}
                onChange={(e) => setCurrentColor(parseColor(e.target.value))}
                className="h-10 w-full"
              />
            </div>
            <div>
              <h3 className="mb-2 font-medium text-sm">Category:</h3>
              <Select value={category} onValueChange={(key) => handleCategory(key || "all")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {getCategoryOptions().map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-sm">Install:</h3>
              {/* <InstallIcon /> */}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <h2 className="mb-5 font-semibold text-2xl tracking-tight">{heading}</h2>
      {totalIcons === 0 ? (
        <div className="mt-6 text-center text-muted-foreground">
          <h3 className="font-semibold text-lg">No results found</h3>
          <p className="text-sm">Try searching with different keywords or categories.</p>
        </div>
      ) : (
        <>
          {/* <ListBox
            selectionMode="single"
            aria-label="List Icon"
            layout="grid"
            className="flex flex-wrap justify-around gap-2 md:gap-4"
          >
            {paginatedIcons.map(([name, Icon]) => (
              <IconListItem
                key={name}
                name={name}
                Icon={Icon as any}
                iconStyle={currentStyle}
                iconSize={currentSize}
                iconStroke={currentStroke}
                iconColor={String(currentColor)}
              />
            ))}
          </ListBox> */}
          {totalIcons > ITEMS_PER_PAGE && (
            <Pagination className="mt-8 lg:mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    aria-label="First page"
                    isActive={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    aria-disabled={currentPage <= 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="flex h-9 items-center px-4 font-medium text-sm">
                    {currentPage} / {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    aria-disabled={currentPage >= totalPages}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    aria-label="Last page"
                    isActive={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </>
  );
}
