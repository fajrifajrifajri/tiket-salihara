import { Link } from "@inertiajs/react";
import { cva } from "class-variance-authority";
import React from "react";

const qtyStyle = cva(
    "absolute top-[-20px] right-[-10px] rounded-full bg-red-700 p-2"
);

const Cart: React.FC = () => {
    return (
        <div className="relative">
            <div className={qtyStyle()}>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    5
                </span>
            </div>
            <Link href="/keranjang">
                <img
                    src="/img/cart.png"
                    alt="Keranjang"
                    width={41}
                    height={35}
                />
            </Link>
        </div>
    );
};

export default Cart;
