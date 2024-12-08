import Dasbor from "@/layouts/dasbor";

import { DataTableCheckIn } from "../../../components/dasbor/dataTableCheckIn";
import { useEffect, useState } from "react";
import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { Tiket, columns } from "./columns";
import { motion } from "framer-motion";
import { QrCodeIcon } from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { QRCodeCanvas } from "qrcode.react";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

async function getData(): Promise<Tiket[]> {
    return [
        {
            nomor_tiket: "CMS202401",
            nama: "John Doe",
            nama_acara: "Common Sanctum",
            tipe_tiket: "Tiket Early Bird",
            status: "check-in",
        },
        {
            nomor_tiket: "CMS202402",
            nama: "John Doe",
            nama_acara: "Common Sanctum",
            tipe_tiket: "Tiket Early Bird",
            status: "check-in",
        },
        {
            nomor_tiket: "CMS202403",
            nama: "John Doe",
            nama_acara: "Common Sanctum",
            tipe_tiket: "Tiket Umum",
            status: "waiting",
        },
        {
            nomor_tiket: "CMS202404",
            nama: "Yanto",
            nama_acara: "Common Sanctum",
            tipe_tiket: "Tiket Umum",
            status: "waiting",
        },
        {
            nomor_tiket: "CMS202405",
            nama: "Yanto",
            nama_acara: "Common Sanctum",
            tipe_tiket: "Tiket Umum",
            status: "waiting",
        },
    ];
}

export default function Component() {
    const [data, setData] = useState<Tiket[]>([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = (ticket: any) => {
        setSelectedTicket(ticket);
        setDialogOpen(true);
    };

    const handleCheckIn = () => {
        // Implement the API call to change the status to "check-in"
        console.log(
            `Changing status to 'check-in' for ticket: ${selectedTicket.nomor_tiket}`
        );
        setDialogOpen(false);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedTicket(null);
    };

    const generatePDF = async () => {
        const qrCodeCanvas = document.getElementById(
            "qrCodeCanvas"
        ) as HTMLCanvasElement;
        if (!qrCodeCanvas) return;

        const qrCodeDataURL = qrCodeCanvas.toDataURL("image/png");

        // Send QR code and ticket details to the backend
        const response = await fetch("/dasbor/generate-ticket-pdf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add CSRF token
                "X-CSRF-TOKEN":
                    document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content") || "",
            },
            body: JSON.stringify({
                qrCode: qrCodeDataURL,
            }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ticket.pdf");
            document.body.appendChild(link);
            link.click();
        }
    };

    const handleScan = (result: string) => {
        if (result) {
            // Handle the QR code result here
            console.log("Scanned result:", result);
            setIsOpen(false);
        }
    };

    const handleError = (error: any) => {
        console.error(error);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="CHECK IN BERBAYAR" />
                {/* 
                <QRCodeCanvas
                    id="qrCodeCanvas"
                    value={
                        "https://picturesofpeoplescanningqrcodes.tumblr.com/"
                    }
                    title={"Title for my QR Code"}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    imageSettings={{
                        src: "/img/logo-image-transparent.png",
                        x: undefined,
                        y: undefined,
                        height: 36,
                        width: 36,
                        opacity: 1,
                        excavate: true,
                    }}
                />
                <button onClick={generatePDF}>Download PDF</button>
                */}

                <div className="mb-4">
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        className="relative block w-full h-12 rounded-md overflow-hidden bg-neutral-950 px-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 hover:scale-105"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                    >
                        <motion.span
                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                            style={{ mixBlendMode: "overlay" }}
                            animate={{
                                background: [
                                    "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                                    "linear-gradient(to right, #ec4899, #3b82f6, #8b5cf6)",
                                    "linear-gradient(to right, #8b5cf6, #ec4899, #3b82f6)",
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                        <span className="relative flex items-center gap-2 text-sm font-medium tracking-wide">
                            <QrCodeIcon className="w-5 h-5" />
                            Klik disini untuk scan QR Code
                        </span>
                    </motion.button>
                </div>
                <DataTableCheckIn
                    columns={columns}
                    data={data}
                    onOpenDialog={handleOpenDialog}
                />

                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold leading-6">
                                Konfirmasi Check-In
                            </DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-gray-500">
                                Pastikan informasi berikut sudah benar sebelum
                                melakukan check-in.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-6 space-y-6 border rounded-lg p-4 bg-gray-50">
                            {selectedTicket && (
                                <>
                                    <div className="grid grid-cols-[120px,1fr] gap-2 items-center text-sm">
                                        <div className="text-gray-500 font-medium">
                                            Nomor Tiket
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                            {selectedTicket.nomor_tiket}
                                        </div>

                                        <div className="text-gray-500 font-medium">
                                            Nama
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                            {selectedTicket.nama}
                                        </div>

                                        <div className="text-gray-500 font-medium">
                                            Acara
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                            {selectedTicket.nama_acara}
                                        </div>

                                        <div className="text-gray-500 font-medium">
                                            Tipe Tiket
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                            {selectedTicket.tipe_tiket}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <DialogFooter className="mt-6">
                            <Button
                                variant="outline"
                                onClick={handleCloseDialog}
                                className="w-full sm:w-auto"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleCheckIn}
                                className="w-full sm:w-auto bg-black hover:bg-gray-800"
                            >
                                Check-In
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Scan QR Code Tiket</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                            <Scanner
                                onScan={(result) => console.log(result)}
                                onError={handleError}
                                constraints={{
                                    facingMode: "environment",
                                }}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </main>
        </Dasbor>
    );
}
