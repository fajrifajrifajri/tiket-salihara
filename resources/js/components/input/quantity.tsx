import React from "react";

interface QuantityInputProps {
    quantity: number;
    onChange: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
    quantity,
    onChange,
}) => {
    return (
        <div className="grid grid-cols-3 px-6 w-[109px] border border-gray-3 text-black">
            <button
                onClick={() => onChange(quantity - 1)}
                disabled={quantity <= 0}
                className="col-span-1"
            >
                -
            </button>
            <span className="col-span-1 flex justify-center">{quantity}</span>
            <button
                onClick={() => onChange(quantity + 1)}
                className="col-span-1"
            >
                +
            </button>
        </div>
    );
};

export default QuantityInput;
