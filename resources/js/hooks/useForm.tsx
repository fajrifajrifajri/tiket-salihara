import { useState } from "react";

interface UseFormProps<Type> {
    initialValues: Type;
    onSubmit: (values: Type) => void;
}

export function useForm<Type>({ initialValues, onSubmit }: UseFormProps<Type>) {
    const [values, setValues] = useState<Type>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(values);
    };

    return {
        values,
        handleChange,
        handleSubmit,
        setValues,
    };
}
