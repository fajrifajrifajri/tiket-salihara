import HeadingDasbor from "@/components/dasbor/headingDasbor";
import Dasbor from "@/layouts/dasbor";
import { usePage } from "@inertiajs/react";

type HasilItem = {
    pertanyaan: string;
    jawaban_pengunjung: string;
    jawaban_pengunjung_count: number;
};

type PageProps = {
    hasil: HasilItem[];
    nama_survei: string;
    nama_acara: string;
};

export default function Component() {
    const { hasil, nama_survei, nama_acara } = usePage()
        .props as unknown as PageProps;

    const groupedReport = hasil.reduce(
        (groups: { [key: string]: HasilItem[] }, item) => {
            const { pertanyaan } = item;
            if (!groups[pertanyaan]) {
                groups[pertanyaan] = [];
            }
            groups[pertanyaan].push(item);
            return groups;
        },
        {}
    );

    console.log(hasil);
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="HASIL SURVEI" />
                <h2 className="text-xl font-bold mb-2">{nama_survei}</h2>
                <h2 className="text-xl font-bold mb-4">{nama_acara}</h2>

                {Object.entries(groupedReport).map(
                    ([pertanyaan, jawabans], index) => (
                        <div key={index} className="report-group">
                            <h2 className="text-lg font-medium">
                                {pertanyaan}
                            </h2>
                            <ul>
                                {jawabans.map((jawaban, idx) => (
                                    <li key={idx}>
                                        {jawaban.jawaban_pengunjung} -{" "}
                                        {jawaban.jawaban_pengunjung_count}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                )}
            </main>
        </Dasbor>
    );
}
