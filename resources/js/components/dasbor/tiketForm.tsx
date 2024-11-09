import React from "react";

interface Category {
    value: string;
    label: string;
}

interface TicketFormProps {
    categories: Category[];
}

const TicketForm: React.FC<TicketFormProps> = ({ categories }) => {
    return (
        <div className="grid grid-cols-12 gap-x-12 gap-y-4 mb-20 p-8 border">
            {/* Ticket Name */}
            <LabelAndInput
                label="Nama Tiket:"
                type="text"
                placeholder="Tiket Umum"
            />

            {/* Capacity */}
            <LabelAndInput label="Kapasitas:" type="number" placeholder="100" />

            {/* Ticket Price */}
            <LabelAndInput
                label="Harga Tiket:"
                type="text"
                placeholder="Rp50.000"
            />

            {/* Ticket Info */}
            <LabelAndInput
                label="Info Tiket:"
                type="text"
                placeholder="Hari Senin dan libur nasional pameran ditutup."
            />

            {/* Sales Dates */}
            <div className="col-span-1">TANGGAL PENJUALAN:</div>
            <div className="col-span-11 grid grid-cols-2 gap-x-4">
                <DateTimeInput
                    label="Tanggal Mulai"
                    date="2024-02-07"
                    time="10:00"
                />
                <DateTimeInput
                    label="Tanggal Berakhir"
                    date="2024-03-07"
                    time="14:00"
                />
            </div>

            {/* Save Button */}
            <div className="col-span-12 flex justify-end">
                <button className="px-4 py-2 bg-gray-500 text-white">
                    Simpan Tiket
                </button>
            </div>
        </div>
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
        <div className="col-span-1">{label}</div>
        <div className="col-span-11">
            <input
                type={type}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300"
            />
        </div>
    </>
);

interface DateTimeInputProps {
    label: string;
    date: string;
    time: string;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
    label,
    date,
    time,
}) => (
    <div className="flex items-center space-x-4">
        <label className="col-span-3">{label}</label>
        <input
            type="date"
            defaultValue={date}
            className="w-full p-2 border border-gray-300"
        />
        <input
            type="time"
            defaultValue={time}
            className="w-full p-2 border border-gray-300"
        />
    </div>
);

export default TicketForm;
