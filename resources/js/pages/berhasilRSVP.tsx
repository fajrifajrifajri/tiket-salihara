import Depan from "@/layouts/depan";
import { Link } from "@inertiajs/react";

export default function Component() {
    return (
        <Depan className="px-20 py-10 ml-[80px]">
            <div className="min-h-[620px] flex flex-col items-center">
                <div className="inline-flex mx-auto my-8 py-1 px-20 border border-red-400 text-center text-red-400 font-medium text-base">
                    Terimakasih! <br /> tiket RSVP akan terkirim ke email anda.
                </div>
                <Link className="underline" href="/">
                    KE BERANDA
                </Link>
            </div>
        </Depan>
    );
}
