import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { IoIosArrowBack } from "react-icons/io";
import { ProductContext } from "../utils/Context";
import { useContext } from "react";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate()
  const [products,setproducts] = useContext(ProductContext)
  const [product, setproduct] = useState([]);
  const { id } = useParams();
  // console.log(id)
  const getsingleproducts = async () => {
    try {
      // const { data } = await axios(`/products/${id}`);
      setproduct(products.filter((p)=> p.id == id)[0]);
      // setproduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  // const notify = () => toast.remove("Deleted");

  const ProductDeleteHandle = (id)=>{
    const filterproduct = products.filter((p)=> p.id !== id);
    setproducts(filterproduct);
    localStorage.setItem("product",JSON.stringify(filterproduct));
    toast.warn("Deleted")
    navigate("/")
  }




  useEffect(() => {
    // setproduct(products.filter((p)=> p.id == id)[0]);
    // console.log(product)
    // if(!product){
    //   setproduct(products.filter((p)=> p.id == id)[0]);
    //   console.log(product)
    // }
    getsingleproducts();
  }, []);

  return (
    <>
      <Link to={"/"}>
        <IoIosArrowBack className=" hover:scale-110 cursor-pointer rounded-full text-4xl left-4 top-2 absolute" />
      </Link>
      
      {product ? (
        <div className="w-[90%] h-full m-auto p-[10%] flex rounded-2xl">
          <img
            className=" h-[90%] w-[60%] object-contain"
            src={product.image}
            alt=""
          />
          <div className="content ml-9">
            <h1 className="text-5xl capitalize">{product.title}</h1>
            <h3 className="p-2 bg-zinc-200 w-fit mt-3 rounded-xl text-lg font-medium">
              {product.category}
            </h3>
            <h2 className="m-2 text-2xl font-semibold">$ {product.price}</h2>
            <p className="p-3 text-lg">{product.description}</p>
            <Link to={`/edit/${id}`} className="hover:scale-105 hover:text-blue-600 p-3 inline-block w-[100px] text-xl mr-7 font-extrabold text-blue-400 text-center rounded-xl border border-blue-300">
              Edit
            </Link>
            <button onClick={()=>ProductDeleteHandle(id)} className="hover:scale-105 hover:text-red-600 p-3 inline-block w-[100px] text-xl font-extrabold text-red-400 text-center rounded-xl  border border-red-300">
              Delete
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
};

export default Details;
