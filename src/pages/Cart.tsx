import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };
  if (cart.length === 0) {
    return (
      <div className="text-center py-10 min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Your cart is empty!
        </h2>
        <Link to="/" className="text-blue-500 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
          >
            {/* Product Details */}
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="font-semibold text-gray-700">{item.title}</h2>
                <p className="text-sm text-gray-500">Price: ${item.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="text-right">
              <p className="text-gray-700 font-bold">
                ${item.price * item.quantity}
              </p>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 text-sm underline hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Cart Summary</h2>
        <p className="text-gray-700">
          Total Items: <span className="font-bold">{totalItems}</span>
        </p>
        <p className="text-gray-700">
          Total Price:{" "}
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </p>
        <div className="mt-4 flex space-x-4">
          <Link
            to="/"
            className="text-gray-900 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Continue Shopping
          </Link>
          <button
            onClick={handleClearCart}
            className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
