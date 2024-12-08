import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface TiketDetail {
    id: number;
    nama_tiket: string;
    tipe_tiket: string;
    harga: number;
    acara: {
        nama_acara: string;
    };
    jumlah: number;
    total: number;
}

export const orderFormColumns = ({
    handleDeleteTiket,
}: {
    handleDeleteTiket: (id: number) => void;
}): ColumnDef<TiketDetail>[] => [
    {
        accessorKey: "acara.nama_acara",
        header: "Nama Acara",
    },
    {
        accessorKey: "nama_tiket",
        header: "Nama Tiket",
    },
    {
        accessorKey: "harga",
        header: "Harga",
    },
    {
        accessorKey: "jumlah",
        header: "Jumlah",
    },
    {
        accessorKey: "total",
        header: "Total",
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
            return (
                <Button
                    type="button"
                    onClick={() => handleDeleteTiket(row.original.id)}
                >
                    Hapus
                </Button>
            );
        },
    },
];
