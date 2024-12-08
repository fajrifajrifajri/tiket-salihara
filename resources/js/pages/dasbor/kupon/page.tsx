import { useForm } from "@inertiajs/react";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";
import { DataTable } from "@/components/dasbor/dataTable";
import { columns, KuponType } from "./columns";
import { AcaraSelectList } from "@/types/acara";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LabelAndInput } from "@/components/dasbor/labelAndInput";
import { LabelAndSelect } from "@/components/dasbor/labelAndSelect";

export default function KuponPage({
    kupon,
    acara,
}: {
    kupon: KuponType[];
    acara: AcaraSelectList[];
}) {
    const [editMode, setEditMode] = useState(false);
    const [editingKupon, setEditingKupon] = useState<number | null>(null);

    // I need id_acara separately because whenever I change the value of id_acara, the form will be reset
    const [idAcara, setIdAcara] = useState("");

    const { data, setData, post, put, reset, errors } = useForm({
        kode_kupon: "",
        id_acara: "",
        potongan: 0,
        kuota: 0,
        kedaluwarsa: null as Date | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // console.log(data);
        data.id_acara = idAcara;

        if (editMode && editingKupon !== null) {
            put(route("kupon.update", editingKupon), {
                onSuccess: () => {
                    reset();
                    setEditMode(false);
                    setEditingKupon(null);
                    setIdAcara("");
                },
            });
        } else {
            post(route("kupon.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (kupon: KuponType) => {
        setEditMode(true);
        setEditingKupon(kupon.id);

        setData({
            kode_kupon: kupon.kode_kupon,
            id_acara: kupon.id_acara || "",
            potongan: kupon.potongan,
            kuota: kupon.kuota,
            kedaluwarsa: new Date(kupon.kedaluwarsa),
        });
        setIdAcara(kupon.id_acara || "");
    };

    const options = acara.map((a) => ({
        value: a.id,
        label: a.nama_acara,
    }));

    return (
        <Dasbor>
            <main className="w-8/12">
                <HeadingDasbor title="KUPON" />
                <DataTable columns={columns({ handleEdit })} data={kupon} />

                <form
                    className="flex flex-col mt-12 p-4 w-6/12 gap-y-4 border border-black rounded-lg"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-y-2">
                        <LabelAndInput
                            id="kode_kupon"
                            label="Kode Kupon"
                            type="text"
                            value={data.kode_kupon}
                            onChange={(e) =>
                                setData("kode_kupon", e.target.value)
                            }
                        />
                        {errors.kode_kupon && (
                            <small className="text-red-500">
                                {errors.kode_kupon}
                            </small>
                        )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <LabelAndSelect
                            id="acara"
                            label="Acara"
                            options={options}
                            value={idAcara}
                            onValueChange={(value) => {
                                setIdAcara(value);
                            }}
                            placeholder="Pilih acara"
                        />
                        {errors.id_acara && (
                            <small className="text-red-500">
                                {errors.id_acara}
                            </small>
                        )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <LabelAndInput
                            id="potongan"
                            label="Potongan"
                            type="number"
                            value={data.potongan}
                            onChange={(e) =>
                                setData("potongan", Number(e.target.value))
                            }
                        />
                        {errors.potongan && (
                            <small className="text-red-500">
                                {errors.potongan}
                            </small>
                        )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <LabelAndInput
                            id="kuota"
                            label="Kuota"
                            type="number"
                            value={data.kuota}
                            onChange={(e) =>
                                setData("kuota", Number(e.target.value))
                            }
                        />
                        {errors.kuota && (
                            <small className="text-red-500">
                                {errors.kuota}
                            </small>
                        )}
                    </div>

                    <div className="grid grid-cols-12">
                        <label className="col-span-3">Kedaluwarsa</label>
                        <Popover>
                            <PopoverTrigger className="col-span-9" asChild>
                                <Button
                                    variant={"link"}
                                    size={"link"}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !data.kedaluwarsa &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {data.kedaluwarsa ? (
                                        format(data.kedaluwarsa, "PPP")
                                    ) : (
                                        <span>Pilih Tanggal</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    onSelect={(date: Date | undefined) =>
                                        setData("kedaluwarsa", date ?? null)
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        {errors.kedaluwarsa && (
                            <small className="col-span-12 text-red-500">
                                {errors.kedaluwarsa}
                            </small>
                        )}
                    </div>

                    <Button className="block w-full mt-4" type="submit">
                        {editMode ? "Ubah" : "Buat"}
                    </Button>
                </form>
            </main>
        </Dasbor>
    );
}
