import { useForm, usePage } from "@inertiajs/react";
import Dasbor from "@/layouts/dasbor";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Kategori } from "@/types/kategori";
import { FormAcara } from "@/components/dasbor/acara/formAcara";
import { useState } from "react";

interface Survei {
    id: number;
    nama_survei: string;
}

export interface TiketDetail {
    id?: number;
    nama_tiket: string;
    kapasitas: string;
    prefix: string;
    harga: number;
    pajak: number;
    info_tiket: string;
    maksimal_per_transaksi: string;
    tanggal_mulai: string;
    waktu_mulai: string;
    tanggal_berakhir: string;
    waktu_berakhir: string;
    tipe_tiket: string;
    penjualan_dari: string;
    penjualan_sampai: string;
}

export interface FormData {
    id_kategori: number | null;
    id_survei: number | null;
    nama_acara: string;
    thumbnail: File | null;
    thumbnail_preview: string;
    info: string;
    tempat_acara: string;
    tanggal_acara_dari: string;
    tanggal_acara_sampai: string;
    posting_acara_dari: string;
    posting_acara_sampai: string;
    syarat_dan_ketentuan: string;
    publish: boolean;
    accordion: { judul_akordeon: string; deskripsi_akordeon: string }[];
    tiket_detail: TiketDetail[];
}

export default function Component() {
    const { survei, kategori } = usePage().props as unknown as {
        survei: Survei[];
        kategori: Kategori[];
    };

    // Inertia bug with file upload still null on data.thumbnail
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        id_kategori: null,
        id_survei: null,
        nama_acara: "",
        thumbnail: null,
        thumbnail_preview: "",
        info: "",
        logo: "",
        tempat_acara: "",
        tanggal_acara_dari: "",
        tanggal_acara_sampai: "",
        posting_acara_dari: "",
        posting_acara_sampai: "",
        syarat_dan_ketentuan: "",
        publish: false,
        accordion: [{ judul_akordeon: "", deskripsi_akordeon: "" }],
        tiket_detail: [],
    });

    const handleSubmit = () => {
        // Inertia bug with file upload still null on data.thumbnail
        data.thumbnail = thumbnail;

        post("/dasbor/acara", {
            preserveScroll: true,
            onError: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="ACARA BARU" />
                <FormAcara
                    survei={survei}
                    kategori={kategori}
                    data={data}
                    setData={setData}
                    onSubmit={handleSubmit}
                    processing={processing}
                    errors={errors}
                    thumbnail={thumbnail}
                    setThumbnail={setThumbnail}
                />
            </main>
        </Dasbor>
    );
}
