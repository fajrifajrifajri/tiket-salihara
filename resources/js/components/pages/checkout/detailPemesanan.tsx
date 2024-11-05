import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/input/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";

interface ComponentProps {
    type: "RSVP" | "Tiket"; // Adjust 'OTHER_TYPE' as needed
}

// Define the structure of `orderData` with explicit types
type OrderData = {
    nama: string;
    noWa: string;
    email: string;
    domisili: string;
    jenisKelamin: string;
    usia: string;
    sumberInformasi: string;
    pertanyaan5: string;
    pertanyaan6: string;
    pertanyaan7: string;
    pertanyaan8: string;
    setuju: boolean; // Explicitly set to boolean
};

export const orderData = {
    // Personal Details
    nama: "Joh Doe",
    noWa: "08123456789",
    email: "john@mail.com",
    // Survey - Common Sanctum
    domisili: "Depok",
    jenisKelamin: "Laki-laki",
    usia: "13-17",
    sumberInformasi: "Instagram",
    // Survey - Sanctuary Palace
    pertanyaan5: "Depok",
    pertanyaan6: "Laki-laki",
    pertanyaan7: "13-17",
    pertanyaan8: "Instagram",
    // Terms
    setuju: false,
};

export default function Component({ type }: { type: "RSVP" | "Tiket" }) {
    const [formData, setFormData] = useState(orderData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value as string }));
    };

    const handleCheckboxChange = (checked: boolean): void => {
        setFormData((prevData) => ({
            ...prevData,
            setuju: checked,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.nama) newErrors.nama = "Nama harus diisi";
        if (!formData.noWa || formData.noWa.length < 10)
            newErrors.noWa = "Nomor WhatsApp tidak valid";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email tidak valid";

        // Validate Survey - Common Sanctum
        if (!formData.domisili) newErrors.domisili = "Domisili harus diisi";
        if (!formData.jenisKelamin)
            newErrors.jenisKelamin = "Jenis kelamin harus diisi";
        if (!formData.usia) newErrors.usia = "Usia harus diisi";
        if (!formData.sumberInformasi)
            newErrors.sumberInformasi = "Sumber informasi harus diisi";

        // Validate Survey - Sanctuary Palace
        if (!formData.pertanyaan5)
            newErrors.pertanyaan5 = "Pertanyaan 5 harus diisi";
        if (!formData.pertanyaan6)
            newErrors.pertanyaan6 = "Pertanyaan 6 harus diisi";
        if (!formData.pertanyaan7)
            newErrors.pertanyaan7 = "Pertanyaan 7 harus diisi";
        if (!formData.pertanyaan8)
            newErrors.pertanyaan8 = "Pertanyaan 8 harus diisi";

        if (!formData.setuju)
            newErrors.setuju = "Anda harus menyetujui syarat dan ketentuan";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            // Handle form submission here
        }
    };

    return (
        <div className="w-full mx-auto py-6">
            <h1 className="text-3xl font-medium text-dark-1 mb-6">
                DETAIL PEMESAN
            </h1>

            <form
                onSubmit={handleSubmit}
                className="px-8 space-y-6 font-medium"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-28 mb-28">
                    {/* Left Column - Personal Details */}
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="nama" className="text-xl">
                                Nama<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="nama"
                                name="nama"
                                value={formData.nama}
                                onChange={handleInputChange}
                                placeholder="Joh Doe"
                            />
                            {errors.nama && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.nama}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="noWa" className="text-xl">
                                No WA<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="noWa"
                                name="noWa"
                                value={formData.noWa}
                                onChange={handleInputChange}
                                placeholder="08123456789"
                            />
                            {errors.noWa && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.noWa}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-xl">
                                Email<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@mail.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Surveys */}
                    <div className="space-y-6">
                        {/* SURVEI - COMMON SANCTUM */}
                        <div className="mb-20 space-y-4">
                            <h2 className="mb-4 font-medium text-2xl text-dark-1">
                                {type === "Tiket"
                                    ? "SURVEI - COMMON SANCTUM"
                                    : "SURVEI - KOTAK TEKA TEKI"}
                            </h2>

                            <div>
                                <Label htmlFor="domisili" className="text-xl">
                                    Domisili saat mengakses program
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="domisili"
                                    name="domisili"
                                    value={formData.domisili}
                                    onChange={handleInputChange}
                                    placeholder="Depok"
                                />
                                {errors.domisili && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.domisili}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label
                                    htmlFor="jenisKelamin"
                                    className="text-xl"
                                >
                                    Jenis kelamin
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="jenisKelamin"
                                    name="jenisKelamin"
                                    value={formData.jenisKelamin}
                                    onChange={handleInputChange}
                                    placeholder="Laki-laki"
                                />
                                {errors.jenisKelamin && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.jenisKelamin}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="usia" className="text-xl">
                                    Usia<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="usia"
                                    name="usia"
                                    value={formData.usia}
                                    onChange={handleInputChange}
                                    placeholder="13-17"
                                />
                                {errors.usia && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.usia}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label
                                    htmlFor="sumberInformasi"
                                    className="text-xl"
                                >
                                    Sumber informasi program
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="sumberInformasi"
                                    name="sumberInformasi"
                                    value={formData.sumberInformasi}
                                    onChange={handleInputChange}
                                    placeholder="Instagram"
                                />
                                {errors.sumberInformasi && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.sumberInformasi}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* SURVEI - SANCTUARY PALACE */}
                        {type === "Tiket" ? (
                            <div className="space-y-4">
                                <h2 className="mb-4 font-medium text-2xl text-dark-1">
                                    SURVEI - SANCTUARY PALACE
                                </h2>

                                <div>
                                    <Label
                                        htmlFor="pertanyaan5"
                                        className="text-xl"
                                    >
                                        Pertanyaan 5
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="pertanyaan5"
                                        name="pertanyaan5"
                                        value={formData.pertanyaan5}
                                        onChange={handleInputChange}
                                        placeholder="Depok"
                                    />
                                    {errors.pertanyaan5 && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.pertanyaan5}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label
                                        htmlFor="pertanyaan6"
                                        className="text-xl"
                                    >
                                        Pertanyaan 6
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="pertanyaan6"
                                        name="pertanyaan6"
                                        value={formData.pertanyaan6}
                                        onChange={handleInputChange}
                                        placeholder="Laki-laki"
                                    />
                                    {errors.pertanyaan6 && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.pertanyaan6}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label
                                        htmlFor="pertanyaan7"
                                        className="text-xl"
                                    >
                                        Pertanyaan 7
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="pertanyaan7"
                                        name="pertanyaan7"
                                        value={formData.pertanyaan7}
                                        onChange={handleInputChange}
                                        placeholder="13-17"
                                    />
                                    {errors.pertanyaan7 && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.pertanyaan7}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label
                                        htmlFor="pertanyaan8"
                                        className="text-xl"
                                    >
                                        Pertanyaan 8
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="pertanyaan8"
                                        name="pertanyaan8"
                                        value={formData.pertanyaan8}
                                        onChange={handleInputChange}
                                        placeholder="Instagram"
                                    />
                                    {errors.pertanyaan8 && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.pertanyaan8}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-center items-center space-x-2">
                        <Checkbox
                            label=""
                            checked={formData.setuju}
                            onChange={(checked: boolean) =>
                                handleCheckboxChange(checked)
                            }
                        />
                        <Label htmlFor="setuju" className="text-sm font-normal">
                            Saya telah membaca dan menyetujui{" "}
                            <a href="#" className="text-blue-1 hover:underline">
                                Syarat dan ketentuan
                            </a>
                            <span className="text-red-500">*</span>
                        </Label>
                    </div>
                    {errors.setuju && (
                        <p className="flex justify-center text-red-500 text-sm mt-1">
                            {errors.setuju}
                        </p>
                    )}

                    <Link
                        className="block"
                        href={type === "Tiket" ? "/menunggu" : "/berhasil-rsvp"}
                    >
                        <Button
                            type="submit"
                            className="w-full bg-dark-2 hover:bg-gray-700 py-6"
                        >
                            BAYAR
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
