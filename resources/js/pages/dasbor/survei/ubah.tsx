import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { FormSurveiList } from "@/components/dasbor/survei/formSurveiList";
import Dasbor from "@/layouts/dasbor";
import { Button } from "@/components/ui/button";
import { router, useForm, usePage } from "@inertiajs/react";
import { LabelAndInput } from "@/components/dasbor/labelAndInput";
import { toast } from "sonner";

export default function Component() {
    const { survei, pertanyaan } = usePage().props as unknown as {
        survei: { id: number; nama_survei: string };
        pertanyaan: {
            pertanyaan: string;
            tipe_pertanyaan: string;
            wajib: boolean;
            jawaban: { id: number; jawaban: string }[];
        }[];
    };

    const { data, setData, put, processing } = useForm({
        nama_survei: survei.nama_survei,
        pertanyaan,
    });

    const handleAddPertanyaan = () => {
        setData("pertanyaan", [
            ...data.pertanyaan,
            {
                pertanyaan: "",
                tipe_pertanyaan: "text",
                wajib: false,
                jawaban: [],
            },
        ]);
    };

    const handleSave = () => {
        put(route("survei.update", { id: survei.id }), {
            onSuccess: () =>
                toast("Survei berhasil diperbarui.", {
                    description: new Date().toLocaleString(),
                    action: {
                        label: "Kembali",
                        onClick: () => router.visit(route("survei.index")),
                    },
                }),
        });
    };

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="EDIT SURVEI" />
                <LabelAndInput
                    id="nama_survei"
                    label="Nama Survei: "
                    type="text"
                    placeholder=""
                    value={data.nama_survei}
                    onChange={(e) => setData("nama_survei", e.target.value)}
                    size="xl"
                    className="font-semibold mb-8"
                    inputClassName="w-6/12"
                />
                <FormSurveiList
                    pertanyaan={data.pertanyaan}
                    setData={setData}
                />
                <div className="inline-flex flex-col gap-y-12 mt-8">
                    <Button
                        variant="link"
                        size="link"
                        className="text-xl mt-2 mb-8"
                        onClick={handleAddPertanyaan}
                    >
                        + Pertanyaan
                    </Button>
                    <Button onClick={handleSave} disabled={processing}>
                        {processing ? "Menyimpan..." : "Simpan"}
                    </Button>
                </div>
            </main>
        </Dasbor>
    );
}
