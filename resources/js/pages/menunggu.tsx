import { Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import Depan from "@/layouts/depan";

export default function Component() {
    return (
        <Depan className="md:px-40 mx-2 py-10 md:ml-[80px]">
            <div className="min-h-[620px] flex flex-col items-center">
                <div className="w-full max-w-lg p-8 space-y-8">
                    <div className="flex flex-col items-center space-y-4">
                        <Hourglass className="w-12 h-12 text-gray-600" />
                        <h1 className="text-xl font-medium">DALAM PROSES...</h1>
                        <p className="text-sm text-gray-600">
                            01 November 2024, 22:31
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="text-center">
                            <span className="text-sm text-gray-600">Rp</span>
                            <p className="text-4xl font-bold">140.000</p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span>
                                    Tiket Common Sanctum - Early Bird (1x)
                                </span>
                                <span className="text-gray-600">
                                    <span className="text-xs">Rp</span>40.000
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span>Tiket Sanctuary Place - Umum (2x)</span>
                                <span className="text-gray-600">
                                    <span className="text-xs">Rp</span>100.000
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => (window.location.href = "/")}
                        >
                            KE BERANDA
                        </Button>
                    </div>
                </div>
            </div>
        </Depan>
    );
}
