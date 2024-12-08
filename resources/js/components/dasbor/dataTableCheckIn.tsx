import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "../ui/input";

export function DataTableCheckIn({
    data,
    onOpenDialog,
}: {
    data: any[];
    onOpenDialog: (ticket: any) => void;
}) {
    const columns: ColumnDef<any, any>[] = [
        {
            accessorKey: "nomor_tiket",
            header: "No. Tiket",
            cell: ({ row }) => row.original.nomor_tiket,
        },
        {
            accessorKey: "nama",
            header: "Nama",
            cell: ({ row }) => row.original.nama,
        },
        {
            accessorKey: "nama_acara",
            header: "Acara",
            cell: ({ row }) => row.original.nama_acara,
        },
        {
            accessorKey: "tipe_tiket",
            header: "Tiket",
            cell: ({ row }) => row.original.tipe_tiket,
        },
        {
            accessorKey: "status",
            header: "Check-in",
            cell: ({ row }) => {
                const isChecked = row.original.status === "check-in";

                const handleToggle = () => {
                    // Implement the API call here for toggling status
                    console.log(
                        `Toggling status for ${row.original.nomor_tiket}`
                    );
                };

                return (
                    <Switch
                        checked={isChecked}
                        onCheckedChange={() => {
                            if (!isChecked) {
                                onOpenDialog(row.original);
                            }
                        }}
                    />
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <div className="md:flex justify-between p-4">
                <div className="grid grid-cols-12 gap-2 items-center mb-4 md:mb-0">
                    <h2 className="col-span-6 text-2xl">COMMON SANCTUM</h2>
                    <div className="col-span-6">
                        <Button variant="link" className="text-purple-400">
                            Belum{" "}
                            {
                                data.filter((item) => item.status === "waiting")
                                    .length
                            }
                        </Button>
                        <Button variant="link" className="text-purple-400">
                            Check-in{" "}
                            {
                                data.filter(
                                    (item) => item.status === "check-in"
                                ).length
                            }{" "}
                            / {data.length}
                        </Button>
                    </div>
                </div>
                <Input
                    type="text"
                    placeholder="Nomor Tiket"
                    className="w-72 border border-gray-400 "
                />
            </div>
            <Table className="border-t-0">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="p-4">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="p-4">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
