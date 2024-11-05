import React from "react";

interface RingkasanPembelianProps {
    laman?: string;
    type: "Tiket" | "RSVP"; // Add type to the props
}

const kuponDiscount = 10000;

const RingkasanPembelian: React.FC<RingkasanPembelianProps> = ({
    laman,
    type,
}) => {
    const tiketData = [
        {
            acara: "Pameran Common Sanctum",
            tiket: [
                {
                    nama: "Tiket Early Bird",
                    qty: 2,
                    harga: 60000,
                },
                {
                    nama: "Tiket Umum",
                    qty: 1,
                    harga: 50000,
                },
            ],
            pajak: laman === "pembayaran" ? 10000 : 0,
            donasi: laman === "pembayaran" ? 10000 : 0,
        },
    ];

    const rsvpData = [
        {
            acara: "Kotak Teka Teki",
            tiket: [
                {
                    nama: "RSVP Kotak Teka Teki",
                    qty: 2,
                    harga: 0,
                },
            ],
            pajak: 0,
            donasi: laman === "pembayaran" ? 10000 : 0,
        },
    ];

    // Determine the data to use based on the type prop
    const dataToUse = type === "Tiket" ? tiketData : rsvpData;

    // Calculate subtotal
    const subtotal = dataToUse.reduce((total, data) => {
        return (
            total +
            data.tiket.reduce(
                (subTotal, tiket) =>
                    subTotal + (tiket.harga ? tiket.qty * tiket.harga : 0),
                0
            )
        );
    }, 0);

    // Calculate total after applying discount
    const totalHargaTiket =
        type === "Tiket" ? subtotal - kuponDiscount : subtotal;

    // Calculate total payment including tax and donation
    const pajak = dataToUse.reduce((total, data) => total + data.pajak, 0);
    const donasi = dataToUse.reduce((total, data) => total + data.donasi, 0);
    const totalBayar = totalHargaTiket + pajak + donasi;

    return (
        <>
            <table className="w-full mb-4 border border-gray-300 text-base">
                <thead>
                    <tr className="grid grid-cols-12 py-2 px-12 border-b border-gray-300">
                        <th className="col-span-4 text-left">Acara</th>
                        <th className="col-span-3 text-left">Tiket</th>
                        <th className="col-span-2 text-center">Jumlah</th>
                        <th className="col-span-3 text-right">Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {dataToUse.map((data, index) => (
                        <React.Fragment key={index}>
                            {data.tiket.map((tiket, idx) => (
                                <tr
                                    className="grid grid-cols-12 py-4 px-12 mb-4"
                                    key={idx}
                                >
                                    <td className="col-span-4 font-bold">
                                        {data.acara}
                                    </td>
                                    <td className="col-span-3">{tiket.nama}</td>
                                    <td className="col-span-2 text-center">
                                        {tiket.qty}
                                    </td>
                                    <td className="col-span-3 text-right">
                                        Rp
                                        {(
                                            tiket.qty * (tiket.harga || 0)
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    {type === "Tiket" && (
                        <>
                            <tr className="grid grid-cols-12 py-2 px-12 border-b border-t border-gray-300">
                                <td className="col-span-8 font-bold">
                                    Subtotal
                                </td>
                                <td className="col-span-4 text-right font-bold">
                                    Rp{subtotal.toLocaleString()}
                                </td>
                            </tr>
                            <tr className="grid grid-cols-12 py-2 px-12 border-b border-gray-300">
                                <td className="col-span-8 text-left text-red-500">
                                    Kupon: CS10
                                </td>
                                <td className="col-span-4 text-right text-red-500">
                                    Rp-{kuponDiscount.toLocaleString()}
                                </td>
                            </tr>
                            <tr className="grid grid-cols-12 py-4 px-12 border-gray-300 text-lg">
                                <td className="col-span-8 text-left font-bold">
                                    Total Harga Tiket
                                </td>
                                <td className="col-span-4 text-right font-bold">
                                    Rp{totalHargaTiket.toLocaleString()}
                                </td>
                            </tr>

                            {laman === "pembayaran" && (
                                <>
                                    <tr className="grid grid-cols-12 py-2 px-12 border-b border-gray-300">
                                        <td className="col-span-8">
                                            Pajak (10%)
                                        </td>
                                        <td className="col-span-4 text-right">
                                            Rp{pajak.toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr className="grid grid-cols-12 py-2 px-12 border-b border-gray-300">
                                        <td className="col-span-8 text-blue-1">
                                            Donasi
                                        </td>
                                        <td className="col-span-4 text-right text-blue-1">
                                            Rp{donasi.toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr className="grid grid-cols-12 py-4 px-12 text-2xl">
                                        <td className="col-span-8 text-left font-bold">
                                            TOTAL BAYAR
                                        </td>
                                        <td className="col-span-4 text-right font-bold">
                                            Rp{totalBayar.toLocaleString()}
                                        </td>
                                    </tr>
                                </>
                            )}
                        </>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default RingkasanPembelian;
