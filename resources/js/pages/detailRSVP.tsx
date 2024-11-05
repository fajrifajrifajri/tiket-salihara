import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NavBeli from "@/components/pages/acara/navBeli";
import HeroImage from "@/components/ui/heroImage";

export default function Landing() {
    const logos = Array(6).fill("Logo");
    return (
        <>
            <Navbar />
            <div className="pt-48 bg-gray-1">
                <div className="flex flex-col gap-y-2 mb-6 ml-[80px] px-20">
                    <div>Teater</div>
                    <h1 className="text-4xl font-semibold">Kotak Teka Teki</h1>
                    <span className="font-bold">Jumat, 25 November 2022</span>
                </div>
                <HeroImage src="/img/kotak-teka-teki.jpg" alt="Event" />

                <section className="px-20 mx-[80px] pt-8 pb-32">
                    <div className="mb-6">
                        <p>
                            <b>Penampil:</b> Kelas Akting Salihara Tingkat 1
                            2022
                        </p>
                        <p>
                            <b>Sutradara:</b> Rukman Rosadi
                        </p>
                        <p>
                            <b>Jumat, 25 November 2022, 20:00 WIB</b>
                        </p>
                        <p>
                            <b>Teater Salihara</b>
                        </p>
                        <p>
                            Setelah melewati kelas dalam tiga bulan, peserta
                            Kelas Akting Salihara Tingkat 1 2022 mementaskan
                            Kotak Teka-Teki karya Rukman Rosadi. Karya ini
                            menyajikan garis-garis yang membingkai perjalanan
                            hidup tiap manusia. Garis yang pada satu langkah
                            perhentian membawa keterasingan penuh teka-teki.
                        </p>
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
                    type="RSVP"
                    className="border-t border-black bg-gray-1"
                />
            </div>
            <Footer className="mb-24" />
        </>
    );
}
