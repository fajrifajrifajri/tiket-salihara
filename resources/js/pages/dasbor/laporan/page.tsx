import HeadingDasbor from "@/components/dasbor/headingDasbor";
import Dasbor from "@/layouts/dasbor";
import { Link } from "@inertiajs/react";

export default function Component() {
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="LAPORAN ACARA BERBAYAR" />
                <h3 className="text-lg font-semibold">Acara</h3>
                <Link href="/dasbor/laporan/detail">Common Sanctum</Link>
            </main>
        </Dasbor>
    );
}
