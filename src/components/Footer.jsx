import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Footer() {
    const { redirectToWhatsApp } = useAuth();
    return (
        <footer className="bg-gradient-to-b from-violet-300 via-pink-400 to-purple-500 text-white py-6 mt-16">
            {/* // <footer className="bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800 text-white py-6 mt-16"> */}
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo y descripción */}
                <div>
                    <h2 className="text-xl font-bold">ColoreArte</h2>
                    <p className="mt-2 text-sm">
                        Pintacaritas profesionales para fiestas de chicos y grandes, realizamos todo tipo de eventos.
                        ¡Colorea tu fiesta, colorea tu sonrisa!
                    </p>
                </div>

                {/* Enlaces rápidos */}
                <div>
                    <h3 className="text-lg text-center font-semibold mb-1">Enlaces</h3>
                    <div className="flex justify-center flex-wrap gap-4 text-sm">
                        <Link to="/package" className="hover:underline">Paquetes</Link>
                        <Link to="/galeria" className="hover:underline">Galería</Link>
                        <Link to="#contacto" className="hover:underline">Contacto</Link>
                        <Link to="/about" className="hover:underline">Nosotros</Link>
                        <Link to="#nosotros" className="hover:underline">Promociones</Link>
                    </div>
                </div>

                {/* Redes sociales */}
                <div>
                    <div className="flex justify-center flex-wrap gap-7 text-sm">
                        <Link to="https://facebook.com" target="_blank" className="hover:scale-110 transition">
                            <FaFacebook className="text-2xl hover:text-blue-500 transition-transform hover:scale-110" />
                        </Link>
                        <Link to="https://instagram.com" target="_blank" className="hover:scale-110 transition">
                            <FaInstagram className="text-2xl hover:text-pink-500 transition-transform hover:scale-110" />
                        </Link>
                        <Link to="#" onClick={() => redirectToWhatsApp("Hola, requiero información sobre el servicio de pintacaritas.")} target="_blank" className="hover:scale-110 transition">
                            <FaWhatsapp className="text-2xl hover:text-green-500 transition-transform hover:scale-110" />

                        </Link>
                    </div>
                </div>
            </div>

            {/* Derechos reservados */}
            <div className="mt-10 border-t border-white/20 pt-2 text-center text-sm">
                © {new Date().getFullYear()} ColoreArte. Todos los derechos reservados.
            </div>
        </footer>
    );
}
