import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { FormSurveiList } from "@/components/dasbor/survei/formSurveiList";
import Dasbor from "@/layouts/dasbor";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { SurveiForm } from "@/types/survei";
import { LabelAndInput } from "@/components/dasbor/labelAndInput";

export default function Component() {
    const { data, setData, post } = useForm<SurveiForm>({
        nama_survei: "",
        pertanyaan: [],
    });

    const handlePertanyaan = () => {
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
        post(route("survei.store"), {
            preserveScroll: true,
            onError: (e) => {
                console.log(e);
            },
        });
    };

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="BUAT SURVEI" />
                <LabelAndInput
                    id="nama_survei"
                    label="Nama Survei: "
                    type="text"
                    placeholder=""
                    value={data.nama_survei}
                    onChange={(e) => setData("nama_survei", e.target.value)}
                    size="xl"
                    className="flex font-semibold mb-8"
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
                        className="text-xl"
                        onClick={handlePertanyaan}
                    >
                        + Pertanyaan
                    </Button>
                    <Button onClick={handleSave}>Simpan</Button>
                </div>
            </main>
        </Dasbor>
    );
}
