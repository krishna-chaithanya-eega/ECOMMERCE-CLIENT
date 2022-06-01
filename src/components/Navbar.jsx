import {
  Avatar,
  Badge,
  Box,

  Divider,
  IconButton,

  Menu,
  MenuItem,
  Tooltip,

} from "@material-ui/core";
import {

  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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

const MenuItemdiv = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
  text-transform: capitalize;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuProfile = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
  gap: 5px;
  text-transform: capitalize;
`;

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  console.log(user);

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(logout());
    dispatch(cartLogout());

    history.push("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer> */}
          <Link to="/" className="link">
            <Logo>EEGA.</Logo>
          </Link>
        </Left>
        <Center></Center>
        <Right>
          {user ? (
            <>
              <MenuProfile className="profile">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClickButton}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: '33px', height: '33px' }}>M</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>My account</MenuItem>
                  <Divider />

                  <MenuItem onClick={handleClick}>
                      
                    
                    Logout
                  </MenuItem>
                </Menu>
              </MenuProfile>
            </>
          ) : (
            <>
              <Link to="/register" className="link">
                <MenuItemdiv>REGISTER</MenuItemdiv>
              </Link>
              <Link to="/login" className="link">
                <MenuItemdiv>LOGIN</MenuItemdiv>
              </Link>
            </>
          )}

          <Link to="/cart" className="link">
            <MenuItemdiv>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItemdiv>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
