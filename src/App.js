import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'

function App() {
  const [product, setProduct] = useState({
    name: 'React from FB',
    price: 10,
    productBy: 'facebook'
  })
  const makePayment = (token) => {
    const body = {
      token,
      product
    }
    const headers = {
      'Content-Type': 'application/json'
    }
    return fetch(`http://localhost:5000/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(res => {
      console.log('Response ', res)
      const { status } = res
      console.log('Status ', status)
    }).catch(err => console.log(err))
  
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={makePayment} name="Buy React" amount={product.price * 100} shippingAddress billingAddress>
            <button className="btn-large pink">Buy react in just {product.price} $</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
