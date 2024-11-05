import { cva } from "class-variance-authority";
import { FC } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PopupTiket from "./popupTiket";

interface NavBeliProps {
    className?: string;
    type: "Tiket" | "RSVP"; // Define the type prop to determine behavior
}

const navBeliStyle = cva(
    "fixed flex bottom-0 w-full py-8 px-20 text-sm font-semibold"
);

const NavBeli: FC<NavBeliProps> = ({ className, type }) => {
    return (
        <div className={navBeliStyle({ className })}>
            <div className="flex gap-x-4 ml-auto">
                <Dialog>
                    <DialogTrigger>
                        <Button>
                            {type === "Tiket" ? "BELI TIKET" : "RSVP"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <PopupTiket type={type} />
                    </DialogContent>
                </Dialog>

                <Button className="bg-gray-2 text-purple-1">BANTUAN</Button>
            </div>
        </div>
    );
};

export default NavBeli;
