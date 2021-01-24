import React, { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import axios from 'axios'
import Card from './Card'

const Home = () => {

    const authContext = useContext(AuthContext);
    
    const [Products, setProducts] = useState([]);

    const fetchProducts = async () =>{
        try{
            const products = await axios.get("/api/products");
            // console.log(products.data)
            products.data.map(p=>{
                Products.push(p);
            })
            console.log(Products)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {
      authContext.loadUser();
      // eslint-disable-next-line
    }, []);
    return (
        <div>
            {Products.map((p, id)=>(
                <Card product={p} key={id}/>
            ))}
        </div>
    )
}

export default Home;
