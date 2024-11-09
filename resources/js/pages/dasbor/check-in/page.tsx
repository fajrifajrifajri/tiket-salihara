import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";

import { DataTable } from "../../../components/dasbor/dataTable";
import { useEffect, useState } from "react";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Input } from "@/components/ui/input";
import { Tiket, columns } from "./columns";

async function getData(): Promise<Tiket[]> {
    return [
        {
            no_tiket: "TK1",
            nama: "John Doe",
            acara: "Acara",
            tiket: "Tiket Early Bird",
            check_in: false,
        },
        {
            no_tiket: "TK1",
            nama: "John Doe",
            acara: "Acara",
            tiket: "Tiket Early Bird",
            check_in: false,
        },
        {
            no_tiket: "TK1",
            nama: "John Doe",
            acara: "Acara",
            tiket: "Tiket Early Bird",
            check_in: false,
        },
        {
            no_tiket: "TK1",
            nama: "John Doe",
            acara: "Acara",
            tiket: "Tiket Early Bird",
            check_in: false,
        },
    ];
}

export default function Component() {
    const [data, setData] = useState<Tiket[]>([]);

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
                <HeadingDasbor title="CHECK IN BERBAYAR" />

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
