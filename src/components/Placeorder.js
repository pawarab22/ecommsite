import React from 'react'
import { Link } from 'react-router-dom'

export default function Placeorder() {
  return (
    <div>
      <div>
       <Link to='/'><button className='btn btn-primary'>Log Out</button></Link>
        <h1>Order Placed</h1>
        thanks for taking Order
        we will ship order soon..!
      </div>
      <div className="conatiner m-2">
        <div className="row mt-1">
          <div className="col-lg-12 bg-primary border">
            <h3 className='text-center text-white'>footer</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
