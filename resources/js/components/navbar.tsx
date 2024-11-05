"use client";

import React, { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import BurgerButton from "./ui/burgerButton";
import Logo from "./ui/logo";
import Cart from "./ui/cart";
import { Link } from "@inertiajs/react";

const navbarStyle = cva(
    "fixed flex items-center justify-between bg-white w-full transition-all duration-300 ease-in-out",
    {
        variants: {
            isScrolled: {
                true: "py-2 px-20",
                false: "py-4 px-20",
            },
        },
        defaultVariants: {
            isScrolled: false,
        },
    }
);

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

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
        <nav className={navbarStyle({ isScrolled })}>
            <div className="flex items-center">
                <Link href="/">
                    <Logo
                        src="/img/logo-tiket.png"
                        alt="Logo"
                        isScrolled={isScrolled}
                        className={`transition-all duration-300 ease-in-out`}
                    />
                </Link>
            </div>
            <div className="flex gap-x-8 items-center">
                <Cart />
                <BurgerButton />
            </div>
        </nav>
    );
}
