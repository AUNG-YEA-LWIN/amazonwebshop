import React, { useContext } from 'react';
import './rightheader.css';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import  flag  from '../image/myanmarflag.png';

const Rightheader = ({ logclose, logoutuser }) => {

  const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avatar2">
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avatar"></Avatar>
          )}
          {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ''}
        </div>
        <div className="nav_btn" onClick={() => logclose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By category</NavLink>

          <Divider style={{ width: '100%', marginLeft: '-20px' }} />

          <NavLink to="/">today's Deal</NavLink>
          {account ? (
            <NavLink to="/buynow">Your orders</NavLink>
          ) : (
            <NavLink to="/login">Your orders</NavLink>
          )}
          <Divider />

          <div className="flag">
            <NavLink to="/">Settings</NavLink>
            <img src={flag} alt="Flag" width={40} style={{marginLeft:10}} />
          </div>

          {account ? (
            <div className="flag">
              <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
              <p onClick={() => logoutuser()} style={{ cursor: 'pointer' }}>
                Logout
              </p>
            </div>
          ) : (
            <NavLink to="/login">Signin</NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Rightheader;
