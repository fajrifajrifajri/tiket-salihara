import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";

export const UbahButton = () => {
    return (
        <Button variant="link" className="text-gray-3" size="xs">
            <Pencil />
        </Button>
    );
};

export const HapusButton = () => {
    return (
        <Button variant="link" className="text-red-500" size="xs">
            <Trash />
        </Button>
    );
};
