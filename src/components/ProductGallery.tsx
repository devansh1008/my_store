import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
interface Product {
  id: number;
  title: string;
  image: string;
}

const ProductGallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  };
  return (
    <>
      {/* ---------------------------- */}
      <section className="w-full h-[50vh] ">
        <div className="flex h-[50vh] w-full  overflow-hidden">
          {products.map((product) => (
            <div
              key={product?.id}
              className="min-w-full min-h-[450px] lg:min-h-full  overflow-hidden relative group transition-transform duration-500"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="w-full flex sm:flex-row flex-col-reverse items-center justify-center gap-5">
                <div className=" bottom-0 w-full max-w-md px-3">
                  <p className="font-bold text-2xl lg:text-4xl text-[#061a3c] drop-shadow-lg">
                    {product?.title}
                  </p>
                </div>
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="h-[60vw]  object-cover"
                />
              </div>

              <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
                <button
                  onClick={handlePrevious}
                  className="bg-white p-2 rounded-full text-xl z-10 text-black"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white p-2 rounded-full text-xl z-10 text-black"
                >
                  <FaAngleRight />
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-500 to-transparent"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductGallery;
