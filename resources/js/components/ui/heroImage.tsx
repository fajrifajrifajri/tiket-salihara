import { cva } from "class-variance-authority";

const HeroImageStyle = cva(
    "w-full bg-gray-200 flex items-center justify-center"
);

// Define a type for the props
type HeroImageProps = {
    src: string;
    alt: string;
};

export default function HeroImage({ src, alt }: HeroImageProps) {
    return (
        <div className={HeroImageStyle()}>
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    );
}
