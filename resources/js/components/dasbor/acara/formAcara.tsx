import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../dataTable";
import TiketForm from "../tiketForm";
import AccordionRow from "./accordionRow";
import { Switch } from "@/components/ui/switch";
import TipTapEditor from "../editor/tipTapEditor";
import { columnsTiket } from "@/pages/dasbor/acara/columns";
import { LabelAndSelect } from "../labelAndSelect";
import { LabelAndInput } from "../labelAndInput";
import { LabelAndFile } from "../labelAndFile";
import { LabelAndDateTime } from "../labelAndDateTime";
import { Kategori } from "@/types/kategori";
import { Survei } from "@/pages/dasbor/survei/survei";
import { FormData, TiketDetail } from "@/pages/dasbor/acara/buat";

interface FormAcaraProps {
    data: FormData;
    setData: (key: string, value: any) => void;
    survei: Survei[];
    kategori: Kategori[];
    isEdit?: boolean;
    onSubmit: (data: FormData) => void;
    processing: boolean;
    errors: any;
    thumbnail: File | null;
    setThumbnail: (file: File | null) => void;
}

export const FormAcara = ({
    data,
    setData,
    survei,
    kategori,
    isEdit = false,
    onSubmit,
    processing,
    errors,
    thumbnail,
    setThumbnail,
}: FormAcaraProps) => {
    const [selectedTiketIndex, setSelectedTiketIndex] = useState<number | null>(
        null
    );

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Inertia bug
            // setData("thumbnail", file);
            setThumbnail(file);
            setData("thumbnail_preview", URL.createObjectURL(file));
        }
    };

    const handleAccordionChange = (
        index: number,
        key: "judul_akordeon" | "deskripsi_akordeon",
        value: string
    ) => {
        const updatedAccordion = [...data.accordion];
        updatedAccordion[index][key] = value;
        setData("accordion", updatedAccordion);
    };

    const handleAddAccordion = () => {
        setData("accordion", [
            ...data.accordion,
            { judul_akordeon: "", deskripsi_akordeon: "" },
        ]);
    };

    const handleDeleteAccordion = (index: number) => {
        const updatedAccordion = [...data.accordion];
        updatedAccordion.splice(index, 1);
        setData("accordion", updatedAccordion);
    };

    const handleAddTiket = (tiketData: TiketDetail) => {
        if (selectedTiketIndex !== null) {
            const updatedTikets = [...data.tiket_detail];
            updatedTikets[selectedTiketIndex] = tiketData;
            setData("tiket_detail", updatedTikets);
            setSelectedTiketIndex(null);
        } else {
            setData("tiket_detail", [...data.tiket_detail, tiketData]);
        }
    };

    const handleUpdateTiket = (tiketData: TiketDetail) => {
        const index = data.tiket_detail.findIndex(
            (tiket) => tiket.id === tiketData.id
        );

        if (index !== -1) {
            setSelectedTiketIndex(index);
        }
    };

    const handleDeleteTiket = (id: number) => {
        setData(
            "tiket_detail",
            data.tiket_detail.filter((tiket) => tiket.id !== id)
        );
    };

    return (
        <div className="grid grid-cols-12 w-3/4 gap-x-12 gap-y-8 mb-20 pr-64">
            <div className="col-span-12 flex flex-col gap-y-2">
                <LabelAndSelect
                    id="kategori"
                    label="Kategori: "
                    value={data.id_kategori?.toString()}
                    options={kategori.map((item) => ({
                        label: item.nama_kategori,
                        value: item.id?.toString() || "",
                    }))}
                    onValueChange={(value) =>
                        setData("id_kategori", parseInt(value) || null)
                    }
                />
                {errors.id_kategori && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.id_kategori}
                    </p>
                )}
            </div>

            <div className="col-span-12 flex flex-col gap-y-2">
                <LabelAndInput
                    id="nama_acara"
                    label="Judul: "
                    value={data.nama_acara}
                    onChange={(e) => setData("nama_acara", e.target.value)}
                />
                {errors.nama_acara && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.nama_acara}
                    </p>
                )}
            </div>

            <div className="col-span-12 flex flex-col gap-y-2">
                <LabelAndFile
                    id="thumbnail"
                    label="Gambar: "
                    preview={data.thumbnail_preview}
                    onChange={handleThumbnailChange}
                    error={errors.thumbnail}
                />
            </div>

            <div className="col-span-3">Info:</div>
            <div className="col-span-9">
                <TipTapEditor
                    teks={data.info}
                    setTeks={(content) => setData("info", content)}
                />
                {errors.info && (
                    <p className="text-sm text-red-500 mt-1">{errors.info}</p>
                )}
            </div>

            <div className="col-span-3">Akordeon:</div>
            <div className="col-span-9">
                {data.accordion.map((item, index) => (
                    <AccordionRow
                        key={index}
                        judul={item.judul_akordeon}
                        teks={item.deskripsi_akordeon}
                        onJudulChange={(value) =>
                            handleAccordionChange(
                                index,
                                "judul_akordeon",
                                value
                            )
                        }
                        onTeksChange={(value) =>
                            handleAccordionChange(
                                index,
                                "deskripsi_akordeon",
                                value
                            )
                        }
                        onDelete={() => handleDeleteAccordion(index)}
                    />
                ))}
                <Button
                    type="button"
                    onClick={handleAddAccordion}
                    className="mt-4"
                >
                    + Akordeon
                </Button>
            </div>

            <div className="col-span-3">Logo:</div>
            <div className="col-span-9">
                <TipTapEditor
                    teks={data.logo}
                    setTeks={(content) => setData("logo", content)}
                />
                {errors.logo && (
                    <p className="text-sm text-red-500 mt-1">{errors.logo}</p>
                )}
            </div>

            <div className="col-span-12 flex flex-col gap-y-2">
                <LabelAndInput
                    id="tempat_acara"
                    label="Tempat: "
                    value={data.tempat_acara}
                    onChange={(e) => setData("tempat_acara", e.target.value)}
                />
                {errors.tempat_acara && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.tempat_acara}
                    </p>
                )}
            </div>

            <div className="col-span-12 grid grid-cols-12 gap-x-12 gap-y-4">
                <LabelAndDateTime
                    id="tanggal_acara_dari"
                    label="Tanggal Acara Dari:"
                    type="date"
                    value={data.tanggal_acara_dari}
                    onChange={(value) => setData("tanggal_acara_dari", value)}
                    className="col-span-6 flex"
                    error={errors.tanggal_acara_dari}
                />

                <LabelAndDateTime
                    id="tanggal_acara_sampai"
                    label="Tanggal Acara Sampai:"
                    type="date"
                    value={data.tanggal_acara_sampai}
                    onChange={(value) => setData("tanggal_acara_sampai", value)}
                    className="col-span-6 flex"
                    error={errors.tanggal_acara_sampai}
                />
            </div>

            <div className="col-span-12 grid grid-cols-12 gap-x-12 gap-y-4">
                <LabelAndDateTime
                    id="posting_acara_dari"
                    label="Posting Acara Dari:"
                    type="datetime-local"
                    value={data.posting_acara_dari}
                    onChange={(value) => setData("posting_acara_dari", value)}
                    className="col-span-6 flex"
                    error={errors.posting_acara_dari}
                />

                <LabelAndDateTime
                    id="posting_acara_sampai"
                    label="Posting Acara Sampai:"
                    type="datetime-local"
                    value={data.posting_acara_sampai}
                    onChange={(value) => setData("posting_acara_sampai", value)}
                    className="col-span-6 flex"
                    error={errors.posting_acara_sampai}
                />
            </div>

            <div className="col-span-12 bg-gray-4 p-2 text-center font-semibold">
                TIKET
            </div>
            <div className="col-span-12">
                <DataTable
                    columns={columnsTiket(handleUpdateTiket, handleDeleteTiket)}
                    data={data.tiket_detail}
                />
            </div>

            <div className="col-span-12">
                <h3 className="text-lg font-semibold mb-4">Tiket Baru</h3>
                <TiketForm
                    onSubmit={handleAddTiket}
                    tiketData={
                        selectedTiketIndex !== null
                            ? data.tiket_detail[selectedTiketIndex]
                            : null
                    }
                />
                {errors.tiket_detail && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.tiket_detail}
                    </p>
                )}
                <div className="mt-4"></div>
            </div>

            <div className="col-span-12 bg-gray-4 p-2 text-center font-semibold">
                PENGATURAN TAMBAHAN
            </div>

            <div className="col-span-12 flex flex-col gap-y-2">
                <LabelAndSelect
                    id="survei"
                    label="Survei: "
                    value={data.id_survei?.toString()}
                    options={survei.map((item) => ({
                        label: item.nama_survei,
                        value: item.id?.toString() || "",
                    }))}
                    onValueChange={(value) =>
                        setData({
                            ...data,
                            id_survei: parseInt(value) || null,
                        })
                    }
                />
                {errors.id_survei && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.id_survei}
                    </p>
                )}
            </div>

            <div className="col-span-12 bg-gray-4 p-2 text-center font-semibold">
                SYARAT DAN KETENTUAN ACARA INI
            </div>
            <div className="col-span-12">
                <TipTapEditor
                    teks={data.syarat_dan_ketentuan}
                    setTeks={(content) =>
                        setData("syarat_dan_ketentuan", content)
                    }
                />
                {errors.syarat_dan_ketentuan && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.syarat_dan_ketentuan}
                    </p>
                )}
            </div>

            <div className="col-span-1">Publish:</div>
            <div className="col-span-11">
                <Switch
                    checked={data.publish}
                    onCheckedChange={(checked) => setData("publish", checked)}
                />
                {errors.publish && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.publish}
                    </p>
                )}
            </div>

            <div className="col-span-12 mt-6">
                <Button
                    onClick={() => onSubmit(data)}
                    disabled={processing}
                    className="w-full"
                >
                    {processing ? "Menyimpan..." : "Simpan"}
                </Button>
            </div>
        </div>
    );
};
