import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import { FaRegClock, FaRegCalendarAlt, FaMapMarked, } from "react-icons/fa";
import { FaMoneyBillTrendUp, FaRegHandshake } from "react-icons/fa6";
import EventMap from '../components/EventMap';
import data from '../data/data';
import { formatToCurrency } from '../helpers/formatCurrency';
import { convertTimeTo12HourFormat, formatDateToReadableText } from '../helpers/dates';



export default function EventDetail() {

  const { auth, showAlert, navigate, clienteAxios, eventSelected } = useAuth();
  console.log('este es el evento seleccionado', eventSelected);
  const { eventType, name, eventTime, eventDate, selectedPackage, total_paid_amount, ubicatioEvent } = eventSelected;


  const onCover = () => {
    console.log('sending request..', data);


  }

  return (
    <div className="w-auto sm:max-w-4xl md:mx-auto p-2 m-2 bg-white  border-gray-200 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Evento - {eventType} </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-64 bg-gray-200 flex items-center justify-center rounded-lg relative z-10">
          <EventMap lat={ubicatioEvent.lat} lon={ubicatioEvent.lon} />
        </div>
        {/* Información del evento */}
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <FaRegHandshake className="mr-2" />
            <span className="font-medium">Cliente <strong>{name}</strong> </span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaMoneyBillTrendUp className="mr-2" />
            <span className="font-medium">Al cubrir el evento ganaras <strong>{formatToCurrency(selectedPackage.price - total_paid_amount)}</strong> </span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaRegCalendarAlt className="mr-2" />
            <span className="font-medium"> <strong>{formatDateToReadableText(eventDate)}</strong> </span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaRegClock className="mr-2" />
            <span className="font-medium"> <strong>{convertTimeTo12HourFormat(eventTime)}</strong> </span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaMapMarked className="mr-2" />
            <span className="font-medium">Ver ubicación en <strong>
              <Link
                to={`https://maps.google.com/maps?daddr=${ubicatioEvent.lat},${ubicatioEvent.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Google Maps
              </Link>
            </strong> </span>
          </div>
          <div className="text-gray-600">
            <h3 className="font-semibold"> {data.recommendations.title}: </h3>
            <div>
              <ul className="list-disc pl-6">
                {
                  data.recommendations.value.map( ({ id, recommendation }) => (
                    <li key={id}> {recommendation} </li>
                  ))
                }              
              </ul>
            </div>
          
          </div>
          <div className="text-gray-600">
            <h3 className="font-semibold"> {data.suggestions.title}: </h3>
            <div>
              <ul className="list-disc pl-6" >
                {
                  data.suggestions.value.map( ({ id, suggestion }) => (
                    <li key={id}> {suggestion} </li>
                  ))
                }               
              </ul>
            </div>

          </div>
        </div>

      </div>

      {/* Acciones */}
      <div className="mt-7 flex justify-center">
        <button
          className="w-full md:w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 capitalize"
          onClick={onCover}
        >
          Solicitar Cubrir Evento
        </button>
      </div>

      <div className="mt-1 mb-7 flex justify-center">
        <button
          className="w-full md:w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 capitalize"
          onClick={()=> navigate('/events/manage-events')}
        >
         Volver a Todos los Eventos
        </button>
      </div>
    </div>
  );
}
