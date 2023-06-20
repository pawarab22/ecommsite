import React, { useEffect } from 'react'
import { ToastContainer } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Placeorder() {
  useEffect(() => {
    document.title = 'Order Placed';

    toast.info('order placed...!', { autoClose: 3000 },

      { position: toast.POSITION.TOP_RIGHT });

  }, []);

  return (
    <div>
      <div>
        <Link to='/'><button className='btn btn-primary'>Log Out</button></Link>
        <h1>Order Placed</h1>
        thanks for taking Order
        we will ship order soon..!

        <ToastContainer />

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
