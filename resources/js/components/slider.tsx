import { cva } from "class-variance-authority";

const sliderStyle = cva("w-full bg-gray-200 flex items-center justify-center");

export default function Slider() {
    return (
        <div className={sliderStyle()}>
            <img
                src="/img/masa-kritis.png"
                alt="Event"
                className="w-full h-full object-cover"
            />
            <div className="absolute text-white text-3xl">
                <h3 className="">Pameran</h3>
                <h2 className="font-bold">Common Sanctum</h2>
                <p className="">07 Maret - 03 April 2024</p>
            </div>
        </div>
    );
}
