import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { SurveiAcaraList } from "@/components/dasbor/survei/surveiAcaraList";
import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";
import { SurveiAcaraListProps } from "@/types/acara";
import { Link, usePage } from "@inertiajs/react";

export default function Component() {
    const { surveiAcara } = usePage().props as unknown as SurveiAcaraListProps;
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="SURVEI - ACARA" />
                <SurveiAcaraList surveiAcara={surveiAcara} />
            </main>
        </Dasbor>
    );
}
