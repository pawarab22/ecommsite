import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function Addproduct() {

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

    const [file, setFile] = useState();

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productname: '',
        description: '',
        productImg: '',
        price: '',
    });
    
    function save(e) {
        e.preventDefault();
        
        let data = new FormData();
        data.append('productname', product.productname);
        data.append('description', product.description);
        data.append('productImg', file);
        data.append('price', product.price);

        axios.get(getBaseUrl() + 'products', { headers: getHeader() },).then((response) => {
            console.log(response.data.data);
            navigate('/buynow');

        })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                toast.error('error...!', { autoClose: 3000 },
                    { position: toast.POSITION.TOP_RIGHT })
            })
    }

    function setProductData(e, file = false) {
        e.preventDefault();
        if (file) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
            setProduct({ ...product, [e.target.id]: e.target.value });
        } else {
            setProduct({ ...product, [e.target.id]: e.target.value });
        }
    }

    return (
        <div>
            <div className="container border">
                <h3 className='text-center text-info'>Add Product</h3>

                <div className="col-lg-12">
                    <form >


                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label >Product Name : </label>
                                <input type="text" className="form-control" name="productname" id='productname' value={product.productname} onChange={(e) => { setProductData(e) }} />
                            </div>

                            <div className="col-lg-6">
                                <label >Image File : </label>
                                <input type="file" className="form-control" name="productImg" id='productImg' value={product.productImg} onChange={(e) => { setProductData(e, true) }} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-lg-12">
                                <label >Description : </label>
                                <textarea className="form-control" name="description" id='description' value={product.description} onChange={(e) => { setProductData(e) }}></textarea>
                            </div>
                        </div>




                        <div className="form-group row">
                            <div className="col-lg-6">
                                <label >Price : </label>
                                <input type="text" className="form-control" name="price" value={product.price} id='price' onChange={(e) => { setProductData(e) }} />
                            </div>

                        </div>

                        <button type="submit" className="btn btn-danger mt-3" style={{ cursor: 'pointer' }} onClick={(e) => { save(e) }} >
                            Add Product
                        </button>
                        <hr />

                    </form>
                </div>
            </div>
        </div>
    )
}
