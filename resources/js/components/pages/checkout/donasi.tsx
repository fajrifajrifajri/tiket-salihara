import Checkbox from "@/components/input/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface DonasiProps {
    onDonationChange: (amount: number) => void;
}

const Donasi: React.FC<DonasiProps> = ({ onDonationChange }) => {
    const [selectedAmount, setSelectedAmount] = useState<number>(0);

    const handleDonationChange = (amount: number) => {
        if (selectedAmount === amount) {
            setSelectedAmount(0);
        } else {
            setSelectedAmount(amount);
        }
    };

    const handleDonasikanClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        onDonationChange(selectedAmount);
    };

    return (
        <>
            <h3 className="font-bold text-lg mb-2">Donasi Anda</h3>
            <div className="inline-flex gap-2 mb-4 mr-2">
                {[10000, 25000, 50000, 100000].map((amount) => (
                    <div key={amount} className="flex items-center gap-2">
                        <Label
                            htmlFor={`donasi-${amount}`}
                            onClick={() => handleDonationChange(amount)}
                        >
                            <Button
                                className={`border border-blue-1 bg-white px-4 py-2 font-normal text-blue-1 ${
                                    selectedAmount === amount
                                        ? "bg-blue-100"
                                        : ""
                                }`}
                                onClick={(e) => e.preventDefault()}
                            >
                                Rp{amount.toLocaleString()}
                            </Button>
                        </Label>
                        <Checkbox
                            id={`donasi-${amount}`}
                            checked={selectedAmount === amount}
                            onChange={() => handleDonationChange(amount)}
                            label=""
                        />
                    </div>
                ))}
            </div>
            <Button
                className="inline-block bg-blue-1 px-6 py-2 font-normal text-white"
                onClick={(e) => handleDonasikanClick(e)}
            >
                Donasikan
            </Button>
        </>
    );
};

export default Donasi;
