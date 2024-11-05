import { cva } from "class-variance-authority";
import { FC } from "react";

interface FooterProps {
    className?: string;
}

const footerStyle = cva(
    "flex justify-between py-12 px-20 bg-black text-white text-center text-sm font-semibold"
);
const socialMediaLinks = [
    { href: "#", src: "/img/facebook-icon.png", alt: "Facebook" },
    { href: "#", src: "/img/twitter-x-icon.png", alt: "Twitter" },
    { href: "#", src: "/img/instagram-icon.png", alt: "Instagram" },
    { href: "#", src: "/img/tiktok-icon.png", alt: "TikTok" },
    { href: "#", src: "/img/youtube-icon.png", alt: "YouTube" },
];

const Footer: FC<FooterProps> = ({ className }) => {
    return (
        <footer className={footerStyle({ className })}>
            <div className="flex gap-x-8">
                <p>Jl. Salihara 16, Pasar Minggu, Jakarta 12520</p>
                <p>Syarat dan Ketentuan</p>
            </div>
            <div className="flex justify-center items-center space-x-4">
                {socialMediaLinks.map(({ href, src, alt }, index) => (
                    <a key={index} href={href}>
                        <img src={src} alt={alt} height={13} />
                    </a>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
