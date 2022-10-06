import React, { useContext, useEffect, useState } from 'react';
import './navbar.css';
import headingLogo from '../image/amazon_PNG25.png';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { getProducts } from '../redux/actions/action';

const Navbar = () => {
  const history = useNavigate();

  const { products } = useSelector((state) => state.getproductsdata);

  const [anchorEl, setAnchorEl] = useState(null);

  const [dropen, setDropen] = useState(false);

  const [text, setText] = useState('');
  // console.log(text);

  const [liopen, setLiopen] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { account, setAccount } = useContext(LoginContext);
  // console.log(account);

  const getdetailvaliduser = async () => {
    const res = await fetch('/validuser', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log('error');
    } else {
      console.log('data valid');
      setAccount(data);
    }
  };

  useEffect(() => {
    getdetailvaliduser();
  }, []);

  const logoutuser = async () => {
    const res2 = await fetch('/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data2 = await res2.json();
    // console.log(data);

    if (res2.status !== 201) {
      console.log('error');
    } else {
      console.log('data valid');
      toast.success('logout success', {
        position: 'top-center',
      });
      setAccount(false);
      history('/');
    }
  };

  const handleopen = () => {
    setDropen(true);
  };

  const handledrclose = () => {
    setDropen(false);
  };

  const getText = (iteams) => {
    setText(iteams);
    setLiopen(false);
  };

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleopen}>
            <MenuIcon style={{ color: '#fff' }} />
          </IconButton>

          <Drawer open={dropen} onClose={handledrclose}>
            <Rightheader logclose={handledrclose} logoutuser={logoutuser} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src={headingLogo} alt="headingLogo" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search your products"
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/* search filter */}

            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.longTitle.toLowerCase().includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/getproductsone/${product.id}`}
                        onClick={() => setLiopen(true)}
                      >
                        {product.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          {
            account ? (
              <div className="nav_btn" onClick={logoutuser}>
                <NavLink to="/">signout</NavLink>     
              </div>
            ) : (
              <div className='nav_btn'>
                <NavLink to="/login">signin</NavLink>
              </div>
            )
          }
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}
            <p>Cart</p>
          </div>
          {account ? (
            <Avatar
              className="avatar2"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avatar2"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            ></Avatar>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account ? (
              <MenuItem onClick={logoutuser}>
                <LogoutIcon style={{ fontSize: '16px', marginRight: 3 }} />{' '}
                Logout
              </MenuItem>
            ) : (
              ''
            )}
          </Menu>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
