import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/60 dark:border-neutral-800/60 transition-colors duration-300">
      <div className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Julian Estrada
        </Link>

        <nav className="flex items-center gap-x-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          {isHome ? (
            <>
              <a href="#about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Sobre mí
              </a>
              <a href="#experience" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Experiencia
              </a>
              <a href="#projects" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Proyectos
              </a>
            </>
          ) : (
            <Link to="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Inicio
            </Link>
          )}

          <Link
            to="/posts"
            className={`hover:text-neutral-900 dark:hover:text-white transition-colors ${
              location.pathname.startsWith("/posts") ? "text-blue-600 dark:text-blue-400 font-semibold" : ""
            }`}
          >
            Posts
          </Link>

          <div className="pl-2 border-l border-neutral-200 dark:border-neutral-800">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;