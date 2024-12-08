import Dasbor from "@/layouts/dasbor";
import { Link } from "@inertiajs/react";
import {
    Ticket,
    User,
    PlusCircle,
    DollarSign,
    Calendar,
    Star,
    CheckCircle,
    Percent,
    BarChart,
    Clipboard,
    Image,
    List,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { BarChartComponent, LineChartComponent } from "@/components/charts";
import { ChartConfig } from "@/components/ui/chart";

function generateRandomData(base: number, variance: number, months: string[]) {
    return months.map((month) => ({
        month,
        desktop: Math.max(
            0,
            base + Math.floor(Math.random() * variance - variance / 2)
        ),
        mobile: Math.max(
            0,
            base + Math.floor(Math.random() * variance - variance / 2)
        ),
    }));
}

function generateRandomRevenueData(
    base: number,
    variance: number,
    months: string[]
) {
    return months.map((bulan) => ({
        bulan,
        pendapatan: Math.max(
            0,
            base + Math.floor(Math.random() * variance - variance / 2)
        ),
    }));
}

const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni"];

const acaraData = generateRandomData(200, 100, months);
const orderData = generateRandomData(150, 80, months);
const acaraRsvpData = generateRandomData(180, 90, months);
const rsvpOrderData = generateRandomData(130, 70, months);
const laporanData = generateRandomRevenueData(7000, 3000, months);
const laporanRsvpData = generateRandomRevenueData(5000, 2000, months);

const barChartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig;

const lineChartConfig = {
    pendapatan: {
        label: "Pendapatan",
        color: "#34d399",
    },
} satisfies ChartConfig;

type ChartCardProps = {
    title: string;
    icon: React.ReactNode;
    description: string;
    link: string;
    linkSecondary: string;
    linkText: string;
    chart: React.ReactNode;
    colSpan: string;
};

function ChartCard({
    title,
    icon,
    description,
    link,
    linkSecondary,
    linkText,
    chart,
    colSpan,
}: ChartCardProps) {
    return (
        <Link href={link} className={`col-span-${colSpan}`}>
            <Card className="h-[300px] py-4 flex flex-col items-center justify-center bg-white text-gray-800 shadow-md rounded-lg border border-gray-200 hover:scale-105 transform transition-transform duration-300">
                <div className="flex items-center space-x-2 mb-2">
                    {icon}
                    <span className="text-lg font-semibold">{title}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{description}</p>
                {linkText && (
                    <Link
                        href={linkSecondary}
                        className="flex items-center text-sm text-blue-500 hover:underline space-x-1"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>{linkText}</span>
                    </Link>
                )}
                {chart}
            </Card>
        </Link>
    );
}

export default function Component() {
    return (
        <Dasbor>
            <main className="p-4 space-y-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* Berbayar Group */}
                    <section className="col-span-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                            <DollarSign className="w-6 h-6 text-gray-600" />
                            <span>Berbayar</span>
                        </h2>
                        <div className="grid grid-cols-12 gap-6">
                            <ChartCard
                                title="Acara"
                                icon={
                                    <Ticket className="w-8 h-8 text-gray-600" />
                                }
                                description="Kelola acara Anda di sini."
                                link="/dasbor/acara"
                                linkSecondary="/dasbor/acara/buat"
                                linkText="Buat"
                                chart={
                                    <BarChartComponent
                                        data={acaraData}
                                        config={barChartConfig}
                                    />
                                }
                                colSpan="4"
                            />
                            <ChartCard
                                title="Order"
                                icon={
                                    <User className="w-8 h-8 text-gray-600" />
                                }
                                description="Lihat dan kelola pesanan."
                                link="/dasbor/order"
                                linkSecondary="/dasbor/order/buat"
                                linkText="Buat"
                                chart={
                                    <BarChartComponent
                                        data={orderData}
                                        config={barChartConfig}
                                    />
                                }
                                colSpan="4"
                            />
                            <ChartCard
                                title="Check-In"
                                icon={
                                    <CheckCircle className="w-8 h-8 text-gray-600" />
                                }
                                description="Proses check-in peserta."
                                link="/dasbor/check-in"
                                linkSecondary=""
                                linkText=""
                                chart={null}
                                colSpan="4"
                            />
                        </div>
                    </section>

                    {/* RSVP Group */}
                    <section className="col-span-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                            <Calendar className="w-6 h-6 text-gray-600" />
                            <span>RSVP</span>
                        </h2>
                        <div className="grid grid-cols-12 gap-6">
                            <ChartCard
                                title="RSVP"
                                icon={
                                    <Ticket className="w-8 h-8 text-gray-600" />
                                }
                                description="Kelola undangan RSVP."
                                link="/dasbor/rsvp"
                                linkSecondary="/dasbor/rsvp/buat"
                                linkText="Buat"
                                chart={
                                    <BarChartComponent
                                        data={acaraRsvpData}
                                        config={barChartConfig}
                                    />
                                }
                                colSpan="4"
                            />
                            <ChartCard
                                title="RSVP Order"
                                icon={
                                    <User className="w-8 h-8 text-gray-600" />
                                }
                                description="Lihat pesanan RSVP."
                                link="/dasbor/rsvp-order"
                                linkSecondary="/dasbor/rsvp-order/buat"
                                linkText="Buat"
                                chart={
                                    <BarChartComponent
                                        data={rsvpOrderData}
                                        config={barChartConfig}
                                    />
                                }
                                colSpan="4"
                            />
                            <ChartCard
                                title="Check-In RSVP"
                                icon={
                                    <CheckCircle className="w-8 h-8 text-gray-600" />
                                }
                                description="Proses check-in RSVP."
                                link="/dasbor/check-in-rsvp"
                                linkSecondary=""
                                linkText=""
                                chart={null}
                                colSpan="4"
                            />
                        </div>
                    </section>

                    {/* Utama Group */}
                    <section className="col-span-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                            <Star className="w-6 h-6 text-gray-600" />
                            <span>Utama</span>
                        </h2>
                        <div className="grid grid-cols-12 gap-6">
                            <ChartCard
                                title="Kategori"
                                icon={
                                    <List className="w-8 h-8 text-gray-600" />
                                }
                                description="Atur kategori acara."
                                link="/dasbor/kategori"
                                linkSecondary=""
                                linkText=""
                                chart={null}
                                colSpan="4"
                            />
                            <ChartCard
                                title="Survei"
                                icon={
                                    <Clipboard className="w-8 h-8 text-gray-600" />
                                }
                                description="Buat dan kelola survei."
                                link="/dasbor/survei"
                                linkSecondary="/dasbor/survei/buat"
                                linkText=""
                                chart={null}
                                colSpan="4"
                            />
                            <ChartCard
                                title="Pajak"
                                icon={
                                    <Percent className="w-8 h-8 text-gray-600" />
                                }
                                description="Kelola informasi pajak."
                                link="/dasbor/pajak"
                                linkSecondary=""
                                linkText=""
                                chart={null}
                                colSpan="4"
                            />
                            <ChartCard
                                title="Kupon"
                                icon={
                                    <Ticket className="w-8 h-8 text-gray-600" />
                                }
                                description="Atur kupon diskon."
                                link="/dasbor/kupon"
                                linkSecondary=""
                                linkText=""
                                chart={null}
                                colSpan="4"
                            />
                            <ChartCard
                                title="Slider"
                                icon={
                                    <Image className="w-8 h-8 text-gray-600" />
                                }
                                description="Kelola slider halaman."
                                link="/dasbor/slider"
                                linkSecondary=""
                                linkText=""
                                chart={null}
                                colSpan="4"
                            />
                        </div>
                    </section>

                    {/* Laporan Group */}
                    <section className="col-span-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                            <BarChart className="w-6 h-6 text-gray-600" />
                            <span>Laporan</span>
                        </h2>
                        <div className="grid grid-cols-12 gap-6">
                            <ChartCard
                                title="Laporan"
                                icon={
                                    <BarChart className="w-8 h-8 text-gray-600" />
                                }
                                description="Lihat laporan lengkap."
                                link="/dasbor/laporan"
                                linkSecondary=""
                                linkText=""
                                chart={
                                    <LineChartComponent
                                        data={laporanData}
                                        config={lineChartConfig}
                                    />
                                }
                                colSpan="6"
                            />
                            <ChartCard
                                title="Laporan RSVP"
                                icon={
                                    <BarChart className="w-8 h-8 text-gray-600" />
                                }
                                description="Lihat laporan RSVP."
                                link="/dasbor/laporan-rsvp"
                                linkSecondary=""
                                linkText=""
                                chart={
                                    <LineChartComponent
                                        data={laporanRsvpData}
                                        config={lineChartConfig}
                                    />
                                }
                                colSpan="6"
                            />
                        </div>
                    </section>
                </div>
            </main>
        </Dasbor>
    );
}
