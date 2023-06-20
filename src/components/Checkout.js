import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Checkout() {

    function getHeader() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        return headers;
    }

    function getBaseUrl() {
        return "http://localhost:8081/";
    }

    const { id } = useParams();

    const [product, setProductData] = useState({
        _id: "",
        productname: "",
        productImg: "",
        price: "",
        quantity: 0,
        description: ""
    });

    function countChange(operation, product, id) {
        let url = getBaseUrl() + `updateQty?id=${id}`;
        if (operation === 'plus') {
            url += '&operation=plus';
        }
        if (operation === 'minus') {
            url += '&operation=minus';
        }
        axios.post(url, {}, { headers: getHeader() }).then((response) => {
            console.log(response.data.data);
            getData();
        });

    }
    function getData() {
        try{
        axios.get(getBaseUrl() + 'products/' + id, { headers: getHeader() }).then((response) => {
            console.log(response.data.data);
            setProductData({
                ...product,
                _id: response.data.data._id,
                productname: response.data.data.productname,
                productImg: response.data.data.productImg,
                quantity: response.data.data.quantity,
                description: response.data.data.description,
                price: response.data.data.price,
                total: response.data.data.total,
            });
            
        });
    }
    catch(err){
        toast.error('error...!', err.response.data.error.message, { autoClose: 3000 },
                    { position: toast.POSITION.TOP_RIGHT })
    }
        
    }





    useEffect(() => {

        document.title = 'Order Details';

        axios.get(getBaseUrl() + 'products/' + id, { headers: getHeader() }).then((response) => {
            console.log(response.data.data);
            setProductData({
                ...product,
                _id: response.data.data._id,
                productname: response.data.data.productname,
                productImg: response.data.data.productImg,
                quantity: response.data.data.quantity,
                description: response.data.data.description,
                price: response.data.data.price,
                total: response.data.data.total,
            });

        })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                alert(err.response.data.error.message);
            })
    }, []);



    return (
        <div>
            <h1 className="text-center text-secondary">Checkout</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <div className="card mt-50 mb-50">
                            <div className="col d-flex">
                                <span className="text-muted m-2" id="orderno"> <b>orderid #{product._id}</b> </span></div>
                            <div className="gap">
                                <div className="col-2 d-flex mx-auto"> </div>
                            </div>
                            <div className="title mx-auto">
                                <h4> Thank you for your order! </h4>
                            </div>
                            <ToastContainer/>
                            <div className="main m-2"> <span id="sub-title">
                                <p>   <b> Payment Summary   </b>   </p>
                            </span>
                                <div className="row row-main m-2">
                                    <div className="col-3">
                                        {/* <img src={require('../assets/img/tshirt.jpeg')} className='mt-4 ml-2' width='300px' height='300px' /> */}

                                        <img className="img-fluid" src={product.productImg} />
                                    </div>
                                    <div className="col-6">
                                        <div className="row d-flex">
                                            <p><b>{product.productname}</b></p>
                                        </div>
                                        <div className="row d-flex">
                                            <p className="text-muted">{product.description}</p>
                                        </div>
                                        <h6 className="text-dark"> Quantity </h6>

                                        <div className="row d-flex col-lg-4">
                                            <button type="button" onClick={(e) => countChange('minus', product.quantity, product._id)} className="btn btn-danger border text-white">-</button>
                                            <p className="text-muted">{product.quantity}
                                            </p>
                                            <button type="button" onClick={(e) => countChange('plus', product.quantity, product._id)} className="btn btn-success border text-white">+</button>

                                        </div>
                                    </div>
                                    <div className="col-3 d-flex justify-content-end">
                                        <p><b>${product.price}</b></p>
                                    </div>
                                </div>


                                <hr />
                                <div className="total m-3">
                                    <div className="row">
                                        <div className="col"> &nbsp; <b> Total:</b> </div>
                                        <div className="col d-flex justify-content-end"> <b>${product.total} </b> </div>
                                    </div>
                                    <Link to='/buynow'> <button className="btn btn-primary mb-3 d-flex mx-auto"> Proceed To Checkout </button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>

        </div>
    )
}