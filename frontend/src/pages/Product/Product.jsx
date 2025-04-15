import ProductCard from "./ProductCard"
import products from "../../../data/products.json"
import ShopSideNav from "../../Components/pageProps/shopPage/ShopSideNav"
import PaginatedProducts from "../../Components/Pagination/Pagination"
import { useUiStore } from "../../store/useUiStore"



const Product = () => {
  const {isSidebarOpen} = useUiStore()
  return (
    <div className="w-full h-full flex pb-20 ">
       <div className="w-[20%] lgl:w-[25%] ml-6 mt-4  mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
      <div className="lg:mx-12 my-4 flex relative">
        <PaginatedProducts products={products} itemsPerPage={12}/>
      </div>
    </div>
  )
}

export default Product