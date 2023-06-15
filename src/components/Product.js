import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
export default function Product() {


    const [productData, setProductData] = useState([]);




    useEffect(() => {
        document.title = 'Products';
        if (productData) {
            axios.get('http://localhost:8081/products/').then((response) => {
                setProductData(response.data.data);
                console.log(response.data.data);
            })
        }
    }, []);


    return (
        <div>
            <div className=".container">

                <h1 className="text-primary text-center">Products</h1>

                <div className="container">

                    <Link to='/addproduct'> <button className='btn btn-primary m-3'>+</button></Link>


                    <div className="row">
                        {
                            productData.map((item, i) => {
                                return (
                                    <div key={i} className="col-lg-4">
                                        <div className="card">
                                            <img className="card-img-top" src={item.productImg} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.productname}</h5>
                                                <h5 className="card-title">{item.description}:</h5>
                                                <h6><strike>$2,345 </strike></h6>
                                                <p className="card-text">$ {item.price}</p>
                                                <Link to={`/checkout/${item._id}`}>
                                                    <button className="btn btn-primary">Add To Cart</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>


            </div>
            <div className="row  m-3">
                <div className="col-lg-12 bg-primary border">
                    <h4 className='text-center text-white'>footer</h4>
                </div>
            </div>
        </div>
    )
}
