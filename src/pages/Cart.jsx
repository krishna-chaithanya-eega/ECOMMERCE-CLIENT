import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { useHistory } from "react-router";


import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import {userRequest} from "../apis/ecommerce"

const KEY="pk_test_51KKbn7AJyFQljqNeL5q9FXjDIWFV03TDwD1NCsrkpu548XxJiBfP7Ivbx579BDDp9wpB6eu9ANDzxkVnt1lci9gz00IeFTrXaZ";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "color")};
`;

const TopTexts = styled.div`
${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
    padding: 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;

  ${mobile({ flexDirection: "column" })}
`;
const Image = styled.img`
  width: 200px;

  
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${mobile({ padding: "0px" })}
`;
const ProductName = styled.span`
${mobile({ marginBottom: "5px" })}
`;
const ProductId = styled.span`
${mobile({ marginBottom: "5px" })}
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  ${mobile({ marginBottom: "5px" })}
`;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  ${mobile({ flexDirection: "row",justifyContent:"space-between",marginBottom:"5px",paddingTop:"5px" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ marginBottom: "0px" })} 

`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius:10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle=styled.h1`
    font-weight: 200;
`;
const SummaryItem=styled.div`
    margin :30px 0px;
    display: flex;
    justify-content: space-between;

    font-weight: ${props=>props.type==="total" && "500"};
    font-size: ${props=>props.type==="total" && "24px"};
`
const SummaryItemText=styled.span``
const SummaryItemPrice=styled.span``
const Button=styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
`



const Cart = () => {
  
  const cart=useSelector(state=>state.cart);
  const [stripeToken,setStripeToken]=useState(null);
  const history = useHistory();
  

  const onToken=(token)=>{
    setStripeToken(token);
  };
  console.log(stripeToken)
  useEffect(()=>{
    const makeRequest=async()=>{
      try{
        const res=await userRequest.post("/checkout/payment",{
          tokenId:stripeToken.id,
          amount:cart.total * 100,
        })
        
        history.push("/success", {
          stripeData: res.data,
          products: cart, });
       
      }catch(err){}
    }
    stripeToken && makeRequest();
    
  },[stripeToken, cart, history])

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>

        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping bag(2)</TopText>
            <TopText>Your wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>

        <Bottom>
          <Info>

          {
            cart.products.map(product=>(
              <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product: </b>{product.title}
                  </ProductName>
                  <ProductId>
                    <b>Id : </b>{product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>size : </b>{product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>Rs.{product.price * product.quantity }/-</ProductPrice>
              </PriceDetail>

        <Hr />  
            </Product>
            
           

            ))
            
          }

     

           
          
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>

            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs.{cart.total}/-</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Estimated shipping</SummaryItemText>
              <SummaryItemPrice>Rs.40/-</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs.-40/-</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem type="total" >
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs.{cart.total}/-</SummaryItemPrice>
            </SummaryItem>

            <StripeCheckout 
            name="EEGA"
            billingAddress
            shippingAddress
            description={`Cart Total is Rs.${cart.total}/-`}
            amount={cart.total}
            token={onToken}
            stripeKey={KEY}
            >
            <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Cart;
