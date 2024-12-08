import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelAndDateTimeVariants = cva("grid grid-cols-12 items-center gap-4", {
    variants: {
        layout: {
            default: "",
        },
        size: {
            default: "",
            sm: "text-sm",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
        },
    },
    defaultVariants: {
        layout: "default",
        size: "default",
    },
});

const labelVariants = cva("col-span-6", {
    variants: {
        layout: {
            default: "",
        },
    },
    defaultVariants: {
        layout: "default",
    },
});

const inputVariants = cva("col-span-6", {
    variants: {
        layout: {
            default: "",
        },
    },
    defaultVariants: {
        layout: "default",
    },
});

interface LabelAndDateTimeProps
    extends VariantProps<typeof labelAndDateTimeVariants>,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    id: string;
    type?: string;
    label: string;
    labelClassName?: string;
    inputClassName?: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
}

export const LabelAndDateTime: React.FC<LabelAndDateTimeProps> = ({
    id,
    type,
    label,
    size,
    className,
    labelClassName,
    inputClassName,
    error,
    value,
    onChange,
    ...props
}) => (
    <div className={labelAndDateTimeVariants({ size, className })}>
        <Label
            htmlFor={id}
            className={labelVariants({
                className: labelClassName,
            })}
        >
            {label}
        </Label>
        <div className={inputVariants({ className: inputClassName })}>
            <Input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(error && "border-red-500")}
                variant="dasbor-input"
                {...props}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    </div>
);
