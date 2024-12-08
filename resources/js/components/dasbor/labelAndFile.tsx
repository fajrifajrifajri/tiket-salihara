import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelAndFileVariants = cva("items-center gap-4", {
    variants: {
        layout: {
            default: "grid grid-cols-12",
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

const labelVariants = cva("", {
    variants: {
        layout: {
            default: "col-span-3",
        },
    },
    defaultVariants: {
        layout: "default",
    },
});

const inputVariants = cva("", {
    variants: {
        layout: {
            default: "col-span-9",
        },
    },
    defaultVariants: {
        layout: "default",
    },
});

interface LabelAndFileProps
    extends VariantProps<typeof labelAndFileVariants>,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    id: string;
    label: string;
    labelClassName?: string;
    inputClassName?: string;
    error?: string;
    preview?: string;
}

export const LabelAndFile: React.FC<LabelAndFileProps> = ({
    id,
    label,
    size,
    className,
    labelClassName,
    inputClassName,
    error,
    preview,
    ...props
}) => (
    <div className={labelAndFileVariants({ size, className })}>
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
                type="file"
                className={cn(error && "border-red-500")}
                variant="file"
                accept="image/*"
                {...props}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            {preview && (
                <img
                    src={
                        preview.startsWith("thumbnails")
                            ? "/storage/" + preview
                            : preview
                    }
                    alt={`${label} Preview`}
                    className="mt-2"
                />
            )}
        </div>
    </div>
);
