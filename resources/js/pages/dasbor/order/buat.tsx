import Dasbor from "@/layouts/dasbor";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { OrderForm } from "@/components/dasbor/orderForm";
import { PageProps } from "@/types";
import { usePage, useForm } from "@inertiajs/react";
import { TiketDetail } from "../acara/buat";
import { Pertanyaan } from "@/types/pertanyaan";
import { useState } from "react";

type SurveiForm = {
    nama: string;
    email: string;
    whatsapp: string;
    pertanyaan: Pertanyaan[];
};

export default function Component() {
    const { tiketDetails, kupon, pertanyaanList } = usePage<PageProps>().props;
    const [currSelectedTiketID, setCurrSelectedTiketID] = useState<
        number | null
    >(null);

    console.log(pertanyaanList);
    const { data, setData, post } = useForm({
        id_acara: "",
        selected_kupon: {
            id: "",
            kode_kupon: "",
            potongan: 0,
            kuota: 0,
        },
        status: "",
        total_bayar: 0,
        selected_tiket_list: [] as TiketDetail[],
        donasi: 0,
        survei: {
            nama: "",
            email: "",
            whatsapp: "",
            pertanyaan: pertanyaanList || [],
        } as SurveiForm,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //console.log(data);

        /*
        const total = data.selected_tiket_list.reduce(
            (acc, tiket) => acc + tiket.harga,
            0
        );
        setData("total_bayar", total);
        */

        post("/dasbor/order", {
            onError: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="ORDER BARU BERBAYAR" />
                <OrderForm
                    tiketDetails={tiketDetails}
                    kupon={kupon}
                    data={data}
                    setData={setData}
                    pertanyaanList={pertanyaanList}
                    handleSubmit={handleSubmit}
                    currSelectedTiketID={currSelectedTiketID}
                    setCurrSelectedTiketID={setCurrSelectedTiketID}
                />
            </main>
        </Dasbor>
    );
}
