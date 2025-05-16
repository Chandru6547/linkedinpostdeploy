import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { render } from "storyblok-rich-text-react-renderer";


import Graph from "../Graph";
import "./Fifth.scss";

const Fifth = (props) => {
  console.log(props);
  let carddata = props?.data?.cards;
  console.log(carddata.Cards);
  
  const logoArray1 = [
    "https://www.pngmart.com/files/8/Amazon-PNG-Pic.png",
    "https://www.freepnglogos.com/uploads/flipkart-Rathinam Technical Campuslogo-png/flipkart-logo-transparent-vector-3.png",
    "https://1000logos.net/wp-content/uploads/2021/04/Adobe-logo.png",
  ];

  const logoArray2 = [
    "https://vtlogo.com/wp-content/uploads/2021/07/temenos-vector-logo.png",
    "https://cionews.co.in/wp-content/uploads/2022/08/Agg-6-7.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1200px-Tata_Consultancy_Services_Logo.svg.png",
  ];

  const graphProp = props?.data?.pagedata[1];

  const testimonials = carddata.Cards;


  return (
    <div className="Fifth">
      <div className="Student">
        <h1>
          Our Commitment Towards Mentorship <br /> Makes Us Unique
        </h1>
      </div>

      {/* Swiper Slider Section */}
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="swiper-container"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          424: {
            slidesPerView: 1,
          }
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="screenshot-container">
              <div className="top-row">
                <div className="profile-section">
                  <img src={item?.image?.filename} alt="Profile" className="profile-img" />
                  <div className="info">
                    <div className="name-line">
                      <span className="name">{item.name}</span>
                      <span className="dot"> • {item.connection}</span>
                    </div>
                    <div className="title">{item.designation}</div>
                    <div className="timestamp">{item.date}</div>
                  </div>
                </div>
                <div className="actions">
                 &nbsp;&nbsp; <div className="follow">+ Follow</div>
                  <div className="dots">⋯</div>
                </div>
              </div>
              <div className="post-body">
                {render(item.Content)}
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Add more <SwiperSlide> blocks here for testing */}
      </Swiper>

      {/* Company Logos Section */}
      <div className="mt-10">
        <h1
          className="font-poppins text-center font-extrabold text-[#053859] my-5"
          style={{
            fontSize: "clamp(30px, 2.8vw, 5vw)",
            lineHeight: "clamp(40px, 3.5vw, 4vw)",
          }}
        >
          Our Graduates Pathway To Success
        </h1>
        <div className="flex items-center justify-center flex-wrap my-10 px-10">
          <div className="relative overflow-hidden w-full h-[175px]">
            <div className="flex animate-bounce-x my-10">
              {logoArray1.concat(logoArray1).map((elem, index) => (
                <img
                  key={index}
                  src={elem}
                  alt={`Logo ${index}`}
                  className="h-[125px] w-[200px] p-[15px] rounded-lg shadow-md grayscale mx-[15px]"
                />
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden w-full h-[175px] mt-6">
            <div className="flex animate-bounce-y py-5">
              {logoArray2.concat(logoArray2).map((elem, index) => (
                <img
                  key={index}
                  src={elem}
                  alt={`Logo ${index}`}
                  className="h-[125px] w-[200px] p-[15px] rounded-lg shadow-md grayscale mx-[15px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="Placements">
        <h1 style={{ textAlign: "center" }}>
          Full Stack Web Development Using MERN Stack In 15 Days, Students Momentous Transformations
        </h1>
        <Graph data={graphProp} />
      </div>
    </div>
  );
};

export default Fifth;
