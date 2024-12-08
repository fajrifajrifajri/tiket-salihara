import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {}

const inputVariants = cva(
    "flex h-9 my-2 px-3 py-1 transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "border-input bg-transparent text-dark-1",
                file: "border border-gray-600 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "dasbor-gray": "border-gray-300 text-gray-800",
                "dasbor-input": "border-t-0 border-l-0 border-r-0 border-b",
            },
        },
        defaultVariants: {
            variant: "dasbor-input",
        },
    }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(inputVariants({ variant }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
