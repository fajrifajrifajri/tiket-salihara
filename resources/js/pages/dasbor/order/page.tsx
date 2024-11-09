import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";

import { DataTable } from "../../../components/dasbor/dataTable";
import { useEffect, useState } from "react";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Input } from "@/components/ui/input";
import { columns, Order } from "./columns";
import { Link } from "@inertiajs/react";

async function getData(): Promise<Order[]> {
    return [
        {
            no_tiket: "TK1",
            nama: "John Doe",
            tanggal: "07 Maret 2024",
            acara: "Acara",
            tiket: "Tiket Early Bird",
            jumlah: 2,
            total: 120000,
            status: "completed",
            e_tiket: "123456",
        },
        {
            no_tiket: "TK1",
            nama: "John Doe",
            tanggal: "07 Maret 2024",
            acara: "Acara",
            tiket: "Tiket Early Bird",
            jumlah: 2,
            total: 120000,
            status: "completed",
            e_tiket: "123456",
        },
        {
            no_tiket: "TK1",
            nama: "John Doe",
            tanggal: "07 Maret 2024",
            acara: "Acara",
            tiket: "Tiket Early Bird",
            jumlah: 2,
            total: 120000,
            status: "completed",
            e_tiket: "123456",
        },
    ];
}

export default function Component() {
    const [data, setData] = useState<Order[]>([]);

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
                <HeadingDasbor title="LIST ORDER BERBAYAR" />

                <div className="mb-20">
                    <Link href="/dasbor/order/baru">
                        <Button variant="dasbor-gray">+ Order Baru</Button>
                    </Link>
                </div>

                <div>
                    <Input
                        className="inline-block w-48 mr-8"
                        type="text"
                        placeholder="Cari"
                    />
                    <Button variant="dasbor-black">Cari</Button>
                </div>
                <DataTable columns={columns} data={data} />
            </main>
        </Dasbor>
    );
}
