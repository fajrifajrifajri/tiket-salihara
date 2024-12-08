import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";

export const UbahButton: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
    return (
        <Button variant="link" className="text-gray-3" size="xs" {...props}>
            <Pencil />
        </Button>
    );
};

export const HapusButton: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
    return (
        <Button variant="link" className="text-red-500" size="xs" {...props}>
            <Trash />
        </Button>
    );
};
