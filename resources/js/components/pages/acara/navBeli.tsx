import { cva } from "class-variance-authority";
import { FC } from "react";
import { Button } from "../../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import PopupTiket from "./popupTiket";

interface NavBeliProps {
    className?: string;
    acara: any;
    type: "berbayar" | "rsvp";
    tiketDetail: any;
}

const navBeliStyle = cva(
    "fixed flex bottom-0 w-full py-8 px-20 text-sm font-semibold"
);

const NavBeli: FC<NavBeliProps> = ({ className, acara, type, tiketDetail }) => {
    return (
        <div className={navBeliStyle({ className })}>
            <div className="flex gap-x-4 ml-auto">
                <Dialog>
                    <DialogTrigger className="bg-black text-white px-4 py-2">
                        {type === "berbayar" ? "BELI TIKET" : "RSVP"}
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle></DialogTitle>
                        <PopupTiket acara={acara} tiketDetail={tiketDetail} />
                    </DialogContent>
                </Dialog>

                <Button className="bg-gray-2 text-purple-1">BANTUAN</Button>
            </div>
        </div>
    );
};

export default NavBeli;
