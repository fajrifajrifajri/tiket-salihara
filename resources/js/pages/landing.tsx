import Slider from "@/components/slider";
import { Button } from "@/components/ui/button";
import ButtonList from "@/components/ui/buttonList";
import {
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import Depan from "@/layouts/depan";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Landing({
    slider,
    acara,
    kategori,
}: {
    slider: any;
    acara: any;
    kategori: any;
}) {
    const [kategoriSelected, setKategoriSelected] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleKategori = () => {
        setIsLoading(true);
        router.reload({
            only: ["acara"],
            data: {
                kategori: kategoriSelected,
            },
            onFinish: () => setIsLoading(false),
        });
    };
    console.log(kategoriSelected);

    return (
        <Depan className="">
            <Slider slider={slider} />

            <section className="py-32 text-center">
                <h2 className="text-4xl font-bold mb-8">TERKINI</h2>
                <div className="md:flex items-center justify-center mt-4 mb-20">
                    <div className="text-left text-xs">
                        <span className="block mb-2 font-bold">KATEGORI</span>
                        <div className="flex gap-x-8">
                            <Select
                                onValueChange={setKategoriSelected}
                                value={kategoriSelected}
                            >
                                <SelectTrigger className="w-[300px]">
                                    <SelectValue placeholder="Pilih Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kategori?.map((item: any) => (
                                        <SelectItem
                                            key={item.id}
                                            value={item.nama_kategori}
                                        >
                                            {item.nama_kategori}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                onClick={() => handleKategori()}
                                className="w-[140px] font-bold text-base flex items-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader className="animate-spin mr-2" />
                                ) : (
                                    "CARI ACARA"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-dark-1 font-semibold">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <Skeleton
                                  key={index}
                                  className="h-24 mb-8 bg-gray-1 border-b border-gray-2 border-dashed"
                              />
                          ))
                        : acara.map((item: any) => (
                              <ButtonList
                                  href={`/acara/${item.slug}`}
                                  variant="list"
                                  key={item.slug}
                              >
                                  {item.nama_acara}
                              </ButtonList>
                          ))}
                </div>
            </section>
        </Depan>
    );
}
