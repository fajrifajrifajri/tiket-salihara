import { useState } from "react";
import { motion } from "framer-motion";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { KategoriList } from "@/components/dasbor/kategoriList";
import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";
import { router, usePage } from "@inertiajs/react";
import { useForm } from "@/hooks/useForm";
import { KategoriListProps } from "@/types/kategori";
import { LabelAndInput } from "@/components/dasbor/labelAndInput";

export default function Component() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { kategori } = usePage().props as unknown as KategoriListProps;

    const { values, handleChange, handleSubmit } = useForm({
        initialValues: {
            nama_kategori: "",
        },
        onSubmit: (values) => {
            router.post("/dasbor/kategori", values);
        },
    });

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="KATEGORI" />

                <Button
                    variant="dasbor-black"
                    className="mb-4"
                    onClick={toggleFormVisibility}
                >
                    {isFormVisible ? "− KATEGORI" : "+ KATEGORI"}
                </Button>

                {isFormVisible && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-6"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 p-4 border border-black rounded-lg"
                        >
                            <LabelAndInput
                                id="nama_kategori"
                                label="Nama Kategori"
                                type="text"
                                placeholder="Nama Kategori"
                                value={values.nama_kategori}
                                onChange={handleChange}
                                className="flex"
                            />
                            <Button variant="link" size="link">
                                Tambah +
                            </Button>
                        </form>
                    </motion.div>
                )}

                <KategoriList kategori={kategori} />
            </main>
        </Dasbor>
    );
}
