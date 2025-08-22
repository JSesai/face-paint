import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Flyer from "../components/Flyer";


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
                            <Flyer src={'/flyer-3.png'} textAlt={'Paquete basico'} />
                            <Flyer src={'/flyer-2.png'} textAlt={'Paquete doble'} />
                            <Flyer src={'/flyer-1.png'} textAlt={'Paquete belly'} />
                        </>
                    )}
                    <Outlet />

                  


                </section>
            </main>
            <Footer />
        </div>
    );
}
