interface Survei {
    nama_survei: string;
    edit_url: string;
    acara_url: string;
}

export interface SurveiListProps {
    survei: Survei[];
}