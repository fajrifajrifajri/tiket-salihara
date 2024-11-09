import { HapusButton, UbahButton } from "@/components/dasbor/CRUDButtons";
import { DataTable } from "@/components/dasbor/dataTable";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { SelectContent, SelectItem } from "@/components/input/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dasbor from "@/layouts/dasbor";
import { columnsBaru, Ticket } from "./columns";
import { useEffect, useState } from "react";
import TicketForm from "@/components/dasbor/tiketForm";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from "@inertiajs/react";

const categories = [
    { value: "semua", label: "SEMUA" },
    { value: "pameran", label: "PAMERAN" },
    { value: "teater", label: "TEATER" },
    { value: "musik", label: "MUSIK" },
    { value: "diskusi", label: "DISKUSI" },
    { value: "tari", label: "TARI" },
];

async function getData(): Promise<Ticket[]> {
    return [
        {
            id: 1,
            name: "Tiket Early Bird",
            price: "Rp30.000",
            capacity: 50,
            available: 45,
        },
        {
            id: 2,
            name: "Tiket Umum",
            price: "Rp50.000",
            capacity: 100,
            available: 15,
        },
        {
            id: 3,
            name: "Tiket Pelajar",
            price: "Rp35.000",
            capacity: 100,
            available: 10,
        },
    ];
}

export default function Component() {
    const [data, setData] = useState<Ticket[]>([]);

    useEffect(() => {
        getData().then(setData);
    }, []);

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="ACARA RSVP BARU" />
                <div className="grid grid-cols-12 gap-x-12 gap-y-4 mb-20 pr-64">
                    <div className="col-span-1">Kategori:</div>
                    <div className="col-span-11">
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.value}
                                    value={category.value}
                                >
                                    {category.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </div>
                    <div className="col-span-1">Judul:</div>
                    <div className="col-span-11">
                        <Input type="text" placeholder="Common Sanctum" />
                    </div>
                    <div className="col-span-1">Gambar:</div>
                    <div className="col-span-11">
                        <Input type="file" className="w-auto mb-4" />
                        <img
                            src="/img/slider-1.jpg"
                            alt="Placeholder"
                            width={295}
                            height={295}
                        />
                    </div>
                    <div className="col-span-1">Info:</div>
                    <div className="col-span-11">
                        <img
                            src="/img/editor.png"
                            alt="Placeholder"
                            className="w-full"
                        />
                    </div>
                    <div className="col-span-1">Accordion:</div>
                    <div className="col-span-11">
                        <div className="flex w-full justify-between border mb-2 p-2 border-gray-4">
                            <div className="">Tentang Pameran</div>
                            <div>
                                <UbahButton />
                                <HapusButton />
                            </div>
                        </div>
                        <div className="flex w-full justify-between border mb-2 p-2 border-gray-4">
                            <div className="">Isi Acara</div>
                            <div>
                                <UbahButton />
                                <HapusButton />
                            </div>
                        </div>
                        <div>
                            <p>Judul Accordion</p>
                            <Input type="text" placeholder="Tentang Pameran" />
                        </div>
                        <div>
                            <p>Deskripsi Accordion</p>
                            <img
                                src="/img/editor.png"
                                alt="Placeholder"
                                className="w-full"
                            />
                            <div className="flex">
                                <Button
                                    variant="dasbor-black"
                                    className="ml-auto"
                                >
                                    + Accordion
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">Logo:</div>
                    <div className="col-span-11">
                        <img
                            src="/img/editor.png"
                            alt="Placeholder"
                            className="w-full"
                        />
                    </div>
                    <div className="col-span-1">Pajak:</div>
                    <div className="col-span-11">
                        <div className="inline-flex items-center justify-center gap-x-2">
                            <Input
                                type="number"
                                value="10"
                                className="m-0 w-16"
                                autoFocus
                            />
                            <span>%</span>
                            <span className="italic">
                                Tulis "0" jika tidak ada pajak
                            </span>
                        </div>
                    </div>
                    <div className="col-span-1">Tanggal Acara:</div>
                    <div className="col-span-11">
                        <div className="grid grid-cols-12 gap-x-4 items-center">
                            <Input className="col-span-2" type="date" />
                            <div className="col-start-4 col-span-1">Sampai</div>
                            <Input className="col-span-2" type="date" />
                        </div>
                    </div>
                    <div className="col-span-1">Posting Acara:</div>
                    <div className="col-span-11">
                        <div className="grid grid-cols-12 gap-x-4 items-center">
                            <Input className="col-span-2" type="date" />
                            <Input
                                className="col-span-1"
                                type="time"
                                value="08:00"
                            />
                            <div className="col-span-1">Sampai</div>
                            <Input className="col-span-2" type="date" />
                            <Input
                                className="col-span-1"
                                type="time"
                                value="14:00"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full bg-gray-4 p-2 text-center font-semibold">
                    TIKET
                </div>
                <div>
                    <DataTable columns={columnsBaru} data={data} />
                </div>
                <div className="mt-4">
                    <Button className="block w-48" variant="dasbor-gray">
                        + Buat Tiket
                    </Button>
                </div>
                <div>
                    <TicketForm categories={categories} />
                </div>
                <div className="w-full bg-gray-4 p-2 text-center font-semibold">
                    PENGATURAN TAMBAHAN
                </div>
                <div className="flex flex-col gap-y-4 my-8">
                    <div>
                        <label
                            htmlFor="makimsalTiket"
                            className="font-semibold"
                        >
                            Maksimal tiket per transaksi
                        </label>
                        <Input type="number" placeholder="5" />
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="makimsalTiket"
                                className="font-semibold"
                            >
                                Maksimal tiket per transaksi
                            </label>
                            <label htmlFor="makimsalTiket">Pilih Survei</label>
                        </div>
                        <Input type="text" placeholder="SURVEI #1" />
                    </div>
                </div>
                <div className="w-full bg-gray-4 mb-4 p-2 text-center font-semibold">
                    SYARAT DAN KETENTUAN ACARA INI
                </div>
                <div className="flex justify-center ">
                    <img
                        src="/img/editor.png"
                        alt="Placeholder"
                        className="w-10/12"
                    />
                </div>
                <div className="flex justify-center my-8">
                    <div className="flex justify-between gap-x-12">
                        <div className="flex items-center space-x-2">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode">Publish</Label>
                        </div>
                        <div>
                            <Button variant="dasbor-blue-rounded">
                                Preview
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Link href="/dasbor/acara">
                        <Button className="w-full">Simpan</Button>
                    </Link>
                </div>
            </main>
        </Dasbor>
    );
}
