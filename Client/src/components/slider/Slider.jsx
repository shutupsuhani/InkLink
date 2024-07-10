import Slider from "react-slick";
import Card from "./Card.jsx"; // Import the Card component
import './style.css';
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardSlider = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const Prediv = styled.div`
    margin-top: 200px;
  `;

  const cardsData = [
    {
      title: "Upload Docs",
      description: "Keep Your Docs Safe without using Safe.",
      imageUrl: "upload.png",
      way: "/doc"
    },
    {
      title: "Document Type Converter",
      description: "Convert your *.jpg, png file to pdf",
      imageUrl: "convert.png",
      way: "/document-converter"
    },
    {
      title: "Scribble Feature",
      description: "Generate and Draw your E-Sign",
      imageUrl: "register.jpg",
      way: "/doc"
    },
    {
      title: "AI-Help",
      description: "Get the information of any Image",
      imageUrl: "ai.png",
      way: "/ai-help"
    }
  ];

  return (
    <>
     
        <div className="card-slider">
          <Slider {...settings}>
            {cardsData.map((card, index) => (
              <Link key={index} to={card.way}>
                <Card
                  title={card.title}
                  description={card.description}
                  imageUrl={card.imageUrl}
                />
              </Link>
            ))}
          </Slider>
        </div>
      
    </>
  );
};

export default CardSlider;
