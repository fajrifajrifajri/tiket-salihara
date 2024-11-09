import React from "react";
import CardTiket from "./cardTiket";
import ListTiket from "./listTiket";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const acara = "Common Sanctum";

const tiketData = [
    {
        nama: "Tiket Konser",
        deskripsi: "Hari Senin dan libur nasional pameran ditutup.",
        tersedia: 12,
    },
    {
        nama: "Tiket Teater",
        deskripsi: "Hari Senin dan libur nasional pameran ditutup.",
        tersedia: 48,
    },
    {
        nama: "Tiket Pameran",
        deskripsi: "Hari Senin dan libur nasional pameran ditutup.",
        catatan: "Tiket sudah tidak tersedia. Silakan hubungi Admin.",
        tersedia: 0,
    },
];
const tiketTotal = [
    {
        nama: "Tiket Early Bird",
        qty: 2,
        harga: 100000,
    },
    {
        nama: "Tiket Umum",
        qty: 1,
        harga: 50000,
    },
];
const rsvpData = [
    {
        nama: "RSVP Kotak Teka-Teki",
        deskripsi: "",
        catatan: "",
        tersedia: 4,
    },
];
const rsvpTotal = [
    {
        nama: "RSVP Kotak Teka-Teki",
        qty: 2,
        harga: 0,
    },
];

const totalHargaTiket = tiketTotal.reduce(
    (acc, tiket) => acc + tiket.qty * tiket.harga,
    0
);

type PopupTiketProps = {
    type: "Tiket" | "RSVP"; // Define the type prop to determine behavior
};

const PopupTiket: React.FC<PopupTiketProps> = ({ type }) => {
    // Determine label and href based on the type
    const isTiket = type === "Tiket";
    const label = isTiket ? "Bayar" : "RSVP";
    const href = isTiket ? "/keranjang" : "/pembayaran-rsvp";
    const data = isTiket ? tiketData : rsvpData;
    const total = isTiket ? tiketTotal : rsvpTotal;
    const totalHarga = isTiket ? totalHargaTiket : 0;

    return (
        <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-12 md:col-span-7">
                <div className="mb-4">
                    <h2>PAMERAN</h2>
                    <h1 className="text-2xl font-bold">Common Sanctum</h1>
                </div>
                <div className="flex flex-col gap-y-4">
                    {data.map((tiket, index) => (
                        <CardTiket
                            key={index}
                            nama={tiket.nama}
                            deskripsi={tiket.deskripsi}
                            catatan={tiket.catatan}
                            tersedia={tiket.tersedia}
                        />
                    ))}
                </div>
            </div>

            <div className="col-span-12 md:col-span-5 mt-12">
                <div className="h-auto border border-gray-2 px-8 py-4">
                    <h1 className="mb-6 font-bold">JUMLAH PEMBAYARAN</h1>
                    {total.map((tiket, index) => (
                        <ListTiket
                            key={index}
                            acara={acara}
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
                        <Link className="w-full" href={href}>
                            <Button className="w-full">{label}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupTiket;
