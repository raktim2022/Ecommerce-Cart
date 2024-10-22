import { IoIosArrowBack } from "react-icons/io";
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProductContext } from "../utils/Context";
import {nanoid} from "nanoid"
import { toast } from "react-toastify";

const Create = () => {
    const navigate = useNavigate()
    const [products,setproducts] = useContext(ProductContext)
    const [image, setimage] = useState("")
    const [title, settitle] = useState("")
    const [category, setcategory] = useState("")
    const [price, setprice] = useState(0)
    const [description, setdescription] = useState("")
    const addProduct = (e)=>{
        e.preventDefault()
        const product = {
            id:nanoid(),
            title,
            price,
            description,
            category,
            image,
        }
        setproducts([...products,product])
        localStorage.setItem("product",JSON.stringify([...products,product]))
        toast.success("Product added Succesfully")
        navigate("/")
    }
  return (<>
    <div className='w-full h-full relative p-20 '>
        <Link to={"/"} className=" text-4xl absolute top-2 left-4">
            <IoIosArrowBack/>
        </Link>
        <form onSubmit={addProduct} className='w-full h-full'>
            <h1 className='w-full text-center text-5xl tracking-tighter leading-none mb-4 font-semibold text-blue-300'>Add Products</h1>
            <div className='flex gap-5 w-full  p-2'>
                <input onChange={(e)=>setimage(e.target.value)} value={image} className='w-1/2 border border-zinc-600 border-y-2 text-xl h-12 pl-6 rounded-xl' type='url' placeholder='Image URl' ></input>
                <input onChange={(e)=>settitle(e.target.value)} value={title} className='w-1/2 border border-zinc-600 border-y-2 text-xl h-12 pl-6 rounded-xl' type='text' placeholder='Title' ></input>
            </div>
            <div className='flex gap-5 w-[40%]  p-2'>
                <input onChange={(e)=>setcategory(e.target.value)} value={category} className='w-1/2 border border-zinc-600 border-y-2 text-xl h-12 pl-6 rounded-xl' type='text' placeholder='Category' ></input>
                <input onChange={(e)=>setprice(e.target.value)} value={price} className='w-1/2 border border-zinc-600 border-y-2 text-xl h-12 pl-6 pr-5 rounded-xl' type='number' placeholder='Price' ></input>
            </div>
            <textarea onChange={(e)=>setdescription(e.target.value)} value={description} rows="10" className='h-44 w-[40%] rounded-xl border-y-2 border border-zinc-600 p-3 mt-3 ml-3 text-xl' placeholder='Description'>
            </textarea>
            <button
            className=" hover:border-blue-700 py-3 absolute bottom-20 border-2 px-5 text-xl border-blue-200 text-blue-500 rounded-2xl"
            >Submit</button>
        </form>
    </div>
  </>)
}

export default Create