import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";
import { useEffect, useState } from "react";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Input } from "@/components/ui/input";
import { columns, Transaksi } from "./columns";
import { Link, router } from "@inertiajs/react";
import { SearchIcon } from "lucide-react";
import { DataTable } from "@/components/dasbor/dataTable";

interface Props {
    initialTransactions: {
        data: Transaksi[];
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
}

export default function Component({ initialTransactions }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        setIsLoading(true);
        router.get(
            "/dasbor/order",
            { search: searchQuery },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    console.log(initialTransactions);
    return (
        <Dasbor>
            <main className="p-6 space-y-6">
                <HeadingDasbor title="LIST ORDER BERBAYAR" />

                <div className="flex justify-between items-center">
                    <Link href="/dasbor/order/buat">
                        <Button variant="dasbor-gray">+ Order Baru</Button>
                    </Link>

                    <div className="flex gap-2">
                        <Input
                            className="w-64"
                            type="text"
                            placeholder="Cari nomor tiket atau nama"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            variant="dasbor-black"
                            onClick={handleSearch}
                            className="flex items-center gap-2"
                            disabled={isLoading}
                        >
                            <SearchIcon className="w-4 h-4" />
                            {isLoading ? "Mencari..." : "Cari"}
                        </Button>
                    </div>
                </div>

                <div className="rounded-md border">
                    <DataTable
                        columns={columns}
                        data={initialTransactions.data}
                        isLoading={isLoading}
                    />
                </div>
            </main>
        </Dasbor>
    );
}
