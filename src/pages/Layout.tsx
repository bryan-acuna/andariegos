import { NavLink, Outlet } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
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
          <NavLink to="/" end>Mi historia</NavLink>
          <NavLink to="/montanas">Montañas</NavLink>
          <NavLink to="/contact">Contactar</NavLink>
        </nav>

        {/* Mobile hamburger */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="hamburger" aria-label="Abrir menú">
              <span />
              <span />
              <span />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="mobile-overlay" />
            <Dialog.Content className="mobile-drawer">
              <Dialog.Close className="drawer-close">✕</Dialog.Close>
              <nav className="mobile-nav">
                <Dialog.Close asChild>
                  <NavLink to="/" end>Mi historia</NavLink>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <NavLink to="/montanas">Montañas</NavLink>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <NavLink to="/contact">Contactar</NavLink>
                </Dialog.Close>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
