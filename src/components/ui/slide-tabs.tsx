import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SlideTabsProps {
  tabs?: string[];
  className?: string;
  onTabChange?: (index: number) => void;
}

export const SlideTabs = ({
  tabs = ["Home", "About", "Story", "Milestones", "Members", "News", "Contact"],
  className,
  onTabChange,
}: SlideTabsProps) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected]);

  const handleTabClick = (index: number) => {
    setSelected(index);
    onTabChange?.(index);
  };

  return (
    <ul
      onMouseLeave={() => {
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({
            left: selectedTab.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className={cn(
        "relative mx-auto flex w-fit rounded-full border border-white/20 bg-green-deep/80 backdrop-blur-md p-1",
        className
      )}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => handleTabClick(i)}
          isActive={selected === i}
        >
          {tab}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

// The Tab component is wrapped in forwardRef to accept a ref from its parent.
const Tab = React.forwardRef<
  HTMLLIElement,
  {
    children: React.ReactNode;
    setPosition: (pos: { left: number; width: number; opacity: number }) => void;
    onClick: () => void;
    isActive: boolean;
  }
>(({ children, setPosition, onClick, isActive }, ref) => {
  return (
    <li
      ref={ref as React.RefObject<HTMLLIElement | null>}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref || typeof ref === 'function' || !ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={cn(
        "relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase tracking-wide transition-colors duration-200 md:px-4 md:py-2.5 md:text-sm",
        isActive ? "text-green-deep font-semibold" : "text-white/70 hover:text-white"
      )}
    >
      {children}
    </li>
  );
});

Tab.displayName = "Tab";

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-gold md:h-10"
    />
  );
};

export default SlideTabs;
