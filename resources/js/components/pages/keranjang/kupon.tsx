import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface KuponProps {
    onApply: (code: string) => void;
}

const Kupon: React.FC<KuponProps> = ({ onApply }) => {
    const [code, setCode] = React.useState("");

    return (
        <div className="mb-12 ml-8">
            <h2 className="text-sm font-semibold mb-2">
                Punya Kupon? Masukkan Kode Kupon
            </h2>
            <Input
                type="text"
                className="inline-block w-auto mr-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Masukkan kode kupon"
            />
            <Button onClick={() => onApply(code)} className="bg-dark-1">
                Gunakan
            </Button>
        </div>
    );
};

export default Kupon;
