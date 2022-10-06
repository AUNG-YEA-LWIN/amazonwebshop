import React, { useEffect, useState, useContext } from 'react';
import './cart.css';
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';

const Cart = () => {
  const { id } = useParams('');
  // console.log(id);

  const { account, setAccount } = useContext(LoginContext);

  const [individata, setIndividata] = useState('');
  console.log(individata);

  const history = useNavigate('');

  const getindividata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 200) {
      console.log('no data available');
    } else {
      console.log('getdata');
      setIndividata(data);
    }
  };

  useEffect(() => {
    setTimeout(getindividata,1000);
  },[id]);

  //add cart function
  const addtocart = async (id) => {
    const checkres = await fetch(`/addcart/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        individata,
      })
    });

    const dataone = await checkres.json();
    // console.log(dataone);

    if (checkres.status === 401 || !dataone) {
      // console.log('user invalid');
      alert('user invalid ');
    } else {
      // alert("data added in your cart");
      history('/buynow');
      setAccount(dataone);
    }
  };

  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img src={individata.detailUrl} alt="Kettle" />
          <div className="cart_btn">
            <button
              className="cart_btn1"
              onClick={() => addtocart(individata.id)}
            >
              Add To Cart
            </button>
            <button className="cart_btn2">Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>{individata.shortTitle}</h3>
          <h4>{individata.longTitle}</h4>
          <Divider />
          <p className="mrp">M.R.P : $ {individata.mrp}</p>
          <p>
            Deal of the Day :{' '}
            <span style={{ color: '#B12704' }}> $ {individata.cost}.00</span>
          </p>
          <p>
            You save :{' '}
            <span style={{ color: '#B12704' }}>
              {' '}
              $ {individata.mrp - individata.cost} ({individata.discount})
            </span>
          </p>

          <div className="discount_box">
            <h5>
              Discount :{' '}
              <span style={{ color: '#111' }}> {individata.discount} </span>
            </h5>
            <h4>
              FREE Delivery :{' '}
              <span style={{ color: '#111', fontWeight: 600 }}>Oct 8 - 12</span>{' '}
              Details
            </h4>
            <p>
              Fastest delivery:{' '}
              <span style={{ color: '#111', fontWeight: 600 }}>
                {' '}
                Tomorrow 11AM
              </span>
            </p>
          </div>

          <p className="description">
            About The Item :
            <span
              style={{
                color: '#565959',
                fontSuze: 14,
                fontWeight: 500,
                letterSpacing: '0.4px',
              }}
            >
              {individata.description}
            </span>
          </p>
        </div>
      </div>

      { !individata ? (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Cart;
