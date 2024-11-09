import Dasbor from "@/layouts/dasbor";

import HeadingDasbor from "@/components/dasbor/headingDasbor";
import TicketForm from "@/components/dasbor/ticketForm";

const categories = [
    { value: "semua", label: "SEMUA" },
    { value: "pameran", label: "PAMERAN" },
    { value: "teater", label: "TEATER" },
    { value: "musik", label: "MUSIK" },
    { value: "diskusi", label: "DISKUSI" },
    { value: "tari", label: "TARI" },
];

export default function Component() {
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="ORDER BARU BERBAYAR" />

                <TicketForm categories={categories} />
            </main>
        </Dasbor>
    );
}
