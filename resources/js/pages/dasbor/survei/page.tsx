import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { SurveiList } from "@/components/dasbor/survei/surveiList";
import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";
import { Link, usePage } from "@inertiajs/react";
import { SurveiListProps } from "./survei";

export default function Component() {
    const { survei } = usePage().props as unknown as SurveiListProps;

    console.log(survei);
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="SURVEI" />
                <Link href="/dasbor/survei/buat">
                    <Button variant="dasbor-black" className="mb-12">
                        + SURVEI
                    </Button>
                </Link>
                <SurveiList survei={survei} />
            </main>
        </Dasbor>
    );
}
