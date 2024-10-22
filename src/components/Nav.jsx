import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {ProductContext} from '../utils/Context'


const Nav = () => {

  const [products]=useContext(ProductContext)

  let distinct_category = products && products.reduce((acc,cv)=>[...acc,cv.category],[]);
  distinct_category = [...new Set(distinct_category)]
  // console.log(distinct_category)

  const color = ()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`
  }

  return (
    <>
      <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5">
        <Link to={"/"} className="text-5xl tracking-tighter text-blue-400 font-bold mb-4">CART</Link>
        <a
          href="/create"
          className="py-3 px-5 border border-blue-200 text-blue-500 rounded"
        >
          Add New Product
        </a>
        <hr className="w-[80%] my-3" />
        <h1 className="text-2xl mb-3 w-[80%]">Catergory Filter</h1>
        <div className="w-[80%]">

          {distinct_category.map((item,index)=>{
            return(<Link key={index} to={`/?category=${item}`} className="mb-3 capitalize leading-none text-lg flex items-center tracking-tighter">
            <span style={{backgroundColor: color()}} className=" mr-2 w-[28px] h-[28px] rounded-full"></span>
            {item}
          </Link>)
          })}
          
        </div>
      </nav>
    </>
  );
};

export default Nav;
