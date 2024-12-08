import { useForm, usePage } from "@inertiajs/react";
import Dasbor from "@/layouts/dasbor";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Acara } from "@/types/acara";
import { Kategori } from "@/types/kategori";
import { FormAcara } from "@/components/dasbor/acara/formAcara";
import { Survei } from "../survei/survei";
import { FormData } from "./buat";
import { useState } from "react";

interface AkordeonAcara {
    id: number;
    judul_akordeon: string;
    deskripsi_akordeon: string;
}

export default function Component() {
    const { survei, kategori, acara, akordeon } = usePage()
        .props as unknown as {
        survei: Survei[];
        kategori: Kategori[];
        acara: Acara;
        akordeon: AkordeonAcara[];
    };

    // Inertia bug with file upload still null on data.thumbnail
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const { data, setData, post, processing, errors } = useForm<FormData>({
        id_kategori: acara.id_kategori,
        id_survei: acara.id_survei,
        nama_acara: acara.nama_acara,
        thumbnail: null,
        thumbnail_preview: acara.thumbnail || "",
        info: acara.info || "",
        logo: acara.logo || "",
        tanggal_acara_dari: acara.tanggal_acara_dari || "",
        tanggal_acara_sampai: acara.tanggal_acara_sampai || "",
        posting_acara_dari: acara.posting_acara_dari || "",
        posting_acara_sampai: acara.posting_acara_sampai || "",
        syarat_dan_ketentuan: acara.syarat_dan_ketentuan || "",
        publish: acara.publish,
        accordion: akordeon || [{ judul_akordeon: "", deskripsi_akordeon: "" }],
        tiket_detail: acara.tiket_detail || [],
        _method: "PUT",
    });

    const handleSubmit = () => {
        // Inertia bug with file upload still null on data.thumbnail
        data.thumbnail = thumbnail;

        post(`/dasbor/acara/${acara.id}`, {
            preserveScroll: true,
            onError: (error) => {
                console.log(error);
            },
        });
    };

    console.log(data);

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="UBAH ACARA" />
                <FormAcara
                    survei={survei}
                    kategori={kategori}
                    data={data}
                    setData={setData}
                    onSubmit={handleSubmit}
                    processing={processing}
                    errors={errors}
                    isEdit={true}
                    thumbnail={thumbnail}
                    setThumbnail={setThumbnail}
                />
            </main>
        </Dasbor>
    );
}
