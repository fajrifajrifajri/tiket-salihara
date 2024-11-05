import { SelectContent, SelectItem } from "@/components/input/select";
import Slider from "@/components/slider";
import { Button } from "@/components/ui/button";
import ButtonList from "@/components/ui/buttonList";
import Depan from "@/layouts/depan";

const categories = [
    { value: "semua", label: "SEMUA" },
    { value: "pameran", label: "PAMERAN" },
    { value: "teater", label: "TEATER" },
    { value: "musik", label: "MUSIK" },
    { value: "diskusi", label: "DISKUSI" },
    { value: "tari", label: "TARI" },
];

export default function Landing() {
    return (
        <Depan className="pt-8">
            <Slider />

            <section className="pt-32 text-center">
                <h2 className="text-4xl font-bold mb-8">TERKINI</h2>
                <div className="flex items-center justify-center mt-4 mb-20">
                    <div className="text-left text-xs">
                        <span className="block mb-2 font-bold">KATEGORI</span>
                        <div className="flex gap-x-8">
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

                            <Button className="font-bold text-base">
                                CARI ACARA
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-dark-1 font-semibold">
                    <ButtonList href="/detail-acara" variant="list">
                        PAMERAN: COMMON SANCTUM
                    </ButtonList>
                    <ButtonList href="/detail-rsvp" variant="list">
                        TEATER: KOTAK TEKA TEKI
                    </ButtonList>
                    <ButtonList href="#" variant="list">
                        MUSIK: LEWAT MASA KRITIS
                    </ButtonList>
                    <ButtonList href="#" variant="list">
                        DISKUSI: MODERNISME ARTISTIK
                    </ButtonList>
                    <ButtonList href="#" variant="lastList">
                        TARI: PERFORMING SPIRAL
                    </ButtonList>
                </div>
            </section>
        </Depan>
    );
}
