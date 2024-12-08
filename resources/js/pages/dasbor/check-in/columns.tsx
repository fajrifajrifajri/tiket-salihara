import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tiket = {
    no_tiket: string;
    nama: string;
    acara: string;
    tiket: string;
    check_in: boolean;
};

export const columns: ColumnDef<Tiket>[] = [
    {
        accessorKey: "nomor_tiket",
        header: "No. Tiket",
    },
    {
        accessorKey: "nama",
        header: "Nama",
    },
    {
        accessorKey: "nama_acara",
        header: "Acara",
    },
    {
        accessorKey: "tipe_tiket",
        header: "Tiket",
    },
    {
        accessorKey: "status",
        header: "Check In",
    },
];
