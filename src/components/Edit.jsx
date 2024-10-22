import { IoIosArrowBack } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const onchangehandler = (e) => {
    // console.log(e.target.name,e.target.value)
    setproduct({ ...product, [e.target.name]: e.target.value });
  };
  const editProduct = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every input character more than 4");
      return;
    }
    // console.log(product);
    const pi = products.findIndex((p)=> p.id == id);
    const copyData = [...products]
    copyData[pi]={...products[pi],...product}
    setproducts(copyData)
    localStorage.setItem("product",JSON.stringify(copyData))
    navigate(-1)
  };
  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);
  return (
    <div className="w-full h-full relative p-20 ">
      <Link to={"/"} className=" text-4xl absolute top-2 left-4">
        <IoIosArrowBack />
      </Link>
      <form onSubmit={editProduct} className="w-full h-full">
        <h1 className="w-full text-center text-5xl tracking-tighter leading-none mb-4 font-semibold text-blue-300">
          Add Products
        </h1>
        <div className="flex gap-5 w-full  p-2">
          <input
            name="image"
            onChange={onchangehandler}
            value={product.image}
            className="w-1/2 border border-zinc-600 border-y-2 text-xl h-12 pl-6 rounded-xl"
            type="url"
            placeholder="Image URl"
          ></input>
          <input
            name="title"
            onChange={onchangehandler}
            value={product.title}
            className="w-1/2 border border-zinc-600 border-y-2 text-xl h-12 pl-6 rounded-xl"
            type="text"
            placeholder="Title"
          ></input>
        </div>
        <div className="flex gap-5 w-[40%]  p-2">
          <input
            name="category"
            onChange={onchangehandler}
            value={product.category}
            className="w-1/2 border border-zinc-600 border-y-2 text-xl h-12 pl-6 rounded-xl"
            type="text"
            placeholder="Category"
          ></input>
          <input
            name="price"
            onChange={onchangehandler}
            value={product.price}
            className="w-1/2 border border-zinc-600 border-y-2 text-xl h-12 pl-6 pr-5 rounded-xl"
            type="number"
            placeholder="Price"
          ></input>
        </div>
        <textarea
          name="description"
          onChange={onchangehandler}
          value={product.description}
          rows="10"
          className="h-44 w-[40%] rounded-xl border-y-2 border border-zinc-600 p-3 mt-3 ml-3 text-xl"
          placeholder="Description"
        ></textarea>
        <button className=" hover:border-blue-700 py-3 absolute bottom-20 border-2 px-5 text-xl border-blue-200 text-blue-500 rounded-2xl">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
