"use client";

import { animated, useSpring } from "@react-spring/web";
import { clsx } from "clsx";
import { ReactNode, forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "netflix";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: "bg-white text-black hover:bg-gray-200",
  secondary: "bg-gray-600/50 text-white hover:bg-gray-600/70",
  ghost: "bg-transparent text-white hover:bg-white/10",
  danger: "bg-red-600 text-white hover:bg-red-700",
  netflix: "bg-netflix-red text-white hover:bg-netflix-red-hover",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

/**
 * Animated button component with multiple variants
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [springProps, api] = useSpring(() => ({
      scale: 1,
      config: { tension: 300, friction: 20 },
    }));

    const handleMouseEnter = () => {
      if (!disabled && !isLoading) {
        api.start({ scale: 1.02 });
      }
    };

    const handleMouseLeave = () => {
      api.start({ scale: 1 });
    };

    const handleMouseDown = () => {
      if (!disabled && !isLoading) {
        api.start({ scale: 0.98 });
      }
    };

    const handleMouseUp = () => {
      if (!disabled && !isLoading) {
        api.start({ scale: 1.02 });
      }
    };

    return (
      <animated.button
        ref={ref}
        style={{ transform: springProps.scale.to((s) => `scale(${s})`) }}
        className={clsx(
          "relative inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors duration-200",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          (disabled || isLoading) && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled || isLoading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </animated.button>
    );
  }
);

Button.displayName = "Button";
