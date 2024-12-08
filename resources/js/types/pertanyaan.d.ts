export interface Pertanyaan {
    id?: number;
    pertanyaan: string;
    tipe_pertanyaan: string;
    wajib: boolean;
    jawaban: Jawaban[];
}