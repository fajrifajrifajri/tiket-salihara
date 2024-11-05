import Kupon from "@/components/pages/keranjang/kupon";
import RingkasanPembelian from "@/components/pages/keranjang/ringkasanPembelian";
import { Button } from "@/components/ui/button";
import Depan from "@/layouts/depan";
import { Link } from "@inertiajs/react";

export default function Landing() {
    return (
        <Depan className="px-20 py-10 ml-[80px]">
            <h1 className="text-2xl font-medium mb-6 text-dark-1">
                RINGKASAN PEMBELIAN
            </h1>
            <RingkasanPembelian type="Tiket" />
            <Kupon
                onApply={(code) => {
                    // Handle coupon application logic here
                    console.log("Coupon applied:", code);
                }}
            />

            <Link href="/pembayaran">
                <Button className="w-full bg-dark-2">CHECKOUT</Button>
            </Link>
        </Depan>
    );
}
