import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cva, type VariantProps } from "class-variance-authority";

const labelAndInputVariants = cva("items-center gap-4", {
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

interface LabelAndInputProps
    extends VariantProps<typeof labelAndInputVariants>,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    id: string;
    label: string;
    labelClassName?: string;
    inputClassName?: string;
}

export const LabelAndInput: React.FC<LabelAndInputProps> = ({
    id,
    label,
    size,
    className,
    labelClassName,
    inputClassName,
    ...props
}) => (
    <div className={labelAndInputVariants({ size, className })}>
        <Label
            htmlFor={id}
            className={labelVariants({
                className: labelClassName,
            })}
        >
            {label}
        </Label>
        <Input
            id={id}
            className={inputVariants({
                className: inputClassName,
            })}
            variant="dasbor-input"
            {...props}
        />
    </div>
);
