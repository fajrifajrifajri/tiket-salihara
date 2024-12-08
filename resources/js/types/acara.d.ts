export interface Acara {
    id: number;
    id_kategori: number | null;
    id_survei: number | null;
    nama_acara: string;
    thumbnail: string | null;
    info: string | null;
    logo: string | null;
    slug: string;
    tanggal_acara_dari: string | null;
    tanggal_acara_sampai: string | null;
    posting_acara_dari: string | null;
    posting_acara_sampai: string | null;
    publish: boolean;
    created_at: string;
    updated_at: string;
}

interface SurveiAcara {
    nama_acara: string;
    hasil_url: string;
}

interface AcaraSelectList {
    id: string;
    nama_acara: string;
}

export interface SurveiAcaraListProps {
    surveiAcara: SurveiAcara[];
}