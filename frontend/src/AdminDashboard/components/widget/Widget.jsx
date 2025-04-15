import "./widget.scss";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaUser, FaWallet, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const Widget = ({ type }) => {
  let data;

  // Temporary data
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <FaUser
            className="icon p-2 rounded-full"
            style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <FaShoppingCart
            className="icon p-2 rounded-full"
            style={{ backgroundColor: "rgba(218, 165, 32, 0.2)", color: "goldenrod" }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <FaDollarSign
            className="icon p-2 rounded-full"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <FaWallet
            className="icon p-2 rounded-full"
            style={{ backgroundColor: "rgba(128, 0, 128, 0.2)", color: "purple" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget flex justify-between items-center p-4 border rounded-lg shadow-md bg-white">
      <div className="left">
        <span className="title text-gray-600 text-sm font-medium">{data.title}</span>
        <span className="counter text-xl font-semibold">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link text-blue-500 text-xs cursor-pointer hover:underline">{data.link}</span>
      </div>
      <div className="right flex items-center gap-2">
        <div className="percentage flex items-center text-green-500 font-medium">
          <MdKeyboardArrowUp />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
