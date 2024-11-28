import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext"; // Context for managing cart

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart(); // Add to cart function from context

  useEffect(() => {
    // Fetch product details using the ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
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

  return (
    <div className="text-black">
      <Link to="/">← Back to Products</Link>

      <div className="product-container">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />

        {/* Product Information */}
        <div className="product-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>
            <strong>Price: </strong>${product.price}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
