import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";

import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({height:"50vh"})}

  
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;

  ${mobile({height:"30px",width:"30px"})}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
 transition:all 1.5s ease;
  transform: translateX(${props=>props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  ${mobile({height:"50vh"})}
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  ${mobile({display:"none"})}
`;
const Image = styled.img`
  height: 70vh;
  width: 100%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;


  ${mobile({padding:"25px",display:"flex",flexDirection:"column",
            alignItems:"center"})}

`;

const Title = styled.h1`
  font-size: 50px;
  ${mobile({fontSize:"32px",textAlign:"center"})}
`;
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;

  ${mobile({letterSpacing:"2px",textAlign:"center"})}
`;
const Button = styled.button`

  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
  ${mobile({padding:"8px",fontSize:"18px"})}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {

        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length-1);
    }else{

        setSlideIndex(slideIndex < sliderItems.length-1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined></ArrowLeftOutlined>
      </Arrow>
      <Wrapper slideIndex={slideIndex} >
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id} >
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title >{item.title}</Title>
              <Desc>{item.desc}</Desc>
             
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined></ArrowRightOutlined>
      </Arrow>
    </Container>
  );
};

export default Slider;
