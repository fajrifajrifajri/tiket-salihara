"use client";

import React, { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import BurgerButton from "./ui/burgerButton";
import Logo from "./ui/logo";
import Cart from "./ui/cart";
import { Link } from "@inertiajs/react";
import { useIsMobile } from "@/hooks/use-mobile";

const navbarStyle = cva(
    "z-50 fixed flex items-center justify-between bg-white w-full ",
    {
        variants: {
            isScrolled: {
                true: "py-2 px-20",
                false: "py-4 px-20",
            },
            isMobile: {
                true: "py-2 px-4", // Adjust padding for mobile
                false: "px-20",
            },
        },
        defaultVariants: {
            isScrolled: false,
            isMobile: false,
        },
    }
);

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const isMobile = useIsMobile(); // Use the hook to detect mobile view

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={navbarStyle({ isScrolled, isMobile })}>
            <div className="flex items-center">
                <Link href="/">
                    <Logo
                        isScrolled={isScrolled}
                        className={`transition-all duration-300 ease-in-out`}
                        showDescription={!isMobile} // Hide description on mobile
                    />
                </Link>
            </div>
            <div
                className={`flex gap-x-8 items-center sm:gap-x-4 gap-x-8"
                }`}
            >
                <Cart />
                <BurgerButton />
            </div>
        </nav>
    );
}
