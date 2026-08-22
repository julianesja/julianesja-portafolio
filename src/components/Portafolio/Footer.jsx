import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 py-10 mt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <div>
          <p>© {new Date().getFullYear()} Julian Estrada Jaramillo.</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            Desarrollado con React, Tailwind CSS y Firebase.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/julian-estrada-jaramillo-840a7698/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/julianesja/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/conciliador"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Conciliador
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;