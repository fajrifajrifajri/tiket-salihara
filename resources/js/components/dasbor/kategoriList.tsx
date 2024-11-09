import { X } from "lucide-react";

export const KategoriList = () => {
    const kategori = Array(6).fill("Test kategori");
    return kategori.map((val, index) => {
        return (
            <div key={index} className="flex w-64 justify-between gap-x-4 mb-4">
                {val}
                <X className="text-red-500 cursor-pointer" />
            </div>
        );
    });
};
