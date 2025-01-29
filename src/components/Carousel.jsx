import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Carousel = () => {
    
    //extraer del context
    const { paramValuesFacePaint } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Cambio automático de imágenes cada 3 segundos
    useEffect(() => {
        console.log(paramValuesFacePaint.imagesFacePaint);
        if(paramValuesFacePaint && paramValuesFacePaint?.imagesFacePaint) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % paramValuesFacePaint.imagesFacePaint.length);
            }, 4000); // Cambia cada 3 segundos
    
            return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonte el componente
        }
        
    }, [paramValuesFacePaint?.imagesFacePaint?.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % paramValuesFacePaint.imagesFacePaint.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + paramValuesFacePaint.imagesFacePaint.length) % paramValuesFacePaint.imagesFacePaint.length
        );
    };

    return (
        <div className="relative w-full">
            <div className="overflow-hidden relative w-full">
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {paramValuesFacePaint?.imagesFacePaint?.map((img, index) => (
                        <div key={index} className="flex-shrink-0 w-full">
                            <img
                                src={img.url}
                                alt={img.name}
                                className="w-full h-72 sm:h-95 lg:h-[500px] object-cover "

                                // className="w-full h-72 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Botones de navegación */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
            >
                &#8249;
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
            >
                &#8250;
            </button>
        </div>
    );
};

export default Carousel;
