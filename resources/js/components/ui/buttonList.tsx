import { cva } from "class-variance-authority";
import React from "react";
import clsx from "clsx";
import { Link } from "@inertiajs/react";

const buttonListStyle = cva(
    "block text-center cursor-pointer transition-colors",
    {
        variants: {
            variant: {
                default: "bg-black text-white hover:bg-gray-800",
                list: "w-full py-8 text-left border-b border-gray-3 border-dashed text-2xl hover:bg-gray-100",
                lastList: "w-full py-8 text-left text-2xl hover:bg-gray-100",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

type ButtonListProps = {
    children: React.ReactNode;
    variant?: "default" | "list" | "lastList";
    href: string;
    className?: string;
};

export default function ButtonList({
    children,
    variant,
    href,
    className,
}: ButtonListProps) {
    return (
        <Link
            href={href}
            className={clsx(buttonListStyle({ variant }), className)}
        >
            {children}
        </Link>
    );
}
