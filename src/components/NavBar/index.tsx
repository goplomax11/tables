import { NavLink } from "react-router-dom";
import "./index.css";

const tablePages = [
  {
    id: "1",
    name: "Products",
    link: "/products",
  },
  {
    id: "2",
    name: "Price plans",
    link: "/price-plans",
  },
  {
    id: "3",
    name: "Pages",
    link: "/pages",
  },
];

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {tablePages.map((tablePage) => (
          <li key={tablePage.id} className="navbar-item">
            <NavLink
              to={tablePage.link}
              style={({ isActive }) => {
                return isActive ? { color: "blue" } : {};
              }}
            >
              {tablePage.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
