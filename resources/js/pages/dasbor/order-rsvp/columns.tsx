import { ColumnDef } from "@tanstack/react-table";
import { Badge, CheckCircle2, Clock, XCircle } from "lucide-react";

export interface Transaksi {
    id: number;
    nomor_tiket: string;
    nama: string;
    tanggal: string;
    acara: string;
    tiket: string;
    jumlah: number;
    total: number;
    status: "pending" | "sukses" | "gagal";
    e_tiket: string;
}

export const columns: ColumnDef<Transaksi>[] = [
    {
        accessorKey: "nomor_tiket",
        header: "No. Tiket",
    },
    {
        accessorKey: "nama",
        header: "Nama",
    },
    {
        accessorKey: "created_at",
        header: "Tanggal",
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            return date.toLocaleDateString();
        },
    },
    {
        accessorKey: "nama_acara",
        header: "Acara",
    },
    {
        accessorKey: "tiket",
        header: "Tiket",
        cell: ({ row }) => {
            const tiket = row.getValue("tiket");
            return tiket
                .map((tiket) => tiket.tiket_detail.nama_tiket)
                .join(", ");
        },
    },
    {
        accessorKey: "jumlah",
        header: "Jumlah",
        cell: ({ row }) => {
            const tiket = row.getValue("tiket");
            return tiket.map((tiket) => tiket.jumlah).join(", ");
        },
    },
    {
        accessorKey: "total_bayar",
        header: "Total",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total_bayar"));
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(amount);
            return formatted;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div className="flex items-center gap-2">
                    {status === "sukses" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : status === "pending" ? (
                        <Clock className="w-5 h-5 text-yellow-500" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    {status.toUpperCase()}
                </div>
            );
        },
    },
    {
        accessorKey: "e_tiket",
        header: "E-tiket",
        cell: ({ row }) => (
            <button
                onClick={() =>
                    window.open(`/tiket/${row.getValue("e_tiket")}`, "_blank")
                }
                className="text-blue-600 hover:text-blue-800 underline"
            >
                Unduh
            </button>
        ),
    },
];
