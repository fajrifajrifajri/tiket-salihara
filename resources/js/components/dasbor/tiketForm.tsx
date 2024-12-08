import React, { useState, useEffect } from "react";

interface TiketDetail {
    nama_tiket?: string;
    kapasitas?: string;
    prefix?: string;
    harga?: string;
    pajak?: string;
    info_tiket?: string;
    maksimal_per_transaksi?: string;
    tanggal_mulai?: string;
    waktu_mulai?: string;
    tanggal_berakhir?: string;
    waktu_berakhir?: string;
}

interface TiketFormProps {
    tiketData: TiketDetail | null;
    onSubmit: (tiketData: any) => void;
}

const TiketForm: React.FC<TiketFormProps> = ({ tiketData, onSubmit }) => {
    const [formData, setFormData] = useState({
        nama_tiket: "",
        kapasitas: "",
        prefix: "",
        harga: "",
        pajak: "",
        info_tiket: "",
        maksimal_per_transaksi: "",
        tanggal_mulai: "2024-02-07",
        waktu_mulai: "10:00",
        tanggal_berakhir: "2024-03-07",
        waktu_berakhir: "14:00",
    });

    // Update formData when tiketData changes
    useEffect(() => {
        if (tiketData) {
            setFormData({
                nama_tiket: tiketData.nama_tiket || "",
                kapasitas: tiketData.kapasitas || "",
                prefix: tiketData.prefix || "",
                harga: tiketData.harga || "",
                pajak: tiketData.pajak || "",
                info_tiket: tiketData.info_tiket || "",
                maksimal_per_transaksi: tiketData.maksimal_per_transaksi || "",
                tanggal_mulai: tiketData.tanggal_mulai || "2024-02-07",
                waktu_mulai: tiketData.waktu_mulai || "10:00",
                tanggal_berakhir: tiketData.tanggal_berakhir || "2024-03-07",
                waktu_berakhir: tiketData.waktu_berakhir || "14:00",
            });
        }
    }, [tiketData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            harga: parseFloat(formData.harga).toFixed(2),
            pajak: parseInt(formData.pajak),
            tipe_tiket: "berbayar",
            penjualan_dari: `${formData.tanggal_mulai}T${formData.waktu_mulai}`,
            penjualan_sampai: `${formData.tanggal_berakhir}T${formData.waktu_berakhir}`,
        });
        // Reset form
        setFormData({
            nama_tiket: "",
            kapasitas: "",
            prefix: "",
            harga: "",
            pajak: "",
            info_tiket: "",
            maksimal_per_transaksi: "",
            tanggal_mulai: "2024-02-07",
            waktu_mulai: "10:00",
            tanggal_berakhir: "2024-03-07",
            waktu_berakhir: "14:00",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-12 gap-x-12 gap-y-4 mb-20 p-8 border"
        >
            <LabelAndInput
                label="Nama Tiket"
                type="text"
                placeholder="Tiket Early Bird"
                value={formData.nama_tiket}
                onChange={(value) =>
                    setFormData({ ...formData, nama_tiket: value })
                }
            />

            <LabelAndInput
                label="Prefix"
                type="text"
                placeholder="TK/TKT/CMS"
                value={formData.prefix}
                onChange={(value) =>
                    setFormData({ ...formData, prefix: value })
                }
            />

            <LabelAndInput
                label="Kapasitas:"
                type="number"
                placeholder="100"
                value={formData.kapasitas}
                onChange={(value) =>
                    setFormData({ ...formData, kapasitas: value })
                }
            />

            <LabelAndInput
                label="Harga Tiket:"
                type="number"
                placeholder="50.000"
                value={formData.harga}
                onChange={(value) => setFormData({ ...formData, harga: value })}
            />

            <LabelAndInput
                label="Pajak (%):"
                type="number"
                placeholder="10"
                value={formData.pajak}
                onChange={(value) => setFormData({ ...formData, pajak: value })}
            />

            <LabelAndInput
                label="Info Tiket:"
                type="text"
                placeholder="Hari Senin dan libur nasional pameran ditutup."
                value={formData.info_tiket}
                onChange={(value) =>
                    setFormData({ ...formData, info_tiket: value })
                }
            />

            <LabelAndInput
                label="Maksimal tiket per transaksi:"
                type="text"
                placeholder="5"
                value={formData.maksimal_per_transaksi}
                onChange={(value) =>
                    setFormData({ ...formData, maksimal_per_transaksi: value })
                }
            />

            <div className="col-span-1">TANGGAL PENJUALAN:</div>
            <div className="col-span-11 grid grid-cols-2 gap-x-4">
                <DateTimeInput
                    label="Tanggal Mulai"
                    date={formData.tanggal_mulai}
                    time={formData.waktu_mulai}
                    onDateChange={(value) =>
                        setFormData({ ...formData, tanggal_mulai: value })
                    }
                    onTimeChange={(value) =>
                        setFormData({ ...formData, waktu_mulai: value })
                    }
                />
                <DateTimeInput
                    label="Tanggal Berakhir"
                    date={formData.tanggal_berakhir}
                    time={formData.waktu_berakhir}
                    onDateChange={(value) =>
                        setFormData({ ...formData, tanggal_berakhir: value })
                    }
                    onTimeChange={(value) =>
                        setFormData({ ...formData, waktu_berakhir: value })
                    }
                />
            </div>

            <div className="col-span-12 flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-500 text-white"
                >
                    Simpan Tiket
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
    value: string;
    onChange: (value: string) => void;
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({
    label,
    type,
    placeholder,
    value,
    onChange,
}) => (
    <>
        <div className="col-span-1">{label}</div>
        <div className="col-span-11">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border border-gray-300"
            />
        </div>
    </>
);

interface DateTimeInputProps {
    label: string;
    date: string;
    time: string;
    onDateChange: (value: string) => void;
    onTimeChange: (value: string) => void;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
    label,
    date,
    time,
    onDateChange,
    onTimeChange,
}) => (
    <div className="flex items-center space-x-4">
        <label className="col-span-3">{label}</label>
        <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full p-2 border border-gray-300"
        />
        <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full p-2 border border-gray-300"
        />
    </div>
);

export default TiketForm;
