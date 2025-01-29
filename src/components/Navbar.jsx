import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-purple-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <div className="text-2xl font-semibold">
                    <Link to="/">Pintacaritas</Link>
                </div>

                {/* Menú principal */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:bg-purple-700 px-3 py-2 rounded-md">Inicio</Link>
                    <Link to="/package" className="hover:bg-purple-700 px-3 py-2 rounded-md">Paquetes</Link>
                    <Link to="/about" className="hover:bg-purple-700 px-3 py-2 rounded-md">Sobre Nosotros</Link>
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
                <div className="md:hidden bg-purple-600 text-white py-4 px-6">
                    <Link
                        to="/"
                        className="block py-2 px-4 rounded-md hover:bg-purple-700"
                        onClick={toggleMobileMenu}
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/package"
                        className="block py-2 px-4 rounded-md hover:bg-purple-700"
                        onClick={toggleMobileMenu}
                    >
                        Paquetes
                    </Link>
                    <Link
                        to="/about"
                        className="block py-2 px-4 rounded-md hover:bg-purple-700"
                        onClick={toggleMobileMenu}
                    >
                        Sobre Nosotros
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
