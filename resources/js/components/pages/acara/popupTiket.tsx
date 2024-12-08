import React, { useState, useEffect } from "react";
import CardTiket from "./cardTiket";
import ListTiket from "./listTiket";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

type PopupTiketProps = {
    acara: any;
    tiketDetail: any;
};

const PopupTiket: React.FC<PopupTiketProps> = ({ acara, tiketDetail }) => {
    const [ringkasan, setRingkasan] = useState([]);
    const [totalHarga, setTotalHarga] = useState(0);
    const label = acara.tipe_acara === "berbayar" ? "Bayar" : "RSVP";

    const calculateTotalHarga = (ringkasan: any[]) => {
        return ringkasan.reduce((total, tiket) => total + tiket.harga, 0);
    };

    const handleSubmit = () => {
        localStorage.setItem("ringkasan", JSON.stringify(ringkasan));
        // console.log("Ringkasan stored:", ringkasan);

        router.visit("/keranjang");
    };

    useEffect(() => {
        setTotalHarga(calculateTotalHarga(ringkasan));
    }, [ringkasan]);

    return (
        <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-12 md:col-span-7">
                <div className="mb-4">
                    <h2>{acara.kategori.nama_kategori}</h2>
                    <h1 className="text-2xl font-bold">{acara.nama_acara}</h1>
                </div>
                <div className="flex flex-col gap-y-4">
                    {tiketDetail.map((tiket, index) => (
                        <CardTiket
                            key={index}
                            id={tiket.id}
                            nama={tiket.nama_tiket}
                            deskripsi={tiket.info_tiket}
                            catatan={tiket.info_tiket}
                            tersedia={tiket.tersedia}
                            harga={tiket.harga}
                            ringkasan={ringkasan}
                            setRingkasan={setRingkasan}
                            setTotalHarga={setTotalHarga}
                        />
                    ))}
                </div>
            </div>

            <div className="col-span-12 md:col-span-5 mt-12">
                <div className="h-auto border border-gray-2 px-8 py-4">
                    <h1 className="mb-6 font-bold">JUMLAH PEMBAYARAN</h1>
                    {ringkasan.map((tiket, index) => (
                        <ListTiket
                            key={index}
                            acara={acara.nama_acara}
                            nama={tiket.nama}
                            qty={tiket.qty}
                            harga={tiket.harga}
                        />
                    ))}
                    <div className="flex justify-between mb-12 font-bold">
                        <div>TOTAL</div>
                        <div>Rp. {totalHarga}</div>
                    </div>

                    <div className="flex justify-between gap-x-8">
                        <Button className="w-full">Kembali</Button>
                        <Button className="w-full" onClick={handleSubmit}>
                            {label}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupTiket;
