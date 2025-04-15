import { NavLink } from 'react-router-dom';
import {useUiStore} from '../../store/useUiStore'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/product', label: 'Product' },
  { to: '/contact', label: 'Contact' },
];

const NavLinks = () => {
  const { isSidebarOpen } = useUiStore()

  const baseMobileClasses =
    'max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[280px] max-lg:h-full max-lg:shadow-lg max-lg:overflow-y-auto max-lg:space-y-3 max-lg:p-6 max-lg:transition-transform max-lg:duration-300 max-lg:ease-in-out z-50';

  const openState = isSidebarOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full';

  return (
    <ul className={`lg:flex lg:gap-x-3 ${baseMobileClasses} ${openState}`}>
      {links.map(({ to, label }) => (
        <li key={to} className="max-lg:border-b max-lg:py-3 px-3">
          <NavLink
            to={to}
            className={({ isActive }) =>
              `${
                isActive ? 'text-[#29746b] font-semibold' : 'text-gray-600'
              } hover:text-[#153d38] text-[15px] block transition duration-200`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
