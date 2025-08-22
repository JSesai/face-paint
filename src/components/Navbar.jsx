import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-violet-200 to-violet-500 text-black shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* <div className="text-2xl font-semibold">
                    <Link to="/">ColoreArte</Link>
                </div> */}
                <div className="flex items-center space-x-2">
                    <img
                        src="./logo-colorearte.jpeg"
                        alt="logo colorearte"
                        className="h-14 w-auto mix-blend-multiply"
                    />
                    {/* <span className="text-xl font-semibold">Colorearte</span> */}
                </div>

                {/* Menú principal */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:bg-purple-700 px-3 py-2 rounded-md">Inicio</Link>
                    <Link to="/package" className="hover:bg-purple-700 px-3 py-2 rounded-md">Paquetes</Link>
                    <Link to="/galeria" className="hover:bg-purple-700 px-3 py-2 rounded-md">Galeria</Link>
                    <Link to="/about" className="hover:bg-purple-700 px-3 py-2 rounded-md">Nosotros</Link>
                    <Link to="/login" className="hover:bg-purple-700 px-3 py-2 rounded-md">Iniciar sesión</Link>
                </div>

                {/* Icono para menú móvil */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menú móvil */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-purple-500 text-white py-4 px-6">
                    <Link
                        to="/package"
                        className="block py-2 px-4 rounded-md hover:bg-purple-700"
                        onClick={toggleMobileMenu}
                    >
                        Paquetes
                    </Link>
                    <Link
                        to="/galeria"
                        className="block py-2 px-4 rounded-md hover:bg-purple-700"
                        onClick={toggleMobileMenu}
                    >
                        Galeria
                    </Link>
                    <Link
                        to="/promociones"
                        className="block py-2 px-4 rounded-md hover:bg-purple-700"
                        onClick={toggleMobileMenu}
                    >
                        Promociones
                    </Link>
                    <Link
                        to="/about"
                        className="block py-2 px-4 rounded-md hover:bg-purple-700"
                        onClick={toggleMobileMenu}
                    >
                        Nosotros
                    </Link>
                    <Link
                        to="/login"
                        className="block py-2 px-4 rounded-md hover:bg-purple-700"
                        onClick={toggleMobileMenu}
                    >
                        Iniciar sesión
                    </Link>
                </div>
            )}
        </nav>
    );
}
