import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

export default function Protect(props) {

    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        
        let token = localStorage.getItem('token');

        console.log(">>>>>>>>", token);

        if (!token) {
            navigate("/");
        }

    }, []);

    return (
        <div>
            <Component />
        </div>
    )
}
