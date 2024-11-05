import React from "react";

interface LogoProps {
    src: string;
    alt: string;
    isScrolled: boolean;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt, isScrolled, className }) => {
    return (
        <div>
            <img
                src={src}
                alt={alt}
                width={isScrolled ? 170 : 180}
                height={isScrolled ? 89 : 99}
                className={className}
            />
            <span
                className={`block ${
                    isScrolled ? "ml-[75px]" : "ml-[80px]"
                } transition-all duration-300 ease-in-out leading-5 font-medium text-dark-1`}
            >
                Tiket dan pendaftaran untuk acara <br /> di Komunitas Salihara
            </span>
        </div>
    );
};

export default Logo;
