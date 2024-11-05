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

            <div className={`pt-48 ${className}`}>{children}</div>

            <div>
                <Footer />
            </div>
        </div>
    );
}
