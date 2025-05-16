import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import "./Fourth.scss";

const Fourth = (props) => {
    const data = props.data?.College1;
    const [isForward, setIsForward] = useState(true);  // State to track the direction

    useEffect(() => {
        // Reset direction to forward after the component mounts
        setIsForward(true);
    }, []);

    const handleSlideChange = (swiper) => {
        if (swiper.isEnd) {
            // If the last slide is reached, reverse the direction
            setIsForward(false);
        } else if (swiper.isBeginning) {
            // If the first slide is reached, switch back to forward
            setIsForward(true);
        }
    };

    return (
        <div className="Fourth">
            <h1>Learning in Action than thinking about it</h1>
            <div className="Swiper-wrapper">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        reverseDirection: !isForward,  // Reverse the direction based on state
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    onSlideChange={handleSlideChange}  // Handle slide change event
                    className="mySwiper"
                >
                    {
                        data?.map((elem, index) => (
                            <SwiperSlide key={index}>
                                <div className="slide">
                                    <div className="slideImg">
                                        <img src={elem.img.filename} alt="Our Esteemed Client Institutions" />
                                    </div>
                                    <h3>{elem.subHead}</h3>
                                    <h2>{elem.head}</h2>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Fourth;
