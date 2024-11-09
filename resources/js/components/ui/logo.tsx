import React from "react";

interface LogoProps {
    isScrolled: boolean;
    className?: string;
    showDescription?: boolean;
}

const Logo: React.FC<LogoProps> = ({
    isScrolled,
    className,
    showDescription = true,
}) => {
    return (
        <div>
            <img
                src="/img/logo-tiket.png"
                alt="Logo"
                width={isScrolled ? 170 : 170}
                height={isScrolled ? 89 : 89}
                className={className}
            />
            {showDescription && (
                <span
                    className={`block ${
                        isScrolled ? "ml-[80px]" : "ml-[80px]"
                    } transition-all duration-300 ease-in-out leading-5 font-medium text-dark-1`}
                >
                    Tiket dan pendaftaran untuk acara <br /> di Komunitas
                    Salihara
                </span>
            )}
        </div>
    );
};

export default Logo;
