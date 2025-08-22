import React, { useCallback, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { FaMapMarkerAlt, FaRegClock, FaClipboardList, FaRegCalendarAlt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import { convertTimeTo12HourFormat, formatDateToReadableText } from '../helpers/dates';
import { formatToCurrency } from '../helpers/formatCurrency';
import { handlerTypeError } from '../utils/validateTypeError';

//? documentacion web socket conexioon -> https://github.com/robtaussig/react-use-websocket


const EventsList = ({allEvents, typeUser}) => {

  if(allEvents.length === 0 ){
    return <div className='text-red-400 text-center'>No hay Eventos por cubrir aun!!</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {allEvents.map((evento) => (
      <div
        key={evento.id}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Evento a cubrir: {evento.eventType}
          </h2>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-700">
              <FaMoneyBillTrendUp className="mr-2" />
              <span className="font-medium">Ganancia <strong>{formatToCurrency(evento.selectedPackage.price - evento.paidAmountReservation)}</strong> </span>
            </div>

            <div className="flex items-center text-gray-700">
              <FaRegCalendarAlt className="mr-2" />
              <span>{formatDateToReadableText(evento.eventDate)}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaRegClock className="mr-2" />
              <span>{convertTimeTo12HourFormat(evento.eventTime)}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleEventSelected(evento)}
              className="w-full h-10 min-w-max bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-4 rounded whitespace-nowrap"
            >
              Más Información
            </button>

            {typeUser === "managerArtist" && (
              <button
                onClick={() => handleManageEvent(evento)}
                className="w-full h-10 min-w-max bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-4 rounded whitespace-nowrap"
              >
                Administrar
              </button>
            )}
          </div>


          <button onClick={() => sendMessage(evento)}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            sendMessage
          </button>
        </div>
      </div>
    ))}
  </div>
  )
}


export default function EventsAll() {

  const { showAlert, setCargando, clienteAxios, handleEventSelected, auth, allEvents, setAllEvents } = useAuth();
  console.log(auth);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [socketUrl, setSocketUrl] = useState('wss://blt0o92lx6.execute-api.us-east-1.amazonaws.com/development/');
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, { shouldReconnect: () => false, onMessage: (message) => {
    console.log("📩 Mensaje recibido del servidor:", message.data);
  }, });



  useEffect(() => {
    if (lastMessage !== null) {
        setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('wss://blt0o92lx6.execute-api.us-east-1.amazonaws.com/development/'), []);
  const handleClickSendMessage = useCallback(() => sendMessage('Hello desde la libreria'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];


  useEffect(() => {
    console.log('obtener todos los eventos');
    getDataLoad();

  }, [])

  const getDataLoad = async () => {
    setCargando(true);
    await getEvents();




  }

  //obtener parametro
  const getEvents = async () => {
    try {

      console.log('obteniendo eventos reservados');

      const { data } = await clienteAxios('/eventos', { id: auth._id });
      console.log(data);
      setCargando(false);
      setAllEvents(data.response)
      // return data
      // return parametro
    } catch (error) {
      const infoError = handlerTypeError(error);
      console.log(infoError);
      showAlert(infoError);


    }
  }


  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Eventos Disponibles
        </h1>

        <p>Estado de la conexión: {connectionStatus}</p>

        <EventsList allEvents={allEvents} typeUser={auth.typeUser} />         

      </div>
    </section>
  )
}
