import React, { useState, useEffect } from "react";

const imagenes = [
    { name: 'image1', url: 'majo-infantil-FP-01.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-02.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-03.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-04.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-05.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-06.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-07.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-08.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-09.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-10.jpeg' },
    { name: 'image1', url: 'majo-infantil-FP-11.jpg' },
    { name: 'image1', url: 'majo-infantil-FP-12.jpg' },
    { name: 'image1', url: 'majo-infantil-FP-13.jpg' },
    { name: 'image1', url: 'majo-infantil-FP-14.jpg' },
    { name: 'image1', url: 'majo-infantil-FP-15.jpg' },
]

const Carousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Cambio automático de imágenes cada 3 segundos
    useEffect(() => {
        console.log(imagenes);

        if (imagenes) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
            }, 4000); // Cambia cada 3 segundos

            return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonte el componente
        }

    }, [imagenes.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length
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
                    {imagenes.map((img, index) => (
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

            {
               imagenes.length > 0 &&
                (
                    <>
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
                    </>
                )
            }

        </div>
    );
};

export default Carousel;
