import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { LabelAndSelect } from "./labelAndSelect";
import Donasi from "../pages/checkout/donasi";
import { DataTable } from "./dataTable";
import { orderFormColumns } from "./orderFormColumns";
import { router } from "@inertiajs/react";
import { Pertanyaan } from "@/types/pertanyaan";
import { LabelAndInput } from "./labelAndInput";

interface TiketDetail {
    id: number;
    id_acara: number;
    nama_tiket: string;
    tipe_tiket: string;
    harga: number;
    acara: {
        nama_acara: string;
    };
}

interface Kupon {
    id: string;
    kode_kupon: string;
    potongan: number;
    kuota: number;
}

interface OrderFormProps {
    tiketDetails: TiketDetail[];
    kupon: Kupon[];
    currSelectedTiketID: number | null;
    setCurrSelectedTiketID: (id: number | null) => void;
    data: {
        selected_kupon: Kupon;
        status: string;
        total_bayar: number;
        selected_tiket_list: TiketDetail[];
        donasi: number;
        jawaban: Record<number, string>;
        pertanyaanList: Pertanyaan[];
        survei: {
            nama: string;
            email: string;
            whatsapp: string;
        };
    };
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
    tiketDetails,
    kupon,
    data,
    setData,
    pertanyaanList,
    handleSubmit,
    currSelectedTiketID,
    setCurrSelectedTiketID,
}) => {
    const handleAddTiket = () => {
        const tiketDetail = tiketDetails.find(
            (tiket) => tiket.id == parseInt(currSelectedTiketID)
        );
        if (tiketDetail) {
            const updatedTiketList = [...data.selected_tiket_list, tiketDetail];
            setData("selected_tiket_list", updatedTiketList);

            const idAcaraList = updatedTiketList
                .map((tiket) => tiket.id_acara)
                .filter((id, index, self) => self.indexOf(id) === index);

            console.log(idAcaraList);

            router.visit("/dasbor/order/buat", {
                only: ["pertanyaanList"],
                data: {
                    idAcaraList: idAcaraList,
                },
                preserveState: true,
                onSuccess: (page) => {
                    //setData("pertanyaanList", pertanyaanList);
                    console.log("Pertanyaan:", pertanyaanList);
                },
                onError: (errors) => {
                    console.error("Error fetching pertanyaan:", errors);
                },
            });
        }
    };

    const handleDeleteTiket = (id: number) => {
        setData(
            "selected_tiket_list",
            data.selected_tiket_list.filter((tiket) => tiket.id !== id)
        );
    };

    const groupedTiketList = useMemo(() => {
        return data.selected_tiket_list.reduce((acc, tiket) => {
            const existing = acc.find((item) => item.id === tiket.id);
            if (existing) {
                existing.jumlah += 1;
                existing.total += Number(tiket.harga);
            } else {
                acc.push({ ...tiket, jumlah: 1, total: Number(tiket.harga) });
            }
            return acc;
        }, [] as (TiketDetail & { jumlah: number; total: number })[]);
    }, [data.selected_tiket_list]);

    const calculateTotal = () => {
        const subtotal = groupedTiketList.reduce(
            (sum, tiket) => sum + Number(tiket.harga) * Number(tiket.jumlah),
            0
        );
        const total =
            subtotal - Number(data.selected_kupon.potongan) + data.donasi;
        setData("total_bayar", total);
    };

    useEffect(() => {
        calculateTotal();
    }, [groupedTiketList, data.selected_kupon, data.donasi]);

    useEffect(() => {
        setData("survei", {
            ...data.survei,
            pertanyaan: pertanyaanList,
        });
    }, [pertanyaanList]);

    console.log(data);

    return (
        <div className="w-3/4">
            <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-12 space-y-6 border p-6">
                    <h2 className="col-span-12 text-3xl font-semibold">
                        Tiket
                    </h2>
                    <div className="col-span-12">
                        <DataTable
                            columns={orderFormColumns({ handleDeleteTiket })}
                            data={groupedTiketList}
                        />
                        <div className="col-span-12 text-right mt-4">
                            <span className="font-bold">Kupon Potongan: </span>
                            <span>{data.selected_kupon.potongan}</span>
                        </div>
                        <div className="col-span-12 text-right mt-4">
                            <span className="font-bold">Donasi: </span>
                            <span>{data.donasi}</span>
                        </div>
                        <div className="col-span-12 text-right mt-4">
                            <span className="font-bold">Total: </span>
                            <span>{data.total_bayar}</span>
                        </div>
                    </div>
                    <LabelAndSelect
                        label="Pilih Tiket"
                        id="pilih-tiket"
                        value={currSelectedTiketID}
                        onValueChange={(value) => setCurrSelectedTiketID(value)}
                        options={tiketDetails.map((t) => ({
                            value: t.id.toString(),
                            label: t.acara.nama_acara + " - " + t.nama_tiket,
                        }))}
                        className="col-span-12"
                    />
                    <Button
                        type="button"
                        onClick={handleAddTiket}
                        className="col-span-12"
                    >
                        Tambah Tiket
                    </Button>

                    <LabelAndSelect
                        label="Status"
                        id="status"
                        value={data.status}
                        onValueChange={(value) => setData("status", value)}
                        options={[
                            { value: "pending", label: "Pending" },
                            { value: "sukses", label: "Sukses" },
                            { value: "gagal", label: "Gagal" },
                        ]}
                        className="col-span-12"
                    />

                    <LabelAndSelect
                        label="Pilih Kupon"
                        id="pilih-kupon"
                        value={data.selected_kupon.id}
                        onValueChange={(id) => {
                            const matchedKupon = kupon.find((k) => k.id == id);
                            if (matchedKupon) {
                                setData("selected_kupon", matchedKupon);
                            }
                        }}
                        options={kupon.map((k) => ({
                            value: k.id.toString(),
                            label:
                                k.kode_kupon +
                                " - " +
                                k.potongan +
                                " - " +
                                k.kuota,
                        }))}
                        className="col-span-12"
                    />

                    <div className="col-span-12">
                        <Donasi
                            onDonationChange={(amount) =>
                                setData("donasi", amount)
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 space-y-6 border p-6">
                    <h2 className="col-span-12 text-3xl font-semibold">
                        Survei
                    </h2>
                    <LabelAndInput
                        label="Nama"
                        id="nama"
                        onChange={(e) =>
                            setData("survei", {
                                ...data.survei,
                                nama: e.target.value,
                            })
                        }
                        className="col-span-12"
                    />

                    <LabelAndInput
                        label="Email"
                        id="email"
                        onChange={(e) =>
                            setData("survei", {
                                ...data.survei,
                                email: e.target.value,
                            })
                        }
                        className="col-span-12"
                    />

                    <LabelAndInput
                        label="No. HP Whatsapp"
                        id="whatsapp"
                        onChange={(e) =>
                            setData("survei", {
                                ...data.survei,
                                whatsapp: e.target.value,
                            })
                        }
                        className="col-span-12"
                    />

                    <div className="col-span-12">
                        {Object.entries(pertanyaanList).map(
                            ([acaraId, { acara, pertanyaan }]) => (
                                <div key={acaraId} className="col-span-12 mb-4">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {acara.nama_acara}
                                    </h3>
                                    {pertanyaan.map((pertanyaanItem) => (
                                        <div
                                            key={pertanyaanItem.id}
                                            className="col-span-12 mb-4"
                                        >
                                            <label className="block font-medium text-gray-700">
                                                {pertanyaanItem.pertanyaan}
                                                {pertanyaanItem.wajib === 1 && (
                                                    <span className="text-red-500 ml-1">
                                                        *
                                                    </span>
                                                )}
                                            </label>
                                            {pertanyaanItem.tipe_pertanyaan ===
                                                "text" && (
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                    required={
                                                        pertanyaanItem.wajib ===
                                                        1
                                                    }
                                                    onChange={(e) =>
                                                        setData("survei", {
                                                            ...data.survei,
                                                            jawaban_pengunjung:
                                                                {
                                                                    ...data
                                                                        .survei
                                                                        .jawaban_pengunjung,
                                                                    [pertanyaanItem.id]:
                                                                        {
                                                                            jawaban:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            tipe_pertanyaan:
                                                                                pertanyaanItem.tipe_pertanyaan,
                                                                        },
                                                                },
                                                        })
                                                    }
                                                />
                                            )}
                                            {pertanyaanItem.tipe_pertanyaan ===
                                                "checkbox" &&
                                                pertanyaanItem.jawabanList.map(
                                                    (jawaban) => (
                                                        <div
                                                            key={jawaban.id}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={`checkbox-${jawaban.id}`}
                                                                className="mr-2"
                                                                required={
                                                                    pertanyaanItem.wajib ===
                                                                    1
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const isChecked =
                                                                        e.target
                                                                            .checked;
                                                                    setData(
                                                                        "survei",
                                                                        {
                                                                            ...data.survei,
                                                                            jawaban_pengunjung:
                                                                                {
                                                                                    ...data
                                                                                        .survei
                                                                                        .jawaban_pengunjung,
                                                                                    [jawaban.id]:
                                                                                        {
                                                                                            jawaban:
                                                                                                isChecked,
                                                                                            tipe_pertanyaan:
                                                                                                pertanyaanItem.tipe_pertanyaan,
                                                                                        },
                                                                                },
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={`checkbox-${jawaban.id}`}
                                                                className="text-gray-700"
                                                            >
                                                                {
                                                                    jawaban.jawaban
                                                                }
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            {pertanyaanItem.tipe_pertanyaan ===
                                                "radio" && (
                                                <LabelAndSelect
                                                    label={
                                                        pertanyaanItem.pertanyaan
                                                    }
                                                    id={`radio-${pertanyaanItem.id}`}
                                                    value={
                                                        data.survei
                                                            ?.jawaban_pengunjung?.[
                                                            pertanyaanItem.id
                                                        ].jawaban || ""
                                                    }
                                                    onValueChange={(value) =>
                                                        setData("survei", {
                                                            ...data.survei,
                                                            jawaban_pengunjung:
                                                                {
                                                                    ...data
                                                                        .survei
                                                                        .jawaban_pengunjung,
                                                                    [pertanyaanItem.id]:
                                                                        {
                                                                            jawaban:
                                                                                value,
                                                                            tipe_pertanyaan:
                                                                                pertanyaanItem.tipe_pertanyaan,
                                                                        },
                                                                },
                                                        })
                                                    }
                                                    options={pertanyaanItem.jawabanList.map(
                                                        (jawaban) => ({
                                                            value: jawaban.id,
                                                            label: jawaban.jawaban,
                                                        })
                                                    )}
                                                    required={
                                                        pertanyaanItem.wajib ===
                                                        1
                                                    }
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Buat Order
                </Button>
            </form>
        </div>
    );
};
