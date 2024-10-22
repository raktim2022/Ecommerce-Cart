import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import {ProductContext} from '../utils/Context'
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
    const [products,setproducts]=useContext(ProductContext)
    const {search} = useLocation();
    const category = decodeURIComponent(search.split("=")[1])

    // let filterproduct = products && products;
    const [filterproduct, setfilterproduct] = useState(null)

    const getproductscategory = async ()=>{
      try {
        // const {data} = await axios.get(`/products/category/${category}`);
        setfilterproduct(products.filter(p=>p.category == category))
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      if(!filterproduct || category == "undefined")
        setfilterproduct(products);
      if(category!= "undefined")
        getproductscategory();
    },[category,products])


  return products ? (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filterproduct && filterproduct.map((item,index)=>{
          return (
            <Link key={index}
            to={`/details/${item.id}`} className="capitalize mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[40vh] flex flex-col justify-center items-center">
          <div
            style={{
              backgroundImage:
                `url(${item.image})`,
            }}
            className=" hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
          ></div>
          <h1 className="text-lg tracking-tighter leading-tight font-semibold hover:text-blue-500 w-[100%] h-20 text-center text-ellipsis overflow-hidden ...">
            {item.title}
          </h1>
          {/* <h3>Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday</h3> */}
        </Link>
          )
          
        })}
        
      </div>
    </>
  ):(
    <Loading/>
  );
};

export default Home;
