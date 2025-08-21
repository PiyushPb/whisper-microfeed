import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define input variants
const inputVariants = cva(
  "flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input text-base md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        auth: "bg-white dark:bg-black/40 border-muted placeholder:text-muted-foreground text-[16px] rounded-lg px-4 py-2 focus-visible:ring-2 focus-visible:ring-primary h-15",
        search:
          "bg-white dark:bg-black/40 border-muted placeholder:text-muted-foreground text-[16px] rounded-lg px-4 py-2 focus-visible:ring-2 focus-visible:ring-primary h-15",
      },
      hasError: {
        true: "border-destructive focus-visible:ring-destructive/30",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      hasError: false,
    },
  }
);

// Extend props with `error`
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          ref={ref}
          aria-invalid={!!error}
          data-slot="input"
          className={cn(
            inputVariants({ variant, hasError: !!error }),
            className
          )}
          {...props}
        />
        {error && (
          <span className="mt-1 block text-sm text-destructive">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
