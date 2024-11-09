import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";

import { Payment, columns } from "./columns";
import { DataTable } from "../../../components/dasbor/dataTable";
import { useEffect, useState } from "react";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Link } from "@inertiajs/react";

async function getData(): Promise<Payment[]> {
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
    ];
}

export default function Component() {
    const [data, setData] = useState<Payment[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="ACARA RSVP" />
                <Link href="/dasbor/rsvp/baru">
                    <Button variant="dasbor-gray" className="mb-12">
                        + Acara Baru
                    </Button>
                </Link>
                <DataTable columns={columns} data={data} />
            </main>
        </Dasbor>
    );
}
