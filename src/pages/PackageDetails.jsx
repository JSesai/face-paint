import React, { useEffect, useState } from 'react'
import useAuth from "../hooks/useAuth";
import Mapa from '../components/Mapa';
import Calendario from '../components/calendario';
import { isDateAllowed } from '../helpers/dates'


export default function PackageDetails() {
  const { navigate, selectedPackage, eventInformation } = useAuth();
  const [estatusEvent] = useState(selectedPackage.price ? 'reservation' : 'GetAquote');



  return (
    <section className="bg-gray-100 min-h-screen py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{selectedPackage.title}</h1>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* carrusel de Imagenes */}
          <div>
            <img
              // src={selectedPackage.image}
              src={`/${selectedPackage.image}`}
              alt={selectedPackage.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Información */}
          <div className="flex flex-col gap-2">
            <p className="text-2xl text-gray-700 mb-4">{selectedPackage.description}</p>

            <p className="text-xl font-bold text-gray-900 mb-4">${selectedPackage.price} MXN</p>

            {/* Características adicionales */}
            {selectedPackage.features && (
              <div className="mb-4">
                <h2 className="font-semibold text-gray-800 mb-2">Incluye:</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => navigate('/reservationMaps')}
              className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 rounded w-full md:w-auto"
            >
              Quiero Reservar
            </button>
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded w-full md:w-auto"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </section>
  );


}



