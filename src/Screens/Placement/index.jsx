import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import PlaceCard from "./PlaceCard";
import { PlacementGraph, Bubble_bg, Men, Women } from "../../Assets";
import Footer from "../Footer";
import "./Placement.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Placement = (props) => {
  let data = props?.data?.StudentReviews || [];
  let statistics = props?.data;
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

  let feedback = [
    {
      content:
        "When compared to watching YouTube videos and learning it on my own, learning it in person was really a great advantage given to me. Whenever a doubt was raised, it was clarified patiently by the instructor. Usually training institutes teach and go, but Better Tomorrow worked along with us and encouraged us to think in different ways while guiding us. Implementing things hands-on really helped me understand the compile-time errors I make and the run-time errors that occur when I code.",
      author: "Jessica R",
      college: "Dream Training",
    },
    {
      content:
        "At all times the trainer keep everyone's attention on the listing(i,e) out of 70/70 members. 1st time i didn't sleep for a sec in whole 8 hrs in these 9 days. Your teaching and lab sections were more intractive to me. The main thing that you have teached is how to understand and learn by own(i,e) by searching. In each concepts you had compared the java lang with other languages that Why java is more preferable and special and unique thing in java so i like java more than before. In each problems you told everything",
      author: "Arunmozhi K ",
      college: "Java Training",
    },
    {
      content:
        "Before attending this program, my knowledge of MERN was limited to a basic understanding of its components. However, after completing the training, I feel much more confident and equipped with the necessary skills to delve deeper into MERN development. I have gained a more comprehensive understanding of the architecture, tools, and best practices involved in MERN stack development. This newfound knowledge has boosted my confidence and motivation to further explore and master MERN.",
      author: "Mohamed Shaik Mahsook M A",
      college: "MERN Stack Training",
    },
    {
      content:
        "I'm from biology background who took ECE in counseling but im very much interested to learn coding.so I learnt c,c++,and python by watching YouTube channels during lockdown.After hearing so many myths like Java is the toughest so I decided not to learn Java .But this training session broke all those thoughts from me and I understood all the topics very clearly both in practically and theoretically.Thanks a lot!!",
      author: "Sri devi J ",
      college: "Dream Training",
    },
    {
      content:
        "Your way of explaining the topics makes you unique and also the way of approaching, the efforts you take to make every single one of us understand the concepts is really great and also the way you explain a problem statement and giving us time to approach the problem from different perspectives and at last sharing your point of view in solving the problem is really good. ",
      author: "Shalini K M",
      college: "Java Training",
    },
    {
      content:
        "I have learned new things every single there wasn't day I felt like this day was wasted and I was really lacking or felt difficult to understand how the node.js part works but after attending your session I got a clear idea on how it works and yeah!!!!! I am pretty sure that it will help me to improve or dive deep in the MERN stack development and to tell something personally I have never ever gave a feedback for a session in my life but this is the first ever training were I gave a feedback with my own interest REALLY REALLY THANKS FOR THIS OPPORTUNITY",
      author: "SANJEEV RATHAN R",
      college: "MERN Stack Training",
    },
    {
      content:
        "Feeling happy to be a part of this training. I can't even able to solve single problem in any platforms before training, but after this I can able to solve more than before. I can feel the improvement of my own in learning new languages and also new concepts after the training. After this Training I can able to follow the consistency in problem solving.",
      author: "Mathan S",
      college: "Dream Training",
    },
    {
      content:
        "It's just perfect and extremely awesome. Nothing boring during training. Feels comfortable to learn. Everyday is very interesting. Thankyou for everything. Will take all from the training and do in my upcoming projects. I didn't text this much content for any trainings.. For the very first time I text this much long...You guys are the best. Grateful:) Best training ever...",
      author: "Dhivya Bharathi T",
      college: "MERN Stack Training",
    },
    {
      content:
        "Yes first I thought Java va but tough since everyone addressed it as tough but after the training I felt Java is more interesting language and still it's been an month after training once I could just turn the pages I can recall all the topics that's thought... It stuck in my mind and understood the core concepts of Java in a more easy way. Our trainer thought us very well and connected the real world entity with the java language and we was friendly enough to clear doubts whenever we need any help or we stuck in between the class",
      author: "SANJEEV RATHAN R",
      college: "MERN Stack Training",
    },
  ];

  return (
    <div className="Placement">
      <div className="Head_wrap">
        <Header />
      </div>
      <div
        className="Placement_banner"
        style={{
          backgroundImage: `url(${Bubble_bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="banner_left">
          <h1 style={{ marginBottom: "10px" }}>
            Fostering a <br />
            Better Tomorrow <br />
            through the power of learning in action
          </h1>
        </div>
        <div className="banner_right">
          <div className="bubble first">
            <p>
              <span>{statistics.studentsPlaced}+</span> <br />
              Students Placed
            </p>
          </div>
          <div className="bubble sec">
            <p>
              <span>{statistics.highestPackage}</span> <br />
              Highest Package
            </p>
          </div>
          <div className="bubble third">
            <p>
              <span>{statistics.hiringCompanies}+</span> <br />
              Hiring Companies
            </p>
          </div>
          <div className="bubble four">
            <p>
              <span>{statistics.productOffers}+</span> <br />
              Product Offers
            </p>
          </div>
        </div>
      </div>
      <h1 style={{ marginBottom: isMobile ? "30px" : "0px" }}>
        Our top 100+ Hiring Companies, <br />
        Where you can find high-paying jobs
      </h1>
      <img src={PlacementGraph} alt="graph" className="graph" />
      <h1 style={{ marginBottom: isMobile ? "30px" : "0px" }}>
        Real Stories, Real Results: <br />
        Our Students' Success Stories
      </h1>
      <div className="PlaceCard_container">
        <Swiper
          spaceBetween={60}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  marginRight: isMobile ? "10px" : "0px",
                  margin: isMobile ? "0px" : "50px",
                }}
              >
                <div className="PlaceCard">
                  <div className="CardHead">
                    <div
                      className="circle"
                      style={{
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundImage:
                          item.gender === "men"
                            ? `url(${Men})`
                            : `url(${Women})`,
                      }}
                    ></div>
                    <div className="desc">
                      <h1>{item.name}</h1>
                      <p style={{ textAlign: "left" }}>{item.job}</p>
                    </div>
                  </div>
                  <h5>{item.description}</h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h1
        style={{
          marginBottom: isMobile ? "30px" : "0px",
          marginTop: isMobile ? "30px" : "0px",
        }}
      >
        What students say about our training
      </h1>
      <p>
        At Better Tomorrow, we assist in developing practical skills with
        hands-on expertise and enhance your learning ability to excel in your
        preferred domain. The feedback below is genuine, without a single letter
        altered.
      </p>
      <div className="feedback_slider">
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {feedback.map((feedbackText, index) => (
            <SwiperSlide key={index}>
              <div
                className="innerbox"
                style={{
                  marginRight: isMobile ? "10px" : "0px",
                  margin: isMobile ? "0px" : "30px",
                }}
              >
                <div
                  className="training_box"
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "#FFC727"
                        : index % 3 === 0
                        ? "#FF8383"
                        : "#7ABCFF",
                    height: "auto",
                    overflow: "visible",
                  }}
                >
                  {feedbackText.content}
                  <div>
                    <div className="Authortext">
                      -{feedbackText.author}
                      <br />
                      {feedbackText.college}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Footer />
    </div>
  );
};

export default Placement;
