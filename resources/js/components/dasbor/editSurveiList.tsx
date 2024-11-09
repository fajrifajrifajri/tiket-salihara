import { Asterisk } from "lucide-react";
import { HapusButton, UbahButton } from "./CRUDButtons";

const surveiData = [
    {
        pertanyaan: "Domisili saat mengakses program",
        wajib: true,
        jawabanList: ["Jawaban 1", "Jawaban 2", "Jawaban 3"],
    },
    {
        pertanyaan: "Jenis kelamin",
        wajib: true,
        jawabanList: ["Jawaban 1", "Jawaban 2", "Jawaban 3"],
    },
    {
        pertanyaan: "Usia",
        wajib: true,
        jawabanList: ["Jawaban 1", "Jawaban 2", "Jawaban 3"],
    },
    {
        pertanyaan: "Sumber informasi program",
        wajib: false,
        jawabanList: ["Jawaban 1", "Jawaban 2", "Jawaban 3"],
    },
];

export const EditSurveiList = () => {
    return surveiData.map((val, index) => {
        return (
            <div key={index} className="flex flex-col gap-y-3 w-8/12 mb-12">
                <h3 className="text-lg font-semibold">
                    {val.pertanyaan}
                    <div className="inline-block text-red-500">
                        <Asterisk size={16} />
                    </div>
                    <UbahButton />
                </h3>
                {val.jawabanList.map((jawaban, index) => {
                    return (
                        <div key={index} className="">
                            <span className="inline-block mr-2">{jawaban}</span>
                            <div className="inline-flex">
                                <div>
                                    <UbahButton />
                                </div>
                                <div>
                                    <HapusButton />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    });
};
