import QuantityInput from "@/components/input/quantity";
import React, { useState } from "react";

interface CardTiketProps {
    nama: string;
    deskripsi: string;
    catatan: string | undefined;
    tersedia: number;
}

const CardTiket: React.FC<CardTiketProps> = ({
    nama,
    deskripsi,
    catatan,
    tersedia,
}) => {
    const [quantity, setQuantity] = useState(0);

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
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
