import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    kode: string;
    acara: string;
    jumlah: number;
    kuota: number;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "kode",
        header: "Kode Kupon",
    },
    {
        accessorKey: "acara",
        header: "Acara",
    },
    {
        accessorKey: "jumlah",
        header: "Rp",
    },
    {
        accessorKey: "kuota",
        header: "Kuota",
    },
    {
        accessorKey: "aksi",
        header: "",
    },
];
