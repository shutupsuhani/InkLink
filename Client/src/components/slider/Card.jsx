import "./style.css";
import styled from "styled-components";

const Prediv = styled.div`
  margin-top: 150px;
`;

const Card = ({ title, description, imageUrl }) => {
  return (
    <>
      <Prediv>
        <div className="card">
          <img src={imageUrl} alt={title} />
          <div className="card-content">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Prediv>
    </>
  );
};

export default Card;
