import { NavLink } from "react-router";
function Header() {
  const navStyle = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition duration-300 ${
      isActive
        ? "bg-white text-blue-600 shadow"
        : "text-white hover:bg-blue-600"
    }`;
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-5 md:px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg gap-3">
      <h1 className="text-xl md:text-3xl font-bold text-white text-center">
        User Management
      </h1>
      <ul className="flex flex-wrap justify-center gap-3 text-sm md:text-lg">
        <li>
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-user" className={navStyle}>
            Add User
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-list" className={navStyle}>
            Users List
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Header;