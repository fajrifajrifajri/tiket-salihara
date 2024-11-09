import DetailPemesanan from "@/components/pages/checkout/detailPemesanan";
import Donasi from "@/components/pages/checkout/donasi";
import RingkasanPembelian from "@/components/pages/keranjang/ringkasanPembelian";
import Depan from "@/layouts/depan";

export default function Landing() {
    return (
        <Depan className="md:px-40 mx-2 py-10 md:ml-[80px]">
            <div className="flex">
                <div className="inline-flex mx-auto mt-2 mb-24 py-2 px-20 border border-red-1 text-base text-center text-red-1 font-medium">
                    SELESAIKAN PEMBAYARAN PALING LAMBAT 2 JAM
                </div>
            </div>

            <h1 className="text-4xl font-medium mb-6 text-dark-1">
                DETAIL TIKET
            </h1>
            <RingkasanPembelian laman="pembayaran" type="Tiket" />

            <Donasi />

            <DetailPemesanan type="Tiket" />
        </Depan>
    );
}
