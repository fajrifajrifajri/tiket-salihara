import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
    no_tiket: string;
    nama: string;
    tanggal: string;
    acara: string;
    tiket: string;
    jumlah: number;
    total: number;
    status: string;
    e_tiket: string;
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "no_tiket",
        header: "No. Tiket",
    },
    {
        accessorKey: "nama",
        header: "Nama",
    },
    {
        accessorKey: "tanggal",
        header: "Tanggal",
    },
    {
        accessorKey: "acara",
        header: "Acara",
    },
    {
        accessorKey: "tiket",
        header: "Tiket",
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
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "e_tiket",
        header: "E-Tiket",
    },
];
