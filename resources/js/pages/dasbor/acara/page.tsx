import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";
import { columns } from "./columns";
import { DataTable } from "../../../components/dasbor/dataTable";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Link, router, usePage } from "@inertiajs/react";
import { Acara } from "@/types/acara";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Component() {
    const { acara } = usePage().props as unknown as { acara: Acara[] };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this event?")) {
            router.delete(`/dasbor/acara/${id}`, {
                onSuccess: (e) => {
                    console.log(e);
                },
                onError: (e) => {
                    console.error(e);
                },
            });
        }
    };

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="ACARA BERBAYAR" />
                <Link href="/dasbor/acara/buat">
                    <Button variant="dasbor-gray" size="lg" className="mb-12">
                        <PlusIcon className="w-4 h-4 mr-2" /> Acara Baru
                    </Button>
                </Link>
                <DataTable columns={columns({ handleDelete })} data={acara} />
            </main>
        </Dasbor>
    );
}
