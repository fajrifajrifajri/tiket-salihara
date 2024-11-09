import HeadingDasbor from "@/components/dasbor/headingDasbor";
import { EditSurveiList } from "@/components/dasbor/editSurveiList";
import Dasbor from "@/layouts/dasbor";
import { Button } from "@/components/ui/button";

export default function Component() {
    return (
        <Dasbor>
            <main>
                <HeadingDasbor title="EDIT SURVEI" />
                <h3 className="mb-8 text-xl font-semibold">
                    Nama Survei: <span>SURVEI #1</span>
                </h3>
                <EditSurveiList />
                <div className="inline-flex flex-col gap-y-4">
                    <Button>+ Pertanyaan</Button>
                    <Button>Simpan</Button>
                </div>
            </main>
        </Dasbor>
    );
}
