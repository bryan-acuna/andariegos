import { NavLink, Outlet } from "react-router-dom";
import * as Popover from "@radix-ui/react-popover";
import logo from "../assets/logo.png";

const Layout = () => {
  return (
    <div>
      <header className="header">
        <NavLink to="/" end className="logo">
          <img src={logo} alt="Andariegos" className="logo-img" />
        </NavLink>

        {/* Desktop nav */}
        <nav className="navbar">
          <NavLink to="/about">Quienes somos</NavLink>
          <NavLink to="/" end>Montanas</NavLink>
          <NavLink to="/contact">Contactar</NavLink>
        </nav>

        {/* Mobile hamburger */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="hamburger" aria-label="Abrir menú">
              <span />
              <span />
              <span />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="mobile-menu" sideOffset={12} align="end">
              <nav className="mobile-nav">
                <Popover.Close asChild>
                  <NavLink to="/about">Quienes somos</NavLink>
                </Popover.Close>
                <Popover.Close asChild>
                  <NavLink to="/" end>Montanas</NavLink>
                </Popover.Close>
                <Popover.Close asChild>
                  <NavLink to="/contact">Contactar</NavLink>
                </Popover.Close>
              </nav>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
