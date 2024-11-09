import { cva } from "class-variance-authority";

const sliderStyle = cva(
    "relative w-full h-[300px] md:h-auto bg-gray-200 flex  justify-center"
);

export default function Slider() {
    return (
        <div className={sliderStyle()}>
            <img
                src="/img/masa-kritis.png"
                alt="Event"
                className="w-full h-full object-cover"
            />
            <div className="absolute md:left-96 top-1/2 text-white text-3xl">
                <h3 className="">Pameran</h3>
                <h2 className="font-bold">Common Sanctum</h2>
                <p className="">07 Maret - 03 April 2024</p>
            </div>
        </div>
    );
}
