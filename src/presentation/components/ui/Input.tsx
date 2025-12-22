"use client";

import { animated, useSpring } from "@react-spring/web";
import { clsx } from "clsx";
import { forwardRef, useId, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Animated input with floating label and error state
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      id,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== "";

    // Animation for focus border
    const focusSpring = useSpring({
      borderColor: error
        ? "#ef4444"
        : isFocused
        ? "#E50914"
        : "rgba(255, 255, 255, 0.2)",
      boxShadow: isFocused
        ? error
          ? "0 0 0 3px rgba(239, 68, 68, 0.2)"
          : "0 0 0 3px rgba(229, 9, 20, 0.2)"
        : "0 0 0 0px transparent",
      config: { tension: 300, friction: 20 },
    });

    // Animation for floating label
    const labelSpring = useSpring({
      transform: isFocused || hasValue
        ? "translateY(-24px) scale(0.85)"
        : "translateY(0) scale(1)",
      color: error
        ? "#ef4444"
        : isFocused
        ? "#E50914"
        : "rgba(255, 255, 255, 0.5)",
      config: { tension: 300, friction: 20 },
    });

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className={clsx("relative", fullWidth && "w-full")}>
        <animated.div
          style={focusSpring}
          className={clsx(
            "relative flex items-center rounded-md bg-gray-800/50 border transition-colors",
            className
          )}
        >
          {leftIcon && (
            <span className="pl-3 text-gray-400">{leftIcon}</span>
          )}
          
          <div className="relative flex-1">
            {label && (
              <animated.label
                htmlFor={inputId}
                style={labelSpring}
                className="absolute left-3 top-3 origin-left pointer-events-none text-sm"
              >
                {label}
              </animated.label>
            )}
            
            <input
              ref={ref}
              id={inputId}
              className={clsx(
                "w-full bg-transparent px-3 py-3 text-white outline-none placeholder-transparent",
                label && "pt-5 pb-1"
              )}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
          </div>
          
          {rightIcon && (
            <span className="pr-3 text-gray-400">{rightIcon}</span>
          )}
        </animated.div>

        {/* Error or helper text */}
        {(error || helperText) && (
          <p
            className={clsx(
              "mt-1 text-sm",
              error ? "text-red-500" : "text-gray-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
