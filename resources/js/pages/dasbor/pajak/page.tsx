import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dasbor from "@/layouts/dasbor";

export default function Component() {
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="PAJAK" />
                <p>Masukkan besaran pajak.</p>
                <p>
                    Pajak akan berlaku pada setiap transaksi kecuali pada Tiket
                    RSVP.
                </p>
                <div className="inline-flex items-center justify-center my-6 gap-x-2">
                    <Input
                        type="number"
                        placeholder="10"
                        className="m-0 w-16"
                        autoFocus
                    />
                    <span>%</span>
                </div>
                <Button className="block w-48">Simpan</Button>
            </main>
        </Dasbor>
    );
}
