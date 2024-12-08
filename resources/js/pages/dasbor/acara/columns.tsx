import { ColumnDef } from "@tanstack/react-table";
import { Acara } from "@/types/acara";
import { Pen, Pencil, Trash, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export interface Tiket {
    id: number;
    id_transaksi: number;
    id_tiket_detail: number;
    nama_acara: string;
    nomor_tiket: string;
    status: "waiting" | "check-in" | "refund" | "expired";
    tipe_tiket: "berbayar" | "rsvp";
    created_at: string;
    updated_at: string;
}

export const columns = ({
    handleDelete,
}: {
    handleDelete: (slug: any) => void;
}): ColumnDef<Acara>[] => [
    {
        accessorKey: "nama_acara",
        header: "Nama Acara",
    },
    {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: ({ getValue }) => (
            <img
                src={
                    getValue<string>()?.startsWith("http")
                        ? getValue<string>()
                        : "/storage/" + getValue<string>()
                }
                alt="Thumbnail"
                className="w-16 h-16 object-cover rounded-md"
            />
        ),
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "publish",
        header: "Published",
        cell: ({ getValue }) => (
            <span
                className={`px-2 py-1 text-sm font-medium rounded ${
                    getValue<boolean>()
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}
            >
                {getValue<boolean>() ? "Yes" : "No"}
            </span>
        ),
    },
    {
        accessorKey: "id",
        header: "Aksi",
        cell: ({ row }) => (
            <div className="flex gap-x-8">
                <a
                    href={`/dasbor/acara/${row.original.slug}/ubah`}
                    className="text-black hover:underline"
                >
                    <Pen />
                </a>
                <button
                    onClick={() => handleDelete(row.original.id)}
                    className="text-red-600 hover:underline"
                >
                    <Trash />
                </button>
            </div>
        ),
    },
];

export const columnsBuat: ColumnDef<Tiket>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "prefix",
        header: "Prefix",
    },
    {
        accessorKey: "nama_tiket",
        header: "Tiket",
    },
    {
        accessorKey: "harga",
        header: "Harga",
    },
    {
        accessorKey: "kapasitas",
        header: "Kapasitas",
    },
    {
        accessorKey: "tanggal_mulai",
        header: "Tanggal Mulai",
    },
    {
        accessorKey: "tanggal_berakhir",
        header: "Tanggal Berakhir",
    },
];

export const columnsTiket = (
    handleUpdateTiket: (tiket: Tiket) => void,
    handleDeleteTiket: (id: number) => void
): ColumnDef<Tiket>[] => [
    {
        accessorKey: "nama_tiket",
        header: "Nama Tiket",
    },
    {
        accessorKey: "harga",
        header: "Harga",
        cell: ({ getValue }) =>
            `Rp ${getValue<number>().toLocaleString("id-ID")}`,
    },
    {
        accessorKey: "kapasitas",
        header: "Kapasitas",
    },
    {
        accessorKey: "id",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <button
                    onClick={() => handleUpdateTiket(row.original)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <Pencil className="h-4 w-4" />
                </button>
                <button
                    onClick={() => handleDeleteTiket(row.original.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        ),
    },
];
