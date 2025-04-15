import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <Link to="/" className="max-sm:hidden flex items-center">
        <img src="/src/assets/logo.png" alt="logo" className="w-6" />
        <p className="text-2xl font-extrabold text-gray-800">
          RICH
          <span className="text-[#153d38] font-medium">FIELD</span>
        </p>
      </Link>
      <Link to="/" className="hidden max-sm:block">
        <p className="text-2xl font-extrabold text-gray-800">
          RICH
          <span className="text-[#153d38] font-medium">FIELD</span>
        </p>
      </Link>
    </>
  );
};

export default Logo;
