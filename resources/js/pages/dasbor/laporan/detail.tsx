import HeadingDasbor from "@/components/dasbor/headingDasbor";
import Dasbor from "@/layouts/dasbor";
import { Link } from "@inertiajs/react";

export default function Component() {
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="LAPORAN ACARA BERBAYAR" />
                <h1 className=" mb-20 font-semibold text-4xl">
                    Common Sanctum
                </h1>
                <h3 className="text-lg font-semibold">Tiket Terjual</h3>
                <Link href="/dasbor/laporan-rsvp/detail">100</Link>
                <h3 className="text-lg font-semibold">Check In</h3>
                <Link href="/dasbor/laporan-rsvp/detail">89</Link>
            </main>
        </Dasbor>
    );
}
