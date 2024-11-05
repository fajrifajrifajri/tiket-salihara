import Checkbox from "@/components/input/checkbox";
import { Button } from "@/components/ui/button";
import React from "react";

const Donasi: React.FC = () => {
    return (
        <div className="my-12 mx-20">
            <h3 className="font-bold text-lg mb-2">Donasi Anda</h3>
            <div className="inline-flex gap-2 mb-4 mr-2">
                {[10000, 25000, 50000, 100000].map((amount) => (
                    <div className="flex items-center gap-2">
                        <Button
                            key={amount}
                            className="border border-blue-1 bg-white px-4 py-2 font-normal text-blue-1"
                        >
                            Rp{amount.toLocaleString()}
                        </Button>
                        <Checkbox
                            checked={false}
                            onChange={() => {}}
                            label=""
                        />
                    </div>
                ))}
            </div>
            <Button className="inline-block bg-blue-1 px-6 py-2 font-normal text-white ">
                Donasikan
            </Button>
        </div>
    );
};

export default Donasi;
