"use client";

import { animated, useSpring } from "@react-spring/web";
import { clsx } from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

type PopoverPosition = "top" | "bottom" | "left" | "right";
type PopoverTrigger = "click" | "hover";

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  position?: PopoverPosition;
  trigger?: PopoverTrigger;
  offset?: number;
  className?: string;
}

/**
 * Animated popover component
 */
export function Popover({
  children,
  content,
  position = "bottom",
  trigger = "click",
  offset = 8,
  className,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Animation
  const popoverSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen
      ? "scale(1) translateY(0)"
      : position === "top"
      ? "scale(0.95) translateY(5px)"
      : position === "bottom"
      ? "scale(0.95) translateY(-5px)"
      : position === "left"
      ? "scale(0.95) translateX(5px)"
      : "scale(0.95) translateX(-5px)",
    config: { tension: 300, friction: 25 },
  });

  // Position styles
  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case "top":
        return { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: offset };
      case "bottom":
        return { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: offset };
      case "left":
        return { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: offset };
      case "right":
        return { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: offset };
      default:
        return {};
    }
  };

  // Close on outside click
  useEffect(() => {
    if (trigger === "click") {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [trigger]);

  const handleClick = () => {
    if (trigger === "click") {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isOpen && (
        <animated.div
          ref={popoverRef}
          style={{
            ...popoverSpring,
            ...getPositionStyles(),
            position: "absolute",
            zIndex: 50,
          }}
          className={clsx(
            "bg-gray-800 border border-white/10 rounded-lg shadow-xl p-3",
            className
          )}
        >
          {content}
        </animated.div>
      )}
    </div>
  );
}
