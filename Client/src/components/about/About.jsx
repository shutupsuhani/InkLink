import { useEffect } from "react";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation only happens once
    });
  }, []);

  const s = "About Us";

  return (
    <div>
      <h1>{s}</h1>
      <div className="about" id="about">
        <div className="about-left" data-aos="fade-right">
          <img src="doc.png" alt="" className="about-img" />
        </div>
        <div className="about-right" id="heading" data-aos="fade-left">
          <h2>Bridging the gap between ideas and solutions</h2>
          <div className="about-right-div2">
            <p>
              InkLink serves as a comprehensive solution for individuals and
              professionals seeking efficient document organization, conversion,
              and annotation capabilities. It addresses the common challenges
              associated with managing digital documents and provides a
              user-friendly platform to streamline document-related tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
