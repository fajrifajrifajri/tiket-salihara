import DetailPemesanan from "@/components/pages/checkout/detailPemesanan";
import Donasi from "@/components/pages/checkout/donasi";
import RingkasanPembelian from "@/components/pages/keranjang/ringkasanPembelian";
import Depan from "@/layouts/depan";

export default function Landing() {
    return (
        <Depan className="px-20 py-10 ml-[80px]">
            <div className="flex">
                <div className="inline-flex mx-auto my-8 py-1 px-20 border border-red-400 text-sm text-center text-red-400 font-medium">
                    SELESAIKAN PEMBAYARAN PALING LAMBAT 2 JAM
                </div>
            </div>

            <h1 className="text-2xl font-medium mb-6 text-dark-1">
                DETAIL TIKET
            </h1>
            <RingkasanPembelian laman="pembayaran" type="Tiket" />

            <Donasi />

            <DetailPemesanan type="Tiket" />
        </Depan>
    );
}
