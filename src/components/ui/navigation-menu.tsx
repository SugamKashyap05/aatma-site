import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

interface NavigationMenuProps
  extends React.ComponentProps<typeof NavigationMenuPrimitive.Root> {
  viewport?: boolean;
}

export function NavigationMenu({
  className,
  children,
  viewport = false,
  ...props
}: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative z-[70] flex max-w-max items-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex list-none items-center gap-1", className)}
      {...props}
    />
  );
}

export function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-transparent px-3 text-sm font-medium text-cream/90 transition-colors hover:bg-white/[0.06] hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light data-[state=open]:border-white/10 data-[state=open]:bg-white/[0.06] data-[state=open]:text-gold-light",
);

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden="true"
        className="size-3.5 shrink-0 opacity-65 transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "absolute left-0 top-full z-[80] mt-4 overflow-hidden rounded-lg border border-white/15 bg-green-deep p-2 text-cream shadow-lg shadow-black/20 data-[state=closed]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex min-h-11 items-center rounded-md px-3 py-2 text-sm leading-snug text-cream/85 transition-colors hover:bg-white/[0.06] hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light data-[active=true]:text-gold-light motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:hidden",
        className,
      )}
      {...props}
    >
      <span className="relative top-[60%] size-2 rotate-45 rounded-sm border border-gold/50 bg-green-deep" />
    </NavigationMenuPrimitive.Indicator>
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute left-0 top-full flex justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-lg border border-white/15 bg-green-deep/95 p-2 text-cream shadow-lg shadow-black/20 backdrop-blur-xl md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
