import React, { useState, useEffect } from 'react';
import { FaCalendarCheck, FaUsers, FaDollarSign, FaTasks,FaInbox } from 'react-icons/fa'; // Importando los iconos de React Icons

const MainHub = () => {


  return (
    <div className="min-h-screen p-6 ">
     

      {/* Contenedor principal con Flexbox */}
      <div className="flex flex-wrap gap-6 justify-center ">
        {/* Card 1: Eventos Confirmados */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <FaCalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-4">Eventos Confirmados</h3>
          </div>
          <p className="text-3xl font-bold text-blue-500">120</p>
        </div>

        {/* Card 2: Nuevos Usuarios */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 text-white p-3 rounded-full">
              <FaUsers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-4">Nuevos Usuarios</h3>
          </div>
          <p className="text-3xl font-bold text-green-500">25</p>
        </div>

        {/* Card 3: Ingresos Generados */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-500 text-white p-3 rounded-full">
              <FaDollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-4">Ingresos Generados</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-500">$35,000</p>
        </div>

        {/* Card 4: Tareas Pendientes */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="flex items-center mb-4">
            <div className="bg-red-500 text-white p-3 rounded-full">
              <FaTasks className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-4">Tareas Pendientes</h3>
          </div>
          <p className="text-3xl font-bold text-red-500">8</p>
        </div>
        {/* Card 5: paquetes promocionados */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500 text-white p-3 rounded-full">
              <FaInbox className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 ml-4">Paquetes Existentes</h3>
          </div>
          <p className="text-3xl font-bold text-purple-500">2</p>
        </div>
      </div>
    </div>

  );
};

export default MainHub;
