import React from "react";

interface RadioProps {
    name: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
    label: string;
}

const Radio: React.FC<RadioProps> = ({
    name,
    value,
    checked,
    onChange,
    label,
}) => {
    return (
        <label>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
            />
            {label}
        </label>
    );
};

export default Radio;
