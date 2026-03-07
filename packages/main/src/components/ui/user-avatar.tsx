/**
 * User Avatar Component
 * Displays user profile pictures with fallback initials and optional status indicators
 * Built on top of the base Avatar component with enhanced user-specific features
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@pelatform/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/radix/avatar";

const avatarStatusVariants = cva(
  "flex size-2 items-center rounded-full border-2 border-background",
  {
    variants: {
      variant: {
        online: "bg-green-600",
        offline: "bg-zinc-400 dark:bg-zinc-500",
        busy: "bg-yellow-600",
        away: "bg-blue-600",
      },
    },
    defaultVariants: {
      variant: "online",
    },
  },
);

/**
 * Props interface for the UserAvatar component
 */
interface UserAvatarProps {
  /** Additional CSS classes for styling */
  className?: string;
  /** Whether to show online status indicator */
  indicator?: boolean;
  /** Source URL for the user's profile image */
  src?: string | null | undefined;
  /** Alt text for the image, also used to generate initials */
  alt?: string | null;
}

/**
 * UserAvatar Component
 *
 * Displays a user's profile picture with automatic fallback to initials
 * when no image is available. Supports optional online status indicators
 * and follows accessibility best practices.
 *
 * Features:
 * - Automatic initials generation from name
 * - Fallback handling for missing images
 * - Optional online status indicator
 * - Accessible alt text support
 * - Customizable styling
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes for styling
 * @param props.indicator - Whether to show online status indicator (default: false)
 * @param props.src - Source URL for the user's profile image
 * @param props.alt - Alt text for the image, also used to generate initials
 * @returns JSX element containing the user avatar
 *
 * @example
 * ```tsx
 * // Basic user avatar with image
 * <UserAvatar
 *   src="https://example.com/avatar.jpg"
 *   alt="John Doe"
 * />
 *
 * // Avatar with online indicator
 * <UserAvatar
 *   src="https://example.com/avatar.jpg"
 *   alt="Jane Smith"
 *   indicator={true}
 * />
 *
 * // Avatar with fallback initials (no image)
 * <UserAvatar
 *   alt="Bob Johnson"
 *   className="w-12 h-12"
 * />
 *
 * // User list with avatars
 * <div className="flex space-x-2">
 *   {users.map(user => (
 *     <UserAvatar
 *       key={user.id}
 *       src={user.avatar}
 *       alt={user.name}
 *       indicator={user.isOnline}
 *       className="w-8 h-8"
 *     />
 *   ))}
 * </div>
 *
 * // Profile header
 * <div className="flex items-center space-x-4">
 *   <UserAvatar
 *     src={currentUser.avatar}
 *     alt={currentUser.name}
 *     indicator={true}
 *     className="w-16 h-16"
 *   />
 *   <div>
 *     <h2>{currentUser.name}</h2>
 *     <p className="text-gray-600">{currentUser.email}</p>
 *   </div>
 * </div>
 * ```
 */
export function UserAvatar({ className, indicator = false, src, alt }: UserAvatarProps) {
  const name = alt ?? "User";
  const initial = getInitials(name);

  return (
    <Avatar className={className}>
      <AvatarImage src={src ?? undefined} alt={name} />
      <AvatarFallback>{initial}</AvatarFallback>
      {indicator && (
        <AvatarIndicator className="-end-2 -top-2">
          <AvatarStatus variant="online" className="size-2.5" />
        </AvatarIndicator>
      )}
    </Avatar>
  );
}

/**
 * Utility function to generate initials from a name
 *
 * Extracts the first letter of each word in a name and converts
 * them to uppercase to create user initials for avatar fallbacks.
 *
 * @param name - The full name to extract initials from
 * @param count - Maximum number of initials to return (optional)
 * @returns String containing the initials
 *
 * @example
 * ```tsx
 * getInitials("John Doe") // Returns "JD"
 * getInitials("Jane Mary Smith", 2) // Returns "JM"
 * getInitials("") // Returns ""
 * getInitials(null) // Returns ""
 * ```
 */
export const getInitials = (name: string | null | undefined, count?: number): string => {
  if (!name || typeof name !== "string") {
    return "";
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase());

  return count && count > 0 ? initials.slice(0, count).join("") : initials.join("");
};

function AvatarIndicator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-indicator"
      className={cn("absolute flex size-6 items-center justify-center", className)}
      {...props}
    />
  );
}

function AvatarStatus({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof avatarStatusVariants>) {
  return (
    <div
      data-slot="avatar-status"
      className={cn(avatarStatusVariants({ variant }), className)}
      {...props}
    />
  );
}
