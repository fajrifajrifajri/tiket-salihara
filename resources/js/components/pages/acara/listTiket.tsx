import React from "react";

interface ListTiketProps {
    acara: string;
    nama: string;
    qty: number;
    harga: number;
}

const ListTiket: React.FC<ListTiketProps> = ({ acara, nama, qty, harga }) => {
    return (
        <div className="grid grid-cols-12 mb-4">
            <div className="col-span-8">
                <div className="font-bold">{acara}</div>
                <div>{nama}</div>
            </div>
            <div className="col-span-1">{qty}</div>
            <div className="col-span-3">Rp. {harga}</div>
        </div>
    );
};

export default ListTiket;
