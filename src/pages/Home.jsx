import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";


export default function Home() {
    const location = useLocation();

    return (
        <div>
            <Navbar />
            <main>
                <section>
                    {location.pathname === "/" && (
                        <>
                            <h2 className="text-3xl font-bold text-center text-gray-800 mt-7 mb-4">
                                ¡Crea recuerdos inolvidables!
                            </h2>
                            <p className="text-lg text-center text-gray-600 mb-6">
                                Porque lo mejor de la vida son las personas que amamos y los momentos que compartimos.
                                Hagamos de cada ocasión algo único.
                            </p>
                            <Carousel />
                        </>
                    )}
                    <Outlet />



                </section>
            </main>
            <Footer />
        </div>
    );
}
