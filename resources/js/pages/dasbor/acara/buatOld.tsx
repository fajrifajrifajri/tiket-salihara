import { useForm, router, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dasbor from "@/layouts/dasbor";
import { Switch } from "@/components/ui/switch";
import TipTapEditor from "@/components/dasbor/editor/tipTapEditor";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import AccordionRow from "@/components/dasbor/acara/accordionRow";
import { Kategori } from "@/types/kategori";
import TiketForm from "@/components/dasbor/tiketForm";
import { DataTable } from "@/components/dasbor/dataTable";
import { columnsTiket } from "./columns";
import { useState } from "react";

interface FormData {
    id_kategori: number | null;
    id_survei: number | null;
    nama_acara: string;
    thumbnail: File | null;
    thumbnail_preview: string;
    info: string;
    logo: string;
    logo_preview: string;
    tanggal_acara_dari: string;
    tanggal_acara_sampai: string;
    posting_acara_dari: string;
    posting_acara_sampai: string;
    pajak: number;
    syarat_dan_ketentuan: string;
    publish: boolean;
    accordion: { judul_akordeon: string; deskripsi_akordeon: string }[];
    tiket_detail: {
        nama_tiket: string;
        kapasitas: number;
        harga_tiket: number;
        info_tiket: string;
        maksimal_per_transaksi: number;
        tanggal_mulai: string;
        tanggal_berakhir: string;
    }[];
}

interface Survei {
    id: number;
    nama_survei: string;
}

export default function Component() {
    const { survei, kategori } = usePage().props as unknown as {
        survei: Survei[];
        kategori: Kategori[];
    };
    const { data, setData, post, processing } = useForm<FormData>({
        id_kategori: null,
        id_survei: null,
        nama_acara: "",
        thumbnail: null,
        thumbnail_preview: "",
        info: "",
        logo: "",
        logo_preview: "",
        tanggal_acara_dari: "",
        tanggal_acara_sampai: "",
        posting_acara_dari: "",
        posting_acara_sampai: "",
        pajak: 10,
        syarat_dan_ketentuan: "",
        publish: false,
        accordion: [{ judul_akordeon: "", deskripsi_akordeon: "" }],
        tiket_detail: [],
    });
    const [selectedTiketIndex, setSelectedTiketIndex] = useState<number | null>(
        null
    );

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData({
                ...data,
                thumbnail: file,
                thumbnail_preview: URL.createObjectURL(file),
            });
        }
    };

    const handleAccordionChange = (
        index: number,
        key: "judul_akordeon" | "deskripsi_akordeon",
        value: string
    ) => {
        const updatedAccordion = [...data.accordion];
        updatedAccordion[index][key] = value;
        setData({ ...data, accordion: updatedAccordion });
    };

    const handleAddAccordion = () => {
        setData({
            ...data,
            accordion: [
                ...data.accordion,
                { judul_akordeon: "", deskripsi_akordeon: "" },
            ],
        });
    };

    const handleDeleteAccordion = (index: number) => {
        const updatedAccordion = [...data.accordion];
        updatedAccordion.splice(index, 1);
        setData({ ...data, accordion: updatedAccordion });
    };

    const handleSubmit = () => {
        console.log(data);

        post("/dasbor/acara", {
            preserveScroll: true,
            onError: (error) => {
                console.log(error);
            },
        });
    };

    const handleAddTiket = (tiketData: TiketDetail) => {
        if (selectedTiketIndex !== null) {
            // Update existing tiket
            const updatedTikets = [...data.tiket_detail];
            updatedTikets[selectedTiketIndex] = tiketData;
            setData({ ...data, tiket_detail: updatedTikets });
            setSelectedTiketIndex(null); // Reset selected index
        } else {
            // Add new tiket
            setData({
                ...data,
                tiket_detail: [...data.tiket_detail, tiketData],
            });
        }
    };

    const handleUpdateTiket = (tiketData: TiketDetail) => {
        // Find the index of the tiket to update
        const index = data.tiket_detail.findIndex(
            (tiket) => tiket.id === tiketData.id
        );
        if (index !== -1) {
            setSelectedTiketIndex(index);
        }
    };

    const handleDeleteTiket = (id: number) => {
        setData({
            ...data,
            tiket_detail: data.tiket_detail.filter((tiket) => tiket.id !== id),
        });
    };

    console.log(data);

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="ACARA BARU" />
                <div className="grid grid-cols-12 gap-x-12 gap-y-4 mb-20 pr-64">
                    <div className="col-span-1">Kategori:</div>
                    <div className="col-span-11">
                        <Select
                            onValueChange={(value) =>
                                setData({
                                    ...data,
                                    id_kategori: parseInt(value) || null,
                                })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih acara" />
                            </SelectTrigger>
                            <SelectContent>
                                {kategori?.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.id?.toString()}
                                    >
                                        {item.nama_kategori}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="col-span-1">Judul:</div>
                    <div className="col-span-11">
                        <Input
                            type="text"
                            placeholder="Common Sanctum"
                            value={data.nama_acara}
                            onChange={(e) =>
                                setData({ ...data, nama_acara: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-span-1">Gambar:</div>
                    <div className="col-span-11">
                        <Input
                            type="file"
                            className="w-auto mb-4"
                            onChange={handleThumbnailChange}
                        />
                        {data.thumbnail_preview && (
                            <img
                                src={data.thumbnail_preview}
                                alt="Preview"
                                width={295}
                                height={295}
                            />
                        )}
                    </div>
                    <div className="col-span-1">Info:</div>
                    <div className="col-span-11">
                        <TipTapEditor
                            teks={data.info}
                            setTeks={(teks) => setData({ ...data, info: teks })}
                        />
                    </div>

                    <div className="col-span-1">Accordion:</div>
                    <div className="col-span-11">
                        {data.accordion.map((accordion, index) => (
                            <AccordionRow
                                key={index}
                                title={accordion.judul_akordeon}
                                teks={accordion.deskripsi_akordeon}
                                onTitleChange={(title: string) =>
                                    handleAccordionChange(
                                        index,
                                        "judul_akordeon",
                                        title
                                    )
                                }
                                onTeksChange={(teks: string) =>
                                    handleAccordionChange(
                                        index,
                                        "deskripsi_akordeon",
                                        teks
                                    )
                                }
                                onDelete={() => handleDeleteAccordion(index)}
                            />
                        ))}
                        <Button
                            onClick={handleAddAccordion}
                            variant="outline"
                            className="w-full"
                        >
                            + ACCORDION
                        </Button>
                    </div>

                    <div className="col-span-1">Logo:</div>
                    <div className="col-span-11">
                        <TipTapEditor
                            teks={data.logo}
                            setTeks={(teks) => setData({ ...data, logo: teks })}
                        />
                    </div>

                    <div className="col-span-1">Pajak:</div>
                    <div className="col-span-11">
                        <Input
                            type="number"
                            value={data.pajak}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    pajak: parseInt(e.target.value),
                                })
                            }
                        />
                    </div>
                    <div className="col-span-1">Tanggal Acara:</div>
                    <div className="col-span-11">
                        <Input
                            type="date"
                            value={data.tanggal_acara_dari}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    tanggal_acara_dari: e.target.value,
                                })
                            }
                        />
                        <Input
                            type="date"
                            value={data.tanggal_acara_sampai}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    tanggal_acara_sampai: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-span-1">Posting Acara:</div>
                    <div className="col-span-11">
                        <div className="space-y-2">
                            <label className="text-sm">Dari:</label>
                            <Input
                                type="datetime-local"
                                value={data.posting_acara_dari}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        posting_acara_dari: e.target.value,
                                    })
                                }
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2 mt-4">
                            <label className="text-sm">Sampai:</label>
                            <Input
                                type="datetime-local"
                                value={data.posting_acara_sampai}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        posting_acara_sampai: e.target.value,
                                    })
                                }
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full bg-gray-4 p-2 text-center font-semibold">
                    TIKET
                </div>
                <div className="mb-8">
                    <DataTable
                        columns={columnsTiket(
                            handleUpdateTiket,
                            handleDeleteTiket
                        )}
                        data={data.tiket_detail}
                    />
                </div>

                <TiketForm
                    tiketData={
                        selectedTiketIndex !== null
                            ? data.tiket_detail[selectedTiketIndex]
                            : null
                    }
                    onSubmit={handleAddTiket}
                />

                <div className="w-full bg-gray-4 p-2 text-center font-semibold">
                    PENGATURAN TAMBAHAN
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">Survei:</div>
                    <div className="col-span-11">
                        <Select
                            value={data.id_survei?.toString()}
                            onValueChange={(value) =>
                                setData({
                                    ...data,
                                    id_survei: value ? parseInt(value) : null,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih survei..." />
                            </SelectTrigger>
                            <SelectContent>
                                {survei?.map((survei) => (
                                    <SelectItem
                                        key={survei.id}
                                        value={survei.id.toString()}
                                    >
                                        {survei.nama_survei}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="w-full bg-gray-4 p-2 text-center font-semibold">
                    SYARAT DAN KETENTUAN
                </div>
                <TipTapEditor
                    teks={data.syarat_dan_ketentuan}
                    setTeks={(teks) =>
                        setData({ ...data, syarat_dan_ketentuan: teks })
                    }
                />
                <div className="flex justify-between my-8">
                    <Switch
                        checked={data.publish}
                        onCheckedChange={(checked) =>
                            setData({ ...data, publish: checked })
                        }
                    />
                    <Button onClick={() => router.visit("/preview")}>
                        Preview
                    </Button>
                </div>
                <Button onClick={handleSubmit} disabled={processing}>
                    Simpan
                </Button>
            </main>
        </Dasbor>
    );
}