import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dasbor from "@/layouts/dasbor";
import { router, useForm } from "@inertiajs/react";
import { toast } from "sonner";

interface PajakProps {
    id: number;
    pajak: string;
}

export default function Component({ pajak }: PajakProps) {
    const { data, setData, put, processing } = useForm({
        pajak: pajak || "0",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("pajak.update", pajak), {
            onSuccess: () =>
                toast("Pajak berhasil diperbarui.", {
                    description: new Date().toLocaleString(),
                    action: {
                        label: "Kembali",
                        onClick: () => router.visit(route("pajak.index")),
                    },
                }),
        });
    };

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="PAJAK" />
                <p>Masukkan besaran pajak.</p>
                <p>
                    Pajak akan berlaku pada setiap transaksi kecuali pada Tiket
                    RSVP.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="inline-flex items-center justify-center my-6 gap-x-2">
                        <Input
                            type="number"
                            placeholder="10"
                            className="m-0 w-16"
                            value={data.pajak}
                            onChange={(e) => setData("pajak", e.target.value)}
                            autoFocus
                        />
                        <span>%</span>
                    </div>
                    <Button
                        className="block w-48"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? "Menyimpan..." : "Simpan"}
                    </Button>
                </form>
            </main>
        </Dasbor>
    );
}
