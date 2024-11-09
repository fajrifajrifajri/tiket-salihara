import Dasbor from "@/layouts/dasbor";

import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GripVertical } from "lucide-react";

const surveiData = [
    {
        kategori: "Pameran",
        title: "Common Sanctum",
        jadwal: "07 Maret - 03 April 2024",
        color: "bg-white",
        img: "slider-1.jpg",
    },
    {
        kategori: "Teater",
        title: "Kotak Teka-Teki",
        jadwal: "25 November 2022",
        color: "bg-white",
        img: "slider-1.jpg",
    },
];

export default function Component() {
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="SLIDER" />
                <div className="relative mb-24">
                    <img
                        className="shadow border-2 border-dark-1"
                        src="/img/slider-1.jpg"
                        alt="Slider"
                    />
                    <div className="absolute bottom-20 left-48 opacity-50 flex">
                        <img src="/img/editor.png" alt="Slider" />
                        <div className="">
                            <Button variant="dasbor-black">+ SLIDER</Button>
                        </div>
                    </div>
                </div>
                <div>
                    {surveiData.map((val, index) => {
                        return (
                            <div key={index}>
                                <div className="grid grid-cols-12 items-center w-8/12 gap-x-12 mb-12">
                                    <div className="col-span-1">
                                        <GripVertical className="cursor-grab" />
                                    </div>
                                    <h3 className="col-span-4 text-lg font-semibold">
                                        {val.kategori}
                                    </h3>
                                    <div className="col-span-6 flex flex-col">
                                        <span>{val.title}</span>
                                        <span>{val.jadwal}</span>
                                    </div>
                                </div>
                                <Separator className="border border-brown-3 rounded-md" />
                            </div>
                        );
                    })}
                </div>
            </main>
        </Dasbor>
    );
}
