import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  quantity: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
      toast(`${quantity} ${product.title} added to cart!`);
    }
  };

  return (
    <div className="text-black py-10">
      {/* <Link to="/">← Back to Products</Link> */}

      <div className="flex sm:flex-row flex-col sm:items-start items-center w-full justify-evenly">
        <div
          style={{
            border: "1px solid #ddd",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          className=" flex flex-col p-[10px] rounded-[15px] items-center sm:w-[45%] mb-[3vh] w-[90%]  overflow-hidden"
        >
          <img
            className="h-auto max-w-full rounded-lg"
            src={product.image}
            alt={product.title}
          />
        </div>

        {/* Product Information */}
        <div className="sm:w-[45%] mb-[3vh] w-[90%] ">
          <h5 className="mb-5 sm:text-5xl text-3xl font-bold tracking-tight text-gray-900 ">
            {product.title}
          </h5>
          <hr className="border-t-1 border-gray-900 mb-5 " />
          <p className="mb-3 text-1xl font-normal text-gray-900">
            {product.description}
          </p>

          <p className="text-3xl font-bold mb-3 text-gray-900 ">
            ${product?.price}
          </p>
          <p className="text-gray-500 mb-3 text-sm">
            Category: {product.category}
          </p>

          <div className="flex items-center mb-3 mt-2">
            <span className="text-yellow-500  font-bold text-lg mr-1">
              {product.rating.rate}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.rating.count} reviews)
            </span>
          </div>
          <div className="flex items-center mb-3 mt-2">
            <button
              className="text-gray-900 bg-[#F7BE38] px-4 py-2 rounded-lg"
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="mx-4">{quantity}</span>
            <button
              className="text-gray-900 bg-[#F7BE38] px-4 py-2 rounded-lg"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
          >
            Add to Cart
          </button>

          {/* Go to Cart Button */}
          <Link
            to="/cart"
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-500/50"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
