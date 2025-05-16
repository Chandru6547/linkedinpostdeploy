import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { linkiicon } from "../../Assets";

const Frame = (props) => {
  let data = props.data;
  
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

  const handleBlogClick = (link) => {
    window.open(link, "_blank"); // Open the link in a new tab
  };

  return (
    <div className="blogs px-4 py-8">
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
            <div className="flex justify-center">
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 mb-10 w-[300px] max-md:mr-10 max-md:w-full h-[420px]"
                onClick={() => handleBlogClick(blog.link)}
              >
                <div className="bg-gray-200 p-4 flex justify-end">
                  <img src={linkiicon} alt="LinkedIn" className="w-10 h-10" />
                </div>

                <div className="relative">
                  <div className="h-48 bg-gradient-to-b from-blue-500 to-blue-700 flex justify-center items-center">
                    <span className="text-white font-bold text-lg uppercase">
                      {blog.company}
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 border-t border-blue-300 flex flex-col justify-between gap-2 h-[170px]">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-blue-100 text-blue-900 font-bold text-sm py-1 px-3 rounded-full">
                      {blog.colleges}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-900 font-bold text-sm py-1 px-3 rounded-full">
                      {blog.noOfStudentsPlaced}{" "}
                      {blog.noOfStudentsPlaced === "1" ? "student" : "students"}
                    </span>
                  </div>

                  <div className="ml-2 mb-2">
                    <span className="text-blue-500 text-[15px] font-bold">
                      {blog.training}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Frame;
