// import { Link, NavLink, useLocation, useNavigate, useMatch } from "react-router-dom";
// import products from "/public/data/products.json"
// import { FaSearch } from "react-icons/fa";
// import { useEffect, useRef, useState } from "react";
// import ProfileSwitcher from './ProfileSwitcher'
// import useCartStore from "../../store/useCartStore";
// import { useAuthStore } from '../../store/useAuthStore';
// import {useUiStore} from '../../store/useUiStore'

// const Header = () => {
//   const {authUser} = useAuthStore()
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearchBar, setShowSearchBar] = useState(false);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const navigate = useNavigate();
//   const headerRef = useRef(null);
//   const [isHidden, setIsHidden] = useState(false);
//   const location = useLocation();

//   const isProductPage = useMatch("/product/:productId") || location.pathname === "/cart";
  
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Use Zustand instead of Redux's useSelector
//   const cartItems = useCartStore((state) => state.items);
//   const {toggleSidebar, isSidebarOpen} = useUiStore()
//   const cartItemCount = cartItems.length;


//   useEffect(() => {
//     let lastScrollTop = 0;
//     const handleScroll = () => {
//       const scrollTop =
//         window.pageYOffset || document.documentElement.scrollTop;
//       scrollTop > lastScrollTop ? setIsHidden(true) : setIsHidden(false);
//       lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
//     };

    

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const filtered = products
//     .filter((item) => item && item.name) // Ensure item is defined and has a name
//     .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
//     setFilteredProducts(filtered);
//   }, [searchQuery]);
//   // console.log(products.map((item)=>(item.name)))
//   // console.log(typeof products)
//   // console.log(Array.isArray(products))
//   // console.log(products.map((item)=>Object.keys(item)))

//   const headerStyle = {
//     transform: isHidden ? "translateY(-45%)" : "translateY(0)",
//     transition: "transform 0.3s ease-in-out",
//   };

//   return (
//     <>
//       <header
//         ref={headerRef}
//         style={headerStyle}
//         className="border-b font-[sans-serif] tracking-wide z-50 shadow-md top-0 sticky bg-white"
//       >
//         <section className="py-3 bg-[#153d38] text-white text-center px-10">
//           <p className="text-sm p-2">
//             Summer Sale: Save up to 40% on select items.{" "}
//             <span className="text-red-500">Limited-time offer!</span>
//           </p>
//         </section>
//         <div className="container flex max-w-screen-xl px-6 py-3 md:px-12">
//           <div className="flex flex-wrap items-center gap-4 w-full">
//             <button className="max-sm:hidden" onClick={toggleSidebar}>
//               <svg
//                 className="w-7 h-7"
//                 fill="#333"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </button>
//             <Link to="/" className="max-sm:hidden flex items-center">
//               <img src="/src/assets/logo.png" alt="logo" className="w-6" />
//               <p className="text-2xl font-extrabold text-gray-800">
//                 RICH
//                 <span className="text-[#153d38] font-medium">FIELD</span>
//               </p>
//             </Link>
//             <Link to="/" className="hidden max-sm:block">
//               <p className="text-2xl font-extrabold text-gray-800">
//                 RICH
//                 <span className="text-[#153d38] font-medium">FIELD</span>
//               </p>
//             </Link>

//             <div
//               id="collapseMenu"
//               className="lg:ml-6 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
//             >
//               <button
//                 id="toggleClose"
//                 className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-3.5 h-3.5 fill-black"
//                   viewBox="0 0 320.591 320.591"
//                 >
//                   <path
//                     d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
//                     data-original="#000000"
//                   ></path>
//                   <path
//                     d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
//                     data-original="#000000"
//                   ></path>
//                 </svg>
//               </button>

//               <ul className="lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
//                 <li className="mb-6 hidden max-lg:block">
//                   <div className="flex items-center justify-between gap-4">
//                     <Link to="/">
//                       <img
//                         src="https://readymadeui.com/readymadeui.svg"
//                         alt="logo"
//                         className="w-36"
//                       />
//                     </Link>
//                     <button className="px-4 py-2 text-sm text-white rounded-sm border-2 border-[#dfe0df] bg-[#153d38] hover:bg-[#0b201e]">
//                       Sign In
//                     </button>
//                   </div>
//                 </li>
//                 <li className="max-lg:border-b max-lg:py-3 px-3">
//                   <NavLink
//                     to="/"
//                     className={({ isActive }) =>
//                       `${
//                         isActive
//                           ? "text-[#29746b] font-semibold"
//                           : "text-gray-600"
//                       } hover:text-[#153d38] text-[15px] block`
//                     }
//                   >
//                     Home
//                   </NavLink>
//                 </li>
//                 <li className="max-lg:border-b max-lg:py-3 px-3">
//                   <NavLink
//                     to="/about"
//                     className={({ isActive }) =>
//                       `${
//                         isActive
//                           ? "text-[#29746b] font-semibold"
//                           : "text-gray-600"
//                       } hover:text-[#153d38] text-[15px] block`
//                     }
//                   >
//                     About
//                   </NavLink>
//                 </li>
//                 <li className="max-lg:border-b max-lg:py-3 px-3">
//                   <NavLink
//                     to="/product"
//                     className={({ isActive }) =>
//                       `${
//                         isActive
//                           ? "text-[#29746b] font-semibold"
//                           : "text-gray-600"
//                       } hover:text-[#153d38] text-[15px] block`
//                     }
//                   >
//                     Product
//                   </NavLink>
//                 </li>
//                 <li className="max-lg:border-b max-lg:py-3 px-3">
//                   <NavLink
//                     to="/contact"
//                     className={({ isActive }) =>
//                       `${
//                         isActive
//                           ? "text-[#29746b] font-semibold"
//                           : "text-gray-600"
//                       } hover:text-[#153d38] text-[15px] block`
//                     }
//                   >
//                     Contact
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>

//             <div className="flex items-center gap-x-6 gap-y-4">
//             <div className="relative  h-[50px] text-base text-primeColor bg-transparent shadow-md flex items-center justify-between px-2 rounded-xl">
//               <input
//                 className="flex-1 h-full w-[400px] outline-none border-none placeholder:text-[#C4C4C4] placeholder:text-[14px] focus:outline-none focus:ring-0"
//                 type="text"
//                 onChange={handleSearch}
//                 value={searchQuery}
//                 placeholder="Search your products here"
//               />
//               <FaSearch className="w-5 h-5" />
//               {searchQuery && (
//                 <div
//                   className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
//                 >
//                   {searchQuery &&
//                     filteredProducts.map((item) => (
//                       <div
//                         onClick={() =>
//                           navigate(
//                             `/product/${item.productName
//                               .toLowerCase()
//                               .split(" ")
//                               .join("")}`,
//                             {
//                               state: {
//                                 item: item,
//                               },
//                             }
//                           ) &
//                           setShowSearchBar(true) &
//                           setSearchQuery("")
//                         }
//                         key={item._id}
//                         className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
//                       >
//                         <img className="w-24" src={item.images[0]} alt="productImg" />
//                         <div className="flex flex-col gap-1">
//                           <p className="font-semibold text-lg">
//                             {item.name}
//                           </p>
//                           <p className="text-xs">{item.description}</p>
//                           <p className="text-sm">
//                             Price:{" "}
//                             <span className="text-primeColor font-semibold">
//                               ${item.priceInKobo}
//                             </span>
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>

//               <div className="flex items-center sm:space-x-8 space-x-6">
//                 <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
//                   {isProductPage ? (
//                     <div className="flex gap-6">
//                       <Link className="relative border border-gray-300 p-2 rounded-sm">
//                         <svg
//                           className="cursor-pointer inline"
//                           width="30px"
//                           height="30px"
//                           viewBox="0 0 22 22"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
//                             stroke="#333"
//                             strokeWidth="1"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                         <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
//                           0
//                         </span>
//                       </Link>
//                       {/* Cart Icon */}
//                       <Link
//                         to="cart"
//                         className="relative border border-gray-300 p-2 rounded-sm"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="30px"
//                           height="30px"
//                           className="cursor-pointer fill-[#333] inline"
//                           viewBox="0 0 512 512"
//                         >
//                           <path
//                             d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
//                             data-original="#000000"
//                           />
//                         </svg>
//                         <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
//                           {cartItemCount}
//                         </span>
//                       </Link>
//                     </div>
//                   ) : (
//                     <Link
//                       to="cart"
//                       className="relative border border-gray-300 p-2 rounded-sm"
//                     >
//                       <svg
//                         className="cursor-pointer inline"
//                         width="30px"
//                         height="30px"
//                         viewBox="0 0 22 22"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
//                           stroke="#333"
//                           strokeWidth="1"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
//                         0
//                       </span>
//                     </Link>
//                   )}
//                 </div>

//                 {!authUser && (<button
//                   className="max-lg:hidden px-6 py-3 text-sm text-white rounded-sm border-2 border-[#dfe0df] bg-[#153d38] hover:bg-[#0c201e]"
//                   onClick={() => {
//                     navigate("/login");
//                   }}
//                 >
//                   Log In
//                 </button>)}

//                 {authUser &&(<ProfileSwitcher />)}

//                 <button id="toggleOpen" className="lg:hidden">
//                   <svg
//                     className="w-7 h-7"
//                     fill="#333"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;

import { useAuthStore } from '../../store/useAuthStore';
import yourProductsList from "/public/data/products.json"
import SidebarToggleButton from './SidebarToggleButton';
import SaleBanner from './SaleBanner';
import Logo from './Logo';
import NavLinks from './NavLinks';
import ThemeToggle from './ThemeToggle';
import CartIcon from './CartIcon';
import ProfileSwitcher from './ProfileSwitcher';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';




const Header = () => {
  const {authUser} = useAuthStore()
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <SaleBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <SidebarToggleButton />
        <Logo />
        <NavLinks />
        <SearchBar products={yourProductsList} />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {authUser && <ProfileSwitcher />}
          {authUser ? <CartIcon /> : <LoginButton/>}

        </div>
      </div>
    </header>
  );
};

export default Header;
