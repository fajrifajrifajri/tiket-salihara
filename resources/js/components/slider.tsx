import { cva } from "class-variance-authority";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const sliderStyle = cva(
    "relative w-full h-[300px] md:h-auto bg-gray-200 flex  justify-center"
);

export default function Slider({ slider }: { slider: any }) {
    return (
        <div className={sliderStyle()}>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {slider.map((item: any) => (
                    <SwiperSlide>
                        <img
                            key={item.id}
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
