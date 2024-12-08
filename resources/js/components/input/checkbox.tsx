import React from "react";

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    labelClassName?: string;
    inputClassName?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onChange,
    label,
    labelClassName,
    inputClassName,
}) => {
    return (
        <label className={labelClassName}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className={inputClassName}
            />
            {label}
        </label>
    );
};

export default Checkbox;
