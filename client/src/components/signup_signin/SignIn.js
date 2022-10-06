import React, { useState, useContext, useEffect } from 'react';
import blackamazonlogo from '../image/blacklogoamazon.png';
import './signup.css';
import { NavLink,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';


const SignIn = () => {

  const { account, setAccount } = useContext(LoginContext);

  const [logdata, setLogdata] = useState({
    email: '',
    password: '',
  });
  console.log(logdata);

  const navigate = useNavigate();

  const adddata = (e) => {
    const { name, value } = e.target;

    setLogdata(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };


  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;

    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    });

    const data = await res.json();
    // console.log(data);

    if(res.status === 401 || !data) {
      // console.log('invalid details');
      toast.warn("invalid details",{
        position: "top-center",
      })
    }else{
      navigate('/');
      // console.log("data valid")
      toast.success("data valid",{
        position: "top-center",
      });
      setLogdata({...logdata,email:"",password:""});
      setAccount(data);

    }
  };


  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src={blackamazonlogo} alt="amazonloginlogo" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={adddata}
                  value={logdata.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={adddata}
                  value={logdata.password}
                  placeholder="At least 6 characters"
                />
              </div>
              <button className="signin_btn" onClick={senddata}>
                Continue
              </button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to="/register">
              <button>Create Your Amazon Account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default SignIn;
