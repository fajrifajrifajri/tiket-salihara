import QuantityInput from "@/components/input/quantity";
import React, { useState } from "react";

interface CardTiketProps {
    id: number;
    nama: string;
    deskripsi: string;
    catatan: string | undefined;
    tersedia: number;
    harga: number;
    ringkasan: any[];
    setRingkasan: (value: any) => void;
    setTotalHarga: (value: number) => void;
}

const CardTiket: React.FC<CardTiketProps> = ({
    id,
    nama,
    deskripsi,
    catatan,
    tersedia,
    harga,
    ringkasan,
    setRingkasan,
    setTotalHarga,
}) => {
    const [quantity, setQuantity] = useState(0);

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        if (newQuantity > 0) {
            const existingItemIndex = ringkasan.findIndex(
                (tiket: any) => tiket.nama === nama
            );
            if (existingItemIndex !== -1) {
                const updatedRingkasan = [...ringkasan];
                updatedRingkasan[existingItemIndex].qty = newQuantity;
                updatedRingkasan[existingItemIndex].harga = harga * newQuantity;
                setRingkasan(updatedRingkasan);
            } else {
                setRingkasan([
                    ...ringkasan,
                    { id, nama, qty: newQuantity, harga: harga * newQuantity },
                ]);
            }
        } else {
            setRingkasan(ringkasan.filter((tiket: any) => tiket.nama !== nama));
        }
    };

    return (
        <div className="flex justify-between border border-gray-2 px-4 py-8">
            <div className="flex flex-col gap-y-3">
                <h3 className="mb-2 text-base">Tiket {nama}</h3>
                <small className="text-xs">{deskripsi}</small>
                <small className="text-xs text-red-600">{catatan}</small>
            </div>
            <div>
                {tersedia > 0 ? (
                    <>
                        <QuantityInput
                            quantity={quantity}
                            onChange={handleQuantityChange}
                            max={tersedia}
                        />
                        <div className="mt-2 text-center text-xs">
                            Tersedia:{tersedia}
                        </div>
                    </>
                ) : (
                    <div className="text-red-1">Habis</div>
                )}
            </div>
        </div>
    );
};

export default CardTiket;
