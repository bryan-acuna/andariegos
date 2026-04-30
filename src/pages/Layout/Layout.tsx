import { NavLink, Outlet } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import logo from "../../assets/logo.png";

const Layout = () => {
  return (
    <div>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>

      <header className="header">
        <NavLink to="/" end className="logo" aria-label="Andariegos — Inicio">
          <img src={logo} alt="" className="logo-img" />
          <span className="brand-name">Andariegos</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="navbar" aria-label="Navegación principal">
          <NavLink to="/" end>Mi historia</NavLink>
          <NavLink to="/about">Sobre mí</NavLink>
          <NavLink to="/montanas">Montañas</NavLink>
          <NavLink to="/mapa">Mapa</NavLink>
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
            <Dialog.Content
              className="mobile-drawer"
              aria-label="Menú de navegación"
            >
              <Dialog.Title className="visually-hidden">Menú</Dialog.Title>
              <Dialog.Close className="drawer-close" aria-label="Cerrar menú">
                <span aria-hidden="true">✕</span>
              </Dialog.Close>
              <nav className="mobile-nav" aria-label="Navegación móvil">
                <Dialog.Close asChild>
                  <NavLink to="/" end>Mi historia</NavLink>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <NavLink to="/about">Sobre mí</NavLink>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <NavLink to="/montanas">Montañas</NavLink>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <NavLink to="/mapa">Mapa</NavLink>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <NavLink to="/contact">Contactar</NavLink>
                </Dialog.Close>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </header>
      <main id="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
