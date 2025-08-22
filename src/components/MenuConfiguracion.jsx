import React from 'react'
import { FaImage, FaUsers } from 'react-icons/fa'
import { FcDataConfiguration } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

export default function MenuConfiguracion() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-wrap gap-6 justify-center mt-5">
            {/* Card 1: Editar paquetes */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
                <div className="flex items-center mb-4" onClick={()=> navigate('package')}>
                    <div className="bg-blue-500 text-white p-3 rounded-full">
                        <FcDataConfiguration className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 ml-4">Editar Paquetes </h3>
                </div>
            
            </div>

            {/* Card 2: Administrar Usuarios */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
                <div className="flex items-center mb-4">
                    <div className="bg-green-500 text-white p-3 rounded-full">
                        <FaUsers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 ml-4">Administrar Usuarios</h3>
                </div>
            </div>

            {/* Card 3: Cargar Imagenes */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
                <div className="flex items-center mb-4">
                    <div className="bg-yellow-500 text-white p-3 rounded-full">
                        <FaImage className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 ml-4">Cargar Imagenes</h3>
                </div>
            </div>

        </div>
    )
}
