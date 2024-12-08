import { HapusButton } from "../CRUDButtons";
import { EditSurveiListProps } from "@/types/survei";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Checkbox from "../../input/checkbox";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../../ui/select";

export const FormSurveiList: React.FC<EditSurveiListProps> = ({
    pertanyaan,
    setData,
}) => {
    const updatePertanyaan = (
        index: number,
        field: keyof (typeof pertanyaan)[number],
        value: any
    ) => {
        const updated = [...pertanyaan];
        updated[index][field] = value;
        setData("pertanyaan", updated);
    };

    const addJawaban = (index: number) => {
        const updated = [...pertanyaan];
        updated[index].jawaban.push({ jawaban: "" });
        setData("pertanyaan", updated);
    };

    const updateJawaban = (
        pertanyaanIndex: number,
        jawabanIndex: number,
        value: string
    ) => {
        const updated = [...pertanyaan];
        updated[pertanyaanIndex].jawaban[jawabanIndex].jawaban = value;
        setData("pertanyaan", updated);
    };

    const removeJawaban = (pertanyaanIndex: number, jawabanIndex: number) => {
        const updated = [...pertanyaan];
        updated[pertanyaanIndex].jawaban.splice(jawabanIndex, 1);
        setData("pertanyaan", updated);
    };

    const removePertanyaan = (index: number) => {
        const updated = [...pertanyaan];
        updated.splice(index, 1);
        setData("pertanyaan", updated);
    };

    return (
        <>
            {pertanyaan.map((val, index) => (
                <div key={index} className="flex flex-col gap-y-3 w-8/12 mb-8">
                    <h3 className="flex items-center gap-x-2 text-lg">
                        <span>
                            {index + 1}
                            {")"}
                        </span>
                        <Input
                            type="text"
                            value={val.pertanyaan}
                            className="grow border-b"
                            onChange={(e) =>
                                updatePertanyaan(
                                    index,
                                    "pertanyaan",
                                    e.target.value
                                )
                            }
                            placeholder="Masukkan pertanyaan"
                        />
                        <Select
                            value={val.tipe_pertanyaan}
                            onValueChange={(value) =>
                                updatePertanyaan(
                                    index,
                                    "tipe_pertanyaan",
                                    value
                                )
                            }
                        >
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="checkbox">
                                    Checkbox
                                </SelectItem>
                                <SelectItem value="radio">Radio</SelectItem>
                            </SelectContent>
                        </Select>
                        <Checkbox
                            label="Wajib?"
                            checked={!!val.wajib}
                            labelClassName="flex items-center gap-x-2 rounded-full"
                            inputClassName="rounded-full"
                            onChange={(checked) =>
                                setData(
                                    "pertanyaan",
                                    pertanyaan.map((pert, i) =>
                                        i === index
                                            ? { ...pert, wajib: checked }
                                            : pert
                                    )
                                )
                            }
                        />
                        <HapusButton onClick={() => removePertanyaan(index)} />
                    </h3>
                    {val.tipe_pertanyaan !== "text" &&
                        val.jawaban.map(
                            (jawaban: any, jawabanIndex: number) => (
                                <div
                                    key={jawabanIndex}
                                    className="flex items-center gap-x-2"
                                >
                                    <Input
                                        type="text"
                                        className="border-b w-full"
                                        value={jawaban.jawaban}
                                        onChange={(e) =>
                                            updateJawaban(
                                                index,
                                                jawabanIndex,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Masukkan jawaban"
                                    />
                                    <div className="inline-flex">
                                        <HapusButton
                                            onClick={() =>
                                                removeJawaban(
                                                    index,
                                                    jawabanIndex
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    {val.tipe_pertanyaan !== "text" && (
                        <Button
                            variant="link"
                            onClick={() => addJawaban(index)}
                        >
                            Tambah Pilihan +
                        </Button>
                    )}
                </div>
            ))}
        </>
    );
};
