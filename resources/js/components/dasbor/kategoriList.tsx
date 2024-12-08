import { X } from "lucide-react";
import React from "react";
import { router } from "@inertiajs/react";
import { KategoriListProps } from "@/types/kategori";

export const KategoriList: React.FC<KategoriListProps> = ({ kategori }) => {
    const handleDelete = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => {
        e.preventDefault();
        router.delete(`/dasbor/kategori/${id}`);
    };

    return kategori.map((val, index) => {
        return (
            <div key={index} className="flex w-64 justify-between gap-x-4 mb-4">
                {val.nama_kategori}
                <button onClick={(e) => handleDelete(e, val.id)}>
                    <X className="text-red-500 cursor-pointer" />
                </button>
            </div>
        );
    });
};
