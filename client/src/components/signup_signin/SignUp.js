import React, { useState } from 'react';
import blackamazonlogo from '../image/blacklogoamazon.png';
import './signup.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [udata, setUdata] = useState({
    fname: '',
    email: '',
    mobile: '',
    password: '',
    confirmpassword: '',
  });

  console.log(udata);

  const navigate = useNavigate();

  const adddata = (e) => {
    const { name, value } = e.target;

    setUdata(() => {
      return {
        ...udata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { fname, mobile, email, password, confirmpassword } = udata;

    const res = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname,
        mobile,
        email,
        password,
        confirmpassword,
      }),
    });

    const data = await res.json();
    // console.log(data);

    if(res.status === 422 || !data) {
        toast.warn("invalid details",{
         position: "top-center",
       })
    }else {
        toast.success("data successfully added",{
          position: "top-center",
        })
        setUdata({...udata,fname:"",mobile:"",email:"",password:"",confirmpassword:""});
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
              <h1>Sign-Up</h1>
              <div className="form_data">
                <label htmlFor="fname">Your Name</label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  onChange={adddata}
                  // onChange={(e) => setUdata({...udata,fname: e.target.value})}
                  value={udata.fname}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={adddata}
                  // onChange={(e) => setUdata({...udata,email: e.target.value})}
                  value={udata.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="number">Mobile</label>
                <input
                  type="number"
                  name="mobile"
                  id="number"
                  onChange={adddata}
                  // onChange={(e) => setUdata({...udata,mobile: e.target.value})}
                  value={udata.mobile}
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
                  // onChange={(e) => setUdata({...udata,password: e.target.value})}
                  value={udata.password}
                  placeholder="At least 6 characters"
                />
              </div>
              <div className="form_data">
                <label htmlFor="confirmpassword">Password again</label>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  onChange={adddata}
                  // onChange={(e) => setUdata({...udata,confirmpassword: e.target.value})}
                  value={udata.confirmpassword}
                  placeholder="At least 6 characters"
                />
              </div>
              <button className="signin_btn" onClick={senddata}>
                Continue
              </button>

              <div className="signin_info">
                <p>Already have an account?</p>
                <NavLink to="/login">Sign-In</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default SignUp;
