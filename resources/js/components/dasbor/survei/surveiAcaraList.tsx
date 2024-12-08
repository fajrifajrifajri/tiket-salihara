import { SurveiAcaraListProps } from "@/types/acara";
import { Link } from "@inertiajs/react";

export const SurveiAcaraList: React.FC<SurveiAcaraListProps> = ({
    surveiAcara,
}) => {
    return surveiAcara.map((val, index) => {
        return (
            <div key={index} className="flex flex-col gap-y-3 w-8/12 mb-8">
                <Link href={val.hasil_url} className="hover:opacity-60">
                    <h3 className="text-lg font-semibold">{val.nama_acara}</h3>
                </Link>
            </div>
        );
    });
};
