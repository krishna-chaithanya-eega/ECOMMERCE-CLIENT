import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { cartLogout } from "../redux/cartRedux";
import { logout } from "../redux/userRedux";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;

  background-color: black;
  color: white;

  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.25px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ textAlign: "left", marginLeft: "10px" })}
`;
const Logo = styled.div`
  font-weight: bold;
  font-size: 28px;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const dispatch=useDispatch()
  const quantity = useSelector((state) => state.cart.quantity);
  const user= useSelector((state) => state.user.currentUser);

  

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(logout());
    dispatch(cartLogout())
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
        <Link to="/" className="link">

          <Logo>EEGA.</Logo>
        </Link>
        </Center>
        <Right>
        {
          user? (<Link to="/register" className="link">
            <MenuItem onClick={handleClick} >LOG OUT</MenuItem>
          </Link>):(<>
            <Link to="/register" className="link">
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login" className="link" >
            <MenuItem>LOG IN</MenuItem>
          </Link>
          </>)
        }
          
          <Link to="/cart" className="link" >
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
