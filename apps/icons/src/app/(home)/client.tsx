"use client";

import { useEffect, useMemo, useState } from "react";
import { parseColor } from "@react-stately/color";
import { parseAsString, useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

import { IconPalette, Icons } from "@pelatform/icons";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Label,
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
import { IconListItem } from "@/components/icon-list-item";
import { InstallIcon } from "@/components/install-icon";
import {
  getCategoryOptions,
  getCategoryTitle,
  getIconsByCategory,
  iconNameToComponentName,
  normalizeCategory,
} from "@/lib/utils";

const ITEMS_PER_PAGE = 150;

export function ClientPage() {
  // all state
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // icon state
  const [currentStyle, setCurrentStyle] = useState<string>("all");
  const [currentSize, setCurrentSize] = useState(24);
  const [currentStroke, setCurrentStroke] = useState(2);
  const [currentColor, setCurrentColor] = useState(parseColor("#a6a09b"));

  const [queryParam, setQueryParam] = useQueryState("query", parseAsString.withDefault(""));
  const [categoryParam, setCategoryParam] = useQueryState(
    "category",
    parseAsString.withDefault("all"),
  );

  const category = normalizeCategory(categoryParam);

  const [searchValue, setSearchValue] = useState(queryParam);
  useEffect(() => {
    setSearchValue(queryParam);
  }, [queryParam]);

  const iconEntries = useMemo(() => {
    return Object.entries(Icons).filter(
      ([name, Icon]) => name.startsWith("Icon") && typeof Icon === "function",
    ) as [string, React.ComponentType<React.SVGProps<SVGSVGElement>>][];
  }, []);

  const categoryIconNames = useMemo(() => {
    const iconNames = getIconsByCategory(category, currentStyle as "all" | "outline" | "filled");
    const componentNames = iconNames.map(iconNameToComponentName);
    return new Set(componentNames);
  }, [category, currentStyle]);

  const allIcons = useMemo(() => {
    const queryLower = searchValue.trim().toLowerCase();

    return iconEntries.filter(([name]) => {
      const nameLower = name.toLowerCase();
      const matchesQuery = queryLower ? nameLower.includes(queryLower) : true;
      const matchesCategory = categoryIconNames.has(name);

      return matchesQuery && matchesCategory;
    });
  }, [iconEntries, searchValue, categoryIconNames]);

  const heading = useMemo(() => {
    let title = "All icons";

    if (currentStyle === "outline") {
      title = "Outline icons";
    } else if (currentStyle === "filled") {
      title = "Filled icons";
    } else if (searchValue.trim() !== "") {
      title = `Search results for "${searchValue}"`;
    }

    if (category !== "all") {
      title += ` in category ${getCategoryTitle(category)}`;
    }

    return title;
  }, [currentStyle, searchValue, category]);

  const placeholder = useMemo(() => {
    const totalIcons = allIcons.length;
    let text = `Search ${totalIcons}`;

    if (currentStyle === "outline") {
      text += " outline icons";
    } else if (currentStyle === "filled") {
      text += " filled icons";
    } else {
      text += " icons";
    }

    return text;
  }, [allIcons.length, currentStyle]);

  const totalIcons = allIcons.length;
  const totalPages = Math.ceil(totalIcons / ITEMS_PER_PAGE);
  const paginatedIcons = allIcons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleReset = () => {
    setCurrentStyle("all");
    setCurrentSize(24);
    setCurrentStroke(2);
    setCurrentColor(parseColor("#a6a09b"));

    setSearchValue("");
    void setQueryParam("", { history: "replace" });
    void setCategoryParam("all", { history: "replace" });
    setCurrentPage(1);
  };

  const commitSearchToUrl = useDebouncedCallback((term: string) => {
    void setQueryParam(term ? term : null, { history: "replace" });
  }, 300);

  const styles = [
    { id: "all", label: "All" },
    { id: "outline", label: "Outline" },
    { id: "filled", label: "Filled" },
  ];

  return (
    <>
      <div className="relative mb-6 flex items-center gap-2 md:mb-8 md:gap-4">
        <InputGroup className="h-10 md:h-12 **:[svg]:size-5!">
          <InputGroupAddon>
            <Icons.IconSearch className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            value={searchValue}
            onChange={(e) => {
              const next = e.target.value;
              setSearchValue(next);
              commitSearchToUrl(next);
            }}
            aria-label="Search icons"
            placeholder={placeholder}
          />
          {searchValue ? (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                size="icon-xs"
                variant="ghost"
                onClick={() => {
                  commitSearchToUrl.cancel();
                  setSearchValue("");
                  void setQueryParam("", { history: "replace" });
                }}
                aria-label="Clear search"
              >
                <Icons.IconX className="size-4" />
              </InputGroupButton>
            </InputGroupAddon>
          ) : null}
        </InputGroup>
        <Button
          size="icon"
          variant="outline"
          className="size-10 md:size-12"
          onClick={() => setIsOpen(true)}
        >
          <IconPalette className="size-5! text-muted-foreground md:size-6!" />
        </Button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-6">
              Customize icons
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" onClick={handleReset}>
                    <Icons.IconReload />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Reset settings to default.</TooltipContent>
              </Tooltip>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 px-6 py-5">
            <div className="grid w-full gap-4">
              <Label className="font-medium">Style</Label>
              <div className="flex items-center">
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={currentStyle}
                  onValueChange={(v) => {
                    if (v) {
                      setCurrentStyle(v);
                      setCurrentPage(1);
                    }
                  }}
                >
                  {styles.map(({ id, label }) => (
                    <ToggleGroupItem
                      key={id}
                      value={id}
                      className={
                        currentStyle === id
                          ? "border-primary bg-primary text-white transition-colors hover:text-foreground"
                          : ""
                      }
                    >
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            <div className="grid w-full gap-4">
              <Label className="font-medium">Size</Label>
              <div className="relative pt-8">
                <div
                  className="absolute top-0 rounded bg-foreground px-2 py-0.5 font-semibold text-background text-xs tabular-nums"
                  style={{
                    left: `${((currentSize - 20) / (48 - 20)) * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {currentSize} px
                  <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-foreground" />
                </div>
                <Slider
                  step={4}
                  min={20}
                  max={48}
                  value={[currentSize]}
                  onValueChange={(v) => setCurrentSize(v[0])}
                  className="mb-1 h-1.5 bg-primary"
                />
              </div>
            </div>
            {currentStyle !== "filled" && (
              <div className="grid w-full gap-4">
                <Label className="font-medium">Stroke</Label>
                <div className="relative pt-8">
                  <div
                    className="absolute top-0 rounded bg-foreground px-2 py-0.5 font-semibold text-background text-xs tabular-nums"
                    style={{
                      left: `${((currentStroke - 1) / (2 - 1)) * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {currentStroke} px
                    <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-foreground" />
                  </div>
                  <Slider
                    step={0.25}
                    min={1}
                    max={2}
                    value={[currentStroke]}
                    onValueChange={(v) => setCurrentStroke(v[0])}
                    className="mb-1 h-1.5! bg-primary"
                  />
                </div>
              </div>
            )}
            <div className="grid w-full gap-4">
              <Label className="font-medium">Color</Label>
              <Input
                type="color"
                value={currentColor.toString("hex")}
                onChange={(e) => setCurrentColor(parseColor(e.target.value))}
                className="h-10 w-full"
              />
            </div>
            <div className="grid w-full gap-4">
              <Label className="font-medium">Category</Label>
              <Select
                value={category}
                onValueChange={(key) => {
                  void setCategoryParam(key === "all" ? "" : key, { history: "replace" });
                  setCurrentPage(1);
                }}
              >
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
            <div className="grid w-full gap-4">
              <Label className="font-medium">Install</Label>
              <InstallIcon />
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
          <div className="flex flex-wrap justify-around gap-2 md:gap-4">
            {paginatedIcons.map(([name, Icon]) => (
              <IconListItem
                key={name}
                name={name}
                // biome-ignore lint/suspicious/noExplicitAny: <>
                Icon={Icon as any}
                iconStyle={currentStyle}
                iconSize={currentSize}
                iconStroke={currentStroke}
                iconColor={String(currentColor)}
              />
            ))}
          </div>
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
