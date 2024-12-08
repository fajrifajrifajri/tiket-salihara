export interface SurveiForm {
    nama_survei: string;
    pertanyaan: Pertanyaan[];
}

export interface EditSurveiListProps {
    pertanyaan: Pertanyaan[];
    setData: Function;
}