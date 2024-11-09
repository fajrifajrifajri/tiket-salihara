import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";
import { columns, Payment } from "./columns";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/dasbor/dataTable";
import { Input } from "@/components/ui/input";

async function getData(): Promise<Payment[]> {
    return [
        {
            kode: "728ed52f",
            acara: "Acara 1",
            jumlah: 40000,
            kuota: 2,
        },
        {
            kode: "728ed52f",
            acara: "Acara 1",
            jumlah: 40000,
            kuota: 2,
        },
        {
            kode: "728ed52f",
            acara: "Acara 1",
            jumlah: 40000,
            kuota: 2,
        },
        {
            kode: "728ed52f",
            acara: "Acara 1",
            jumlah: 40000,
            kuota: 2,
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
            <main className="w-8/12">
                <HeadingDasbor title="KUPON" />
                <DataTable columns={columns} data={data} />
                <Button className="block w-48 mt-4" variant="dasbor-gray">
                    + KUPON BARU
                </Button>

                <form className="py-8 w-8/12">
                    <p>Pilih Acara</p>
                    <Input type="text" variant="dasbor-gray" />
                    <p>Kode Kupon</p>
                    <Input type="text" variant="dasbor-gray" />
                    <p>Rp</p>
                    <Input type="number" variant="dasbor-gray" />
                    <p>Kuota</p>
                    <Input type="number" variant="dasbor-gray" />

                    <Button className="block w-48">KIRIM KUPON</Button>
                </form>
            </main>
        </Dasbor>
    );
}
