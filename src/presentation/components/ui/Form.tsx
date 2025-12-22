"use client";

import { clsx } from "clsx";
import { FormEvent, ReactNode } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
}

/**
 * Form wrapper component
 */
export function Form({
  children,
  onSubmit,
  isSubmitting = false,
  className,
  ...props
}: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSubmitting && onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("space-y-4", className)}
      {...props}
    >
      <fieldset disabled={isSubmitting} className="space-y-4">
        {children}
      </fieldset>
    </form>
  );
}

interface FormFieldProps {
  children: ReactNode;
  className?: string;
}

/**
 * Form field wrapper for consistent spacing
 */
export function FormField({ children, className }: FormFieldProps) {
  return <div className={clsx("space-y-1", className)}>{children}</div>;
}

interface FormActionsProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "between";
}

const alignClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between",
};

/**
 * Form actions container for buttons
 */
export function FormActions({
  children,
  className,
  align = "right",
}: FormActionsProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 pt-4",
        alignClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
}
