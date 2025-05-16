import React, { useRef } from "react";
import "./First.scss";
import { illustration } from "../../../Assets";
import { useSpring, animated } from "react-spring";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: parseInt(n) },
    delay: 500,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return <animated.span>{number.to((val) => Math.floor(val))}</animated.span>;
}

const First = (props) => {
  const achievementsData = props.data;

  // Reference for the target component
  const successRef = useRef(null);

  // Scroll with a specified offset
  const handleGetStartedClick = () => {
    // Example: Scroll down by 500px
    window.scrollBy({
      top: 2150, // Scroll down 500px
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  return (
    <div className="First">
      <div className="GetStarted">
        <div className="Content">
          <h1>
            Education is not the learning <br /> of facts, but the training{" "}
            <br /> of the mind to think
          </h1>
          <p>
            Empowering independent learning fueled by senior developers from
            leading MNCs. Instead of bringing our presentations we provide
            problem statements, foster a comfortable environment, and track
            individual progress for optimal growth.
          </p>
          <button onClick={handleGetStartedClick}>Get Started &gt;</button>
        </div>
        <div className="illustration">
          <img src={illustration} alt="pic" />
        </div>
      </div>
      {/* Target Section */}
      <div className="Empowering" ref={successRef}>
        <h1>Catalysing Your Path to Success</h1>
        <div className="success">
          <div className="field">
            <h1>
              <Number
                n={achievementsData?.averagePackage || 0}
              />{" "}
              LPA
            </h1>
            <p>Average Dream Job CTC</p>
          </div>
          <div className="line"></div>
          <div className="field">
            <h1>
              <Number
                n={achievementsData?.productOffers || 0}
              />{" "}
              +
            </h1>
            <p>Product Offers</p>
          </div>
          <div className="line"></div>
          <div className="field">
            <h1>
              <Number
                n={(achievementsData?.jobOppurtunities || 0) * 1000}
              />{" "}
              +
            </h1>
            <p>Job Opportunities</p>
          </div>
          <div className="line"></div>
          <div className="field">
            <h1>
              <Number
                n={achievementsData?.highestPackage || 0}
              />{" "}
              LPA
            </h1>
            <p>Highest Package</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First;
