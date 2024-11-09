import React, { useState } from "react";
import { motion } from "framer-motion";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { KategoriList } from "@/components/dasbor/kategoriList";
import { Button } from "@/components/ui/button";
import Dasbor from "@/layouts/dasbor";

export default function Component() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="KATEGORI" />

                {/* Toggle Button */}
                <Button
                    variant="dasbor-black"
                    className="mb-4"
                    onClick={toggleFormVisibility}
                >
                    {isFormVisible ? "− KATEGORI" : "+ KATEGORI"}
                </Button>

                {/* Form with Framer Motion Animation */}
                {isFormVisible && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-6"
                    >
                        <form className="space-y-4 p-4 border border-gray-300 rounded">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Kategori
                                <input
                                    type="text"
                                    name="nama_kategori"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded"
                                    placeholder="Masukkan nama kategori"
                                />
                            </label>
                            <Button variant="dasbor-black" type="submit">
                                Submit
                            </Button>
                        </form>
                    </motion.div>
                )}

                {/* Kategori List */}
                <KategoriList />
            </main>
        </Dasbor>
    );
}
