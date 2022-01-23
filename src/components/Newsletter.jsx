import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive"; 

const Container = styled.div`
  height: 30vh;
  background-color: #fcf5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const Title = styled.h1`
  font-size: 50px;
  ${mobile({fontSize:"32px"})}
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({textAlign:"center",fontSize:"18px"})}
`;
const InputContainer = styled.div`
  width: 30%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;

  ${mobile({width:"80%"})}

`;
const Input = styled.input`
  border: none;
  flex:8;
  padding-left: 20px;
 
:focus{
    outline: none;
}
`;
const Button = styled.button`
flex:1;
border:none;
background-color: teal;
color:white;
cursor: pointer;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>News Letter</Title>
      <Description>Don't miss updates from our products</Description>
      <InputContainer>
        <Input placeholder="Your Email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
