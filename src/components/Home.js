import React from 'react'

export default function Home() {
  return (
    <div>
        <div className='add-to-cart'>
            <img src='shopping_cart.png'/>
        </div>
      <h1>Home Component</h1>
      <div className='cart-wrapper'>
        <div className='img-wrapper item'>
            <img src='images.jpg'/>
        </div>
        <div className='text-wrapper item'>
            <span>I-Phone</span>
            <span>Price: $1000.00</span>
        </div>
        <div className='btn-wrapper item'>
            <button>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
