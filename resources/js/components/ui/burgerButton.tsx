import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ButtonList from "./buttonList";

export default function BurgerButton() {
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <img
                        src="/img/burger-menu-open.png"
                        alt="burger menu open"
                        width={34}
                        height={25}
                    />
                </SheetTrigger>
                <SheetContent className="bg-gray-2">
                    <ButtonList href="https://salihara.org" variant="list">
                        SALIHARA.ORG
                    </ButtonList>
                    <ButtonList href="#" variant="list">
                        ACARA
                    </ButtonList>
                    <ButtonList href="#" variant="list">
                        KELAS
                    </ButtonList>
                    <ButtonList href="#" variant="list">
                        SEWA
                    </ButtonList>
                    <ButtonList href="#" variant="lastList">
                        INFO
                    </ButtonList>
                </SheetContent>
            </Sheet>
        </div>
    );
}
