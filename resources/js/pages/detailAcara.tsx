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

export default function Landing() {
    const logos = Array(6).fill("Logo");
    return (
        <>
            <Navbar />
            <div className="pt-48 bg-gray-1">
                <div className="flex flex-col gap-y-2 mb-6 ml-[80px] px-20">
                    <div>Pameran</div>
                    <h1 className="text-4xl font-semibold">Common Sanctum</h1>
                    <span className="font-bold">Jumat, 07 Maret 2024</span>
                </div>
                <HeroImage src="/img/masa-kritis.png" alt="Event" />

                <section className="px-20 mx-[80px] pt-8 pb-32">
                    <div>
                        <p>
                            <b>Seniman:</b> Bunga Yuridespita
                        </p>
                        <p className="mb-6">
                            <b>Kurator:</b> Rizki A. Zaelani
                        </p>
                        <p>
                            <b>Tiket:</b>
                        </p>
                        <p>Rp50.000 (umum)</p>
                        <p className="mb-6">Rp25.000 (pelajar)</p>
                        <p>
                            <b>Jam Operasional </b>
                        </p>
                        <p className="mb-6">
                            Selasa-Minggu, 11:00-19:00 WIB Senin dan hari libur
                            nasional tutup.
                        </p>
                    </div>
                    <div className="mb-6 text-base">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-bold">
                                    Tentang Pameran
                                </AccordionTrigger>
                                <AccordionContent>
                                    Ruang, bagi Bunga, adalah ihwal pengalaman
                                    dan pengetahuan yang tak kunjung sirna.
                                    Bunga Yuridespita terdidik dan kemudian
                                    pernah juga bekerja sebagai seorang arsitek
                                    hingga kemudian memilih menjadi seniman,
                                    atau perupa. Menjadi arsitek atau seniman,
                                    dalam prakteknya, adalah soal menggali,
                                    menemukan, dan mengkonstruksi medium
                                    ekspresi. Bunga tidak hanya melukis tapi
                                    juga mengerjakan mural, dan membuat
                                    aransemen video art sebagai bagian dari
                                    karya instalasinya yang akan dipamerkan di
                                    Galeri Salihara, Jakarta. Pameran ini
                                    menyoal ruang yang menghubungkan pengalaman
                                    hidup Bunga, terutama ketika ia kecil,
                                    dengan situasi tantangan hidup yang
                                    dihadapinya kini.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="font-bold">
                                    Profil Seniman
                                </AccordionTrigger>
                                <AccordionContent>
                                    Ruang, bagi Bunga, adalah ihwal pengalaman
                                    dan pengetahuan yang tak kunjung sirna.
                                    Bunga Yuridespita terdidik dan kemudian
                                    pernah juga bekerja sebagai seorang arsitek
                                    hingga kemudian memilih menjadi seniman,
                                    atau perupa. Menjadi arsitek atau seniman,
                                    dalam prakteknya, adalah soal menggali,
                                    menemukan, dan mengkonstruksi medium
                                    ekspresi. Bunga tidak hanya melukis tapi
                                    juga mengerjakan mural, dan membuat
                                    aransemen video art sebagai bagian dari
                                    karya instalasinya yang akan dipamerkan di
                                    Galeri Salihara, Jakarta. Pameran ini
                                    menyoal ruang yang menghubungkan pengalaman
                                    hidup Bunga, terutama ketika ia kecil,
                                    dengan situasi tantangan hidup yang
                                    dihadapinya kini.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div>
                        <p>Diselenggarakan oleh:</p>
                        <div className="inline-block mb-2 py-3 px-14 bg-purple-600">
                            Logo
                        </div>
                        <p>Bekerjasama dengan:</p>
                        {logos.map((logo, index) => (
                            <div
                                key={index}
                                className="inline-block mb-2 mr-6 py-3 px-14 bg-purple-600"
                            >
                                {logo}
                            </div>
                        ))}
                    </div>
                </section>

                <NavBeli
                    type="Tiket"
                    className="border-t border-black bg-gray-1"
                />
            </div>
            <Footer className="mb-24" />
        </>
    );
}
