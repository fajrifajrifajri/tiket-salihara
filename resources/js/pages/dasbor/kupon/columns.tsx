import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";

export type KuponType = {
    id: number;
    kode_kupon: string;
    id_acara?: string;
    nama_acara: string;
    potongan: number;
    kuota: number;
    kedaluwarsa: number;
};

export const columns = ({
    handleEdit,
}: {
    handleEdit: (kuponData: KuponType) => void;
}): ColumnDef<KuponType>[] => [
    {
        accessorKey: "kode_kupon",
        header: "Kode Kupon",
    },
    {
        accessorKey: "nama_acara",
        header: "Acara",
    },
    {
        accessorKey: "potongan",
        header: "Rp",
    },
    {
        accessorKey: "kuota",
        header: "Kuota",
    },
    {
        accessorKey: "kedaluwarsa",
        header: "Kedaluwarsa",
    },
    {
        accessorKey: "id_acara",
        header: "Aksi",
        cell: ({ row }) => (
            <div className="flex gap-x-8">
                <button
                    onClick={() => handleEdit(row.original)}
                    className="text-black hover:underline"
                >
                    <Pen />
                </button>
                <button
                    onClick={() =>
                        router.delete(route("kupon.destroy", row.original.id))
                    }
                    className="text-red-600 hover:underline"
                >
                    <Trash />
                </button>
            </div>
        ),
    },
];
