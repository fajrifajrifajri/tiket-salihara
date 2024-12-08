import { cva } from "class-variance-authority";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

const sliderStyle = cva(
    "relative w-full h-[300px] md:h-auto max-h-[700px] bg-gray-200 flex justify-center"
);

export default function Slider({ slider }: { slider: any }) {
    return (
        <div className={sliderStyle()}>
            <Swiper
                modules={[EffectFade]}
                effect="fade"
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {slider.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <img
                            src={item.gambar}
                            alt="Event"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute md:left-96 top-1/2 text-white text-3xl"></div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
