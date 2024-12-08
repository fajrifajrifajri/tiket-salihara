import { UbahButton, HapusButton } from "@/components/dasbor/CRUDButtons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TipTapEditor from "../editor/tipTapEditor";

const AccordionRow = ({
    judul,
    teks,
    onJudulChange,
    onTeksChange,
    onDelete,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="mb-4">
            {!isEditing ? (
                <div className="flex w-full justify-between border mb-2 p-2 border-gray-200 rounded">
                    <div className="font-medium">
                        {judul ? (
                            judul
                        ) : (
                            <span className="cursor-default text-gray-500 font-normal">
                                (kosong)
                            </span>
                        )}
                    </div>
                    <div>
                        <UbahButton onClick={() => setIsEditing(true)} />
                        <HapusButton onClick={onDelete} />
                    </div>
                </div>
            ) : (
                <div className="space-y-2 border p-4 rounded">
                    <div>
                        <label className="block text-sm mb-1">
                            Judul Accordion
                        </label>
                        <Input
                            type="text"
                            value={judul}
                            onChange={(e) => onJudulChange(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">
                            Deskripsi Accordion
                        </label>
                        <TipTapEditor teks={teks} setTeks={onTeksChange} />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={() => setIsEditing(false)}
                            variant="dasbor-white"
                            className="mr-2"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={() => setIsEditing(false)}
                            variant="dasbor-black"
                            className="mr-2"
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccordionRow;
