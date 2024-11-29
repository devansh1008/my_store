import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}
const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "https://fakestoreapi.com/products";

      if (!category) {
        url = "https://fakestoreapi.com/products";
      } else if (category !== "All_Categories") {
        url = `https://fakestoreapi.com/products/category/${category}`;
      } else {
        url = "https://fakestoreapi.com/products";
      }
      const response = await axios.get(url);
      setProducts(response.data);
    };

    fetchProducts();
  }, [category]);

  const handleCategoryChange = (selectedCategory: string) => {
    setSearchParams({ category: selectedCategory });
  };

  return (
    <div className="text-black min-h-[100vh] w-full">
      <div className="w-full bg-white flex items-center gap-7 pl-7 py-4">
        <select
          value={category}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-center inline-flex items-center"
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All_Categories">All Categories</option>
          {categories?.map((cat) => (
            <option
              className="block px-4 py-2 bg-gray-700"
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-1 gap-10 w-full place-items-center sm:px-[1vw] py-[7vh]">
        {products?.map((product, idx) => (
          <>
            <div
              key={idx}
              style={{
                border: "1px solid #ddd",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              className=" flex flex-col p-[10px] rounded-[15px] items-center sm:w-[320px] mb-[3vh] w-[90%] sm:h-[55vh] overflow-hidden"
            >
              <img
                src={product?.image}
                alt={product?.title}
                className="h-[250px]"
              />
              {/* <h2 className="text-xl font-semibold truncate-text text-left pl-3 w-full text-gray-900">
                {product?.title}
              </h2> */}
              <p className="mt-2 text-xl font-semibold sm:truncate text-left pl-3  w-full">
                {product.title}
              </p>
              <div className="w-full flex items-center justify-between py-5 px-3">
                <p className="text-3xl font-bold text-gray-900 ">
                  ${product?.price}
                </p>
                <Link
                  className="font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-blue-700 hover:bg-blue-800"
                  to={`/product/${product?.id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
