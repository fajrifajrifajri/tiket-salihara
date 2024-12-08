import { Link } from "@inertiajs/react";
import { Separator } from "../../ui/separator";
import { SurveiListProps } from "@/pages/dasbor/survei/survei";
import { FlagTriangleRight, Pencil } from "lucide-react";

export const SurveiList: React.FC<SurveiListProps> = ({ survei }) => {
    return survei.map((val, index) => {
        return (
            <div
                key={index}
                className="flex flex-col items-start gap-y-8 w-8/12 mb-8"
            >
                <h3 className="text-lg font-semibold">{val.nama_survei}</h3>
                <div className="flex gap-x-4">
                    <Link
                        href={val.edit_url}
                        className="relative group inline-flex items-center gap-x-2"
                    >
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300"></span>
                        <Pencil className="w-4 h-4" /> Edit Pertanyaan
                    </Link>
                    <Link
                        href={val.acara_url}
                        className="relative group inline-flex items-center gap-x-2"
                    >
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300"></span>
                        <FlagTriangleRight className="w-4 h-4" />
                        Hasil Survei
                    </Link>
                </div>
                <Separator className="border border-brown-3 rounded-md" />
            </div>
        );
    });
};
