import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import the navigation styles
import { Pagination, Navigation } from "swiper/modules";
import { linkiicon } from "../../Assets"; // Ensure the path is correct for your assets
import "./linkedinFrame.scss";

const Frame2 = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let data = props.data;
  
  return (
    <div className="blogs">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="card-swiper"
      >
        {data.map((blog, index) => (
          <SwiperSlide key={index}>
            <div
              className={`flex justify-center transition-transform transform scale-95`}
            >
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 mb-10 w-[300px] max-md:mr-10 max-md:w-full h-[420px]"
                onClick={() => window.open(blog.link, "_blank")}
              >
                <div className="bg-gray-200 p-4 flex justify-end">
                  <img src={linkiicon} alt="LinkedIn" className="w-10 h-10" />
                </div>

                <div className="relative">
                  <div className="h-48 bg-gradient-to-b from-blue-500 to-blue-700 flex justify-center items-center p-6 text-left">
                    <span className="text-white font-bold text-lg uppercase">
                      {blog.Category}
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 border-t border-blue-300 h-full">
                  <b className="text-blue-900 font-bold text-xl mt-2 block">
                    {blog.company}
                  </b>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Frame2;
