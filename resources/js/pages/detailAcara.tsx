import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NavBeli from "@/components/pages/acara/navBeli";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import HeroImage from "@/components/ui/heroImage";

export default function DetailAcara({ acara }: { acara: any }) {
    return (
        <>
            <Navbar />
            <div className="pt-48 bg-gray-1">
                <div className="flex flex-col gap-y-2 mb-6 ml-[20px] md:ml-[80px] md:px-20">
                    <div>{acara.kategori.nama_kategori}</div>
                    <h1 className="text-4xl font-semibold">
                        {acara.nama_acara}
                    </h1>
                    <span className="font-bold">{acara.tanggal_acara}</span>
                </div>
                <HeroImage src={acara.thumbnail} alt="Event" />

                <section className="md:px-20 ml-[20px] md:mx-[80px] pt-8 pb-32">
                    <div>{acara.info}</div>
                    <div className="mb-6 text-base">
                        <Accordion type="single" collapsible>
                            {acara.akordeon_acara?.map(
                                (item: any, index: number) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                    >
                                        <AccordionTrigger className="font-bold">
                                            {item.judul_akordeon}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {item.deskripsi_akordeon}
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            )}
                        </Accordion>
                    </div>
                    <div>{acara.logo}</div>
                </section>

                <NavBeli
                    acara={acara}
                    type={acara.tipe_acara}
                    tiketDetail={acara.tiket_detail}
                    className="border-t border-black bg-gray-1"
                />
            </div>
            <Footer className="mb-24" />
        </>
    );
}
