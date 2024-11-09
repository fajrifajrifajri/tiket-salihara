import { Link } from "@inertiajs/react";
import { Separator } from "../ui/separator";

const surveiData = [
    {
        title: "SURVEI #1",
    },
    {
        title: "SURVEI #2",
    },
];

export const SurveiList = () => {
    return surveiData.map((val, index) => {
        return (
            <div key={index} className="flex flex-col gap-y-3 w-8/12 mb-12">
                <h3 className="text-lg font-semibold">{val.title}</h3>
                <Link href="/dasbor/survei/ubah" className="hover:opacity-60">
                    Edit Pertanyaan
                </Link>
                <Link href="#" className="hover:opacity-60">
                    Hasil Survei
                </Link>
                <Separator className="border border-brown-3 rounded-md" />
            </div>
        );
    });
};
