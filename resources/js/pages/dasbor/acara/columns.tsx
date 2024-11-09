import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export type Ticket = {
    id: number;
    name: string;
    price: string;
    capacity: number;
    available: number;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Acara",
    },
    {
        accessorKey: "email",
        header: "Kategori",
    },
    {
        accessorKey: "amount",
        header: "",
    },
];

export const columnsBaru: ColumnDef<Ticket>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Tiket",
    },
    {
        accessorKey: "price",
        header: "Harga",
    },
    {
        accessorKey: "capacity",
        header: "Kapasitas",
    },
    {
        accessorKey: "available",
        header: "Tersedia",
    },
];
