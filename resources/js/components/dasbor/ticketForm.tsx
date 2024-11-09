import React from "react";

interface TicketFormProps {
    categories: { value: string; label: string }[];
}

const TicketForm: React.FC<TicketFormProps> = ({ categories }) => {
    return (
        <form className="space-y-6 p-8 border border-gray-300">
            {/* Ticket Number */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Nomor Tiket: TK2</h2>
                <div className="grid grid-cols-12 gap-4 items-center">
                    <label className="col-span-2">Tanggal</label>
                    <input
                        type="date"
                        className="col-span-3 p-2 border border-gray-300"
                    />
                    <input
                        type="time"
                        className="col-span-2 p-2 border border-gray-300"
                    />
                    <label className="col-span-2">Status</label>
                    <select className="col-span-3 p-2 border border-gray-300">
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <LabelAndInput
                        label="Nama"
                        type="text"
                        placeholder="Nama Anda"
                    />
                    <LabelAndInput
                        label="No. HP"
                        type="tel"
                        placeholder="08123456789"
                    />
                    <LabelAndInput
                        label="Email"
                        type="email"
                        placeholder="email@example.com"
                    />
                </div>
            </section>

            {/* Ticket Section */}
            <section className="space-y-4 border-t border-gray-300 pt-4">
                <h2 className="text-xl font-bold">Tiket</h2>
                <div className="grid grid-cols-12 gap-4">
                    <LabelAndSelect label="Nama Kelas" options={categories} />
                    <LabelAndSelect label="Tiket" options={categories} />
                    <LabelAndInput
                        label="Jumlah"
                        type="number"
                        placeholder="Masukkan Jumlah Tiket"
                    />
                </div>
            </section>

            {/* Coupon Section */}
            <section className="space-y-4 border-t border-gray-300 pt-4">
                <h2 className="text-xl font-bold">Kupon</h2>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Masukkan kode kupon"
                        className="flex-1 p-2 border border-gray-300"
                    />
                    <button className="px-4 py-2 bg-gray-500 text-white">
                        GUNAKAN
                    </button>
                </div>
            </section>

            {/* Donation Section */}
            <section className="space-y-4 border-t border-gray-300 pt-4">
                <h2 className="text-xl font-bold">Donasi</h2>
                <div className="space-x-4">
                    {["Rp10.000", "Rp25.000", "Rp50.000", "Rp100.000"].map(
                        (amount) => (
                            <button
                                key={amount}
                                className="px-4 py-2 border border-gray-300"
                            >
                                {amount}
                            </button>
                        )
                    )}
                </div>
            </section>

            {/* Summary Section */}
            <section className="space-y-4 border-t border-gray-300 pt-4">
                <h2 className="text-xl font-bold">Ringkasan</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">
                                Kelas
                            </th>
                            <th className="border border-gray-300 p-2">
                                Tiket
                            </th>
                            <th className="border border-gray-300 p-2">
                                Harga
                            </th>
                            <th className="border border-gray-300 p-2">
                                Jumlah
                            </th>
                            <th className="border border-gray-300 p-2">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2">
                                Nama Kelas
                            </td>
                            <td className="border border-gray-300 p-2">
                                Tiket Umum
                            </td>
                            <td className="border border-gray-300 p-2">
                                Rp50.000
                            </td>
                            <td className="border border-gray-300 p-2">1</td>
                            <td className="border border-gray-300 p-2">
                                Rp50.000
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td
                                colSpan={3}
                                className="border border-gray-300 p-2"
                            >
                                Subtotal
                            </td>
                            <td
                                colSpan={2}
                                className="border border-gray-300 p-2"
                            >
                                Rp50.000
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={3}
                                className="border border-gray-300 p-2"
                            >
                                Kupon
                            </td>
                            <td
                                colSpan={2}
                                className="border border-gray-300 p-2"
                            >
                                - Rp10.000
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={3}
                                className="border border-gray-300 p-2"
                            >
                                Pajak
                            </td>
                            <td
                                colSpan={2}
                                className="border border-gray-300 p-2"
                            >
                                Rp5.000
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={3}
                                className="border border-gray-300 p-2"
                            >
                                Donasi
                            </td>
                            <td
                                colSpan={2}
                                className="border border-gray-300 p-2"
                            >
                                Rp10.000
                            </td>
                        </tr>
                        <tr className="font-bold">
                            <td
                                colSpan={3}
                                className="border border-gray-300 p-2"
                            >
                                TOTAL PEMBAYARAN
                            </td>
                            <td
                                colSpan={2}
                                className="border border-gray-300 p-2"
                            >
                                Rp55.000
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </section>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button className="px-6 py-3 bg-black text-white font-bold">
                    SIMPAN
                </button>
            </div>
        </form>
    );
};

// Helper Components

interface LabelAndInputProps {
    label: string;
    type: React.HTMLInputTypeAttribute;
    placeholder: string;
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({
    label,
    type,
    placeholder,
}) => (
    <>
        <label className="col-span-2">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="col-span-10 p-2 border border-gray-300"
        />
    </>
);

interface LabelAndSelectProps {
    label: string;
    options: { value: string; label: string }[];
}

const LabelAndSelect: React.FC<LabelAndSelectProps> = ({ label, options }) => (
    <>
        <label className="col-span-2">{label}</label>
        <select className="col-span-10 p-2 border border-gray-300">
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </>
);

export default TicketForm;
