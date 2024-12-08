interface Kategori {
    id: number;
    nama_kategori: string;
}

export interface KategoriListProps {
    kategori: Kategori[];
}