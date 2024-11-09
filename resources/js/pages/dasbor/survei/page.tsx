import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { SurveiList } from "@/components/dasbor/surveiList";
import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";
import { Link } from "@inertiajs/react";

export default function Component() {
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="SURVEI" />
                <Link href="/dasbor/survei/buat">
                    <Button variant="dasbor-black" className="mb-12">
                        + SURVEI
                    </Button>
                </Link>
                <SurveiList />
            </main>
        </Dasbor>
    );
}
