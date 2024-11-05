import { cva } from "class-variance-authority";
import { FC } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import PopupTiket from "../pages/acara/popupTiket";

interface NavBeliProps {
    className?: string;
}

const navBeliStyle = cva(
    "fixed flex bottom-0 w-full py-8 px-20 text-sm font-semibold"
);

const NavBeli: FC<NavBeliProps> = ({ className }) => {
    return (
        <div className={navBeliStyle({ className })}>
            <div className="flex gap-x-4 ml-auto">
                <Dialog>
                    <DialogTrigger>
                        <Button className="">BELI TIKET</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <PopupTiket />
                    </DialogContent>
                </Dialog>

                <Button className="bg-gray-2 text-purple-1">BANTUAN</Button>
            </div>
        </div>
    );
};

export default NavBeli;
