import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlineCancel } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Nav: React.FC = () => {
  const [respoNavSlide, setrespoNavSlide] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <nav className="fixed h-[10vh] bg-[#061a3c] flex gap-10 text-white w-full items-center justify-between font-Poppins p-4 px-[3vw] z-[99999] mb-3 cursor-pointer">
        <div className="sm:flex hidden  gap-4 items-center">
          <div
            onClick={() => {
              navigate("/"), setrespoNavSlide(false);
            }}
            className=" no-underline"
          >
            Home
          </div>
          <div>About</div>
          <div>Delivery</div>
          <div>Blog</div>
          <div>Support</div>
        </div>
        <div className="font-bold text-2xl sm:mr-24 flex items-center gap-4">
          <div className="sm:hidden block">
            {!respoNavSlide ? (
              <RiMenu3Fill
                className=""
                onClick={() => setrespoNavSlide(true)}
              />
            ) : (
              <MdOutlineCancel
                className=""
                onClick={() => setrespoNavSlide(false)}
              />
            )}
          </div>
          <div
            onClick={() => {
              navigate("/"), setrespoNavSlide(false);
            }}
            className="text-white no-underline"
          >
            <span className="text-orange-500">My </span>
            Store
          </div>
        </div>
        <div className="flex gap-4 items-center ">
          <div className="sm:scale-125">
            <IoSearch />
          </div>
          <div className="sm:scale-125">
            <a href="/cart" className=" no-underline">
              <GrCart />
            </a>
          </div>
          <div className="sm:scale-125">
            <a href="/login" className=" no-underline">
              <CgProfile />
            </a>
          </div>
        </div>
      </nav>
      {respoNavSlide && (
        <div className=" h-[90vh] top-[10vh] left-0 fixed bg-[#061a3c]/100 w-full z-[99]">
          <div
            className="items-center justify-between  w-full md:flex md:w-auto md:order-1 text-[22px]"
            id="navbar-sticky"
          >
            <ul className="flex text-[17px] pl-3 font-medium flex-col">
              <li>
                <div
                  onClick={() => {
                    navigate("/"), setrespoNavSlide(false);
                  }}
                  className={`block py-2  pt-5 px-7  text-gray-400 cursor-pointer ${
                    location.pathname === "/" ? "text-white" : "text-gray-400"
                  }`}
                  aria-current="page"
                >
                  Home
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    navigate("/courses"), setrespoNavSlide(false);
                  }}
                  className={`block py-2 px-7  ${
                    location.pathname === "/courses"
                      ? "text-white"
                      : "text-gray-400"
                  } cursor-pointer `}
                >
                  Courses
                </div>
              </li>
              <li>
                <a
                  href="https://forms.gle/YSxtwB1JFjuEsbSr5"
                  className="block py-2 px-7 text-gray-400 cursor-pointer"
                >
                  Enroll Now
                </a>
              </li>
              <li>
                <a href="#" className="block py-[1px] px-7 text-gray-400">
                  {/* Services */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <nav className=" h-[10vh] w-full"></nav>
    </>
  );
};

export default Nav;
