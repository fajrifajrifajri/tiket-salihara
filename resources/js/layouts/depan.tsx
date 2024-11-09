import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

interface DepanProps extends PropsWithChildren {
    className?: string; // Add className prop
}

export default function Depan({ children, className }: DepanProps) {
    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className={`md:pt-48 pt-32 ${className}`}>{children}</div>

            <div>
                <Footer />
            </div>
        </div>
    );
}
