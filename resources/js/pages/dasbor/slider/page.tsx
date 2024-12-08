import { useState } from "react";
import { GripVertical } from "lucide-react";
import { Reorder } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Dasbor from "@/layouts/dasbor";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TipTapEditor from "@/components/dasbor/editor/tipTapEditor";
import { router, useForm, usePage } from "@inertiajs/react";
import { Input } from "@/components/ui/input";

interface SliderItem {
    id: number;
    teks: string;
    gambar: File | null;
    preview: string;
}

interface SliderProps {
    sliders: SliderItem[];
}

export default function SliderComponent({
    sliders: initialSliders,
}: SliderProps) {
    const [sliders, setSliders] = useState<SliderItem[]>(initialSliders);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        errors,
    } = useForm({
        id: 0,
        teks: "",
        gambar: null as File | null,
        preview: "",
    });

    const addSlider = () => {
        if (!data.teks || !data.gambar) {
            alert("Please complete all fields before adding a slider.");
            return;
        }

        const formData = new FormData();
        formData.append("teks", data.teks);
        if (data.gambar) {
            formData.append("gambar", data.gambar);
        }

        post(route("slider.store"), {
            onSuccess: (response: any) => {
                const newSlider = response.props.sliders;
                // Bug: Inertia doesn't update the useForm automatically
                setSliders(newSlider);

                setData({ id: 0, teks: "", gambar: null, preview: "" });
                // editor?.commands.clearContent();
            },
        });
    };

    const updateSliderImage = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setData({ ...data, gambar: file, preview: imageUrl });
    };

    const deleteSlider = (id: number) => {
        if (!confirm("Hapus slider ini?")) return;
        destroy(route("slider.destroy", id), {
            onSuccess: () => {
                setSliders((prev) => prev.filter((slider) => slider.id !== id));
            },
        });
    };

    const handleReorder = (sliderNewPosisi: SliderItem[]) => {
        setSliders(sliderNewPosisi);

        const idAndPosisiPayload = sliderNewPosisi.map((item, index) => ({
            id: item.id,
            posisi: index,
        }));

        router.put("/dasbor/slider/reorder", {
            posisi: idAndPosisiPayload,
        });
    };

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="SLIDER" />
                <section className="mb-24">
                    <div className="relative w-3/4">
                        {data.preview ? (
                            <img
                                src={data.preview}
                                className="shadow border-2 border-dark-1"
                                alt="Slider Image Preview"
                            />
                        ) : (
                            <div className="flex-col w-full gap-y-4 bg-gray-100 aspect-[16/9] border-4 border-black flex items-center justify-center rounded-lg">
                                <span className="text-gray-400 hover:cursor-default">
                                    Tidak ada gambar.
                                </span>
                            </div>
                        )}
                        <div className="absolute bottom-64 left-48">
                            {errors.gambar && (
                                <p className="text-red-500">{errors.gambar}</p>
                            )}
                            {errors.teks && (
                                <p className="text-red-500">{errors.teks}</p>
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    e.target.files &&
                                    updateSliderImage(e.target.files[0])
                                }
                                className="file-input border-none"
                            />
                        </div>
                        <div className="absolute bottom-20 left-48 opacity-50">
                            <TipTapEditor
                                teks={data.teks}
                                setTeks={(teks) => setData({ ...data, teks })}
                            />
                        </div>
                        <Button
                            variant="dasbor-black"
                            className="w-full py-6 mt-2"
                            onClick={addSlider}
                        >
                            + SLIDER
                        </Button>
                    </div>
                </section>
                <section>
                    <Reorder.Group
                        axis="y"
                        values={sliders}
                        onReorder={handleReorder}
                        className="space-y-6"
                    >
                        {sliders.map((slider) => (
                            <Reorder.Item
                                key={slider.id}
                                value={slider}
                                className="flex items-center space-x-4 p-4 border rounded"
                            >
                                <GripVertical className="cursor-grab" />
                                <div className="flex-grow">
                                    <div
                                        className="font-bold"
                                        dangerouslySetInnerHTML={{
                                            __html: slider.teks,
                                        }}
                                    />
                                </div>
                                <img
                                    src={
                                        slider.preview?.startsWith("https://")
                                            ? slider.preview
                                            : `/storage/${slider.preview}`
                                    }
                                    alt="Preview"
                                    className="w-20 h-20 object-cover"
                                />
                                <button
                                    onClick={() => deleteSlider(slider.id)}
                                    className="text-red-500"
                                >
                                    X
                                </button>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </section>
            </main>
        </Dasbor>
    );
}
