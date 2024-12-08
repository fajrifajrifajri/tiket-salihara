import React, { useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { cva, type VariantProps } from "class-variance-authority";

const labelAndSelectVariants = cva("grid grid-cols-12 items-center gap-4", {
    variants: {
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
        size: "default",
    },
});

const labelVariants = cva("col-span-3", {
    variants: {},
    defaultVariants: {},
});

interface SelectOption {
    value: string;
    label: string;
}

interface LabelAndSelectProps
    extends VariantProps<typeof labelAndSelectVariants> {
    id: string;
    label: string;
    options: SelectOption[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    labelClassName?: string;
    className?: string;
}

export const LabelAndSelect: React.FC<LabelAndSelectProps> = ({
    id,
    label,
    options,
    value,
    onValueChange,
    size,
    placeholder = "Pilih...",
    className,
    labelClassName,
    ...props
}) => {
    return (
        <div className={labelAndSelectVariants({ size, className })}>
            <Label
                htmlFor={id}
                className={labelVariants({ className: labelClassName })}
            >
                {label}
            </Label>
            <Select onValueChange={onValueChange} value={value} {...props}>
                <SelectTrigger id={id} className="col-span-9">
                    <SelectValue placeholder={placeholder}>
                        {options?.find((option) => option.value == value)
                            ?.label || placeholder}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
