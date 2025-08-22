import React from "react";



export default function Flyer({ src, textAlt = "Flyer promocional", width = "w-5/6", height = "h-auto" }) {
    console.log(textAlt);

    return (
        <div
            className={`my-4 m-auto rounded-2xl shadow-lg overflow-hidden border ${width} ${height}`}
        >
            <img
                src={src}
                // alt={textAlt ? textAlt :'image'}
                alt={textAlt}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
        </div>
    );
};

