import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <svg viewBox="0 0 100 100" className="mountain-icon">
            <polygon points="50,15 85,85 15,85" fill="#646cff" />
            <polygon points="50,35 70,85 30,85" fill="#535bf2" />
          </svg>
          <span className="brand-name">Andariegos</span>
        </div>
        <nav className="navbar">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
