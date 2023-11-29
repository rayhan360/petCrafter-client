import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import slider1 from "../../../assets/gallery1.jpg";
import slider2 from "../../../assets/gallery2.jpg";
import slider3 from "../../../assets/gallery3.jpg";
import slider4 from "../../../assets/cat_dog_img.png";
import slider5 from "../../../assets/fluffy.jpeg";
import slider6 from "../../../assets/groupDog.png";
import Title from "../../../components/Common/Title";

const Gallery = () => {
  return (
    <div>
      <Title heading="Gallery" subHeading="IMAGE TOUR"></Title>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-20"
      >
        <SwiperSlide>
          <img src={slider1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider6} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Gallery;
