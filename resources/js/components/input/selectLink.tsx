import { cva } from "class-variance-authority";
import { ReactNode } from "react";

const selectStyle = cva(
    "flex border border-gray-300 p-2 w-56 focus:ring-black focus:border-black"
);

type SelectContentProps = {
    children: ReactNode;
};

export function SelectContent({ children }: SelectContentProps) {
    return <select className={selectStyle()}>{children}</select>;
}

type SelectItemProps = {
    value: string;
    children: ReactNode;
};

export function SelectItem({ value, children }: SelectItemProps) {
    return <option value={value}>{children}</option>;
}
