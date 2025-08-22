import React, { useEffect, useState } from 'react'
import useAuth from "../hooks/useAuth";
import Mapa from '../components/Mapa';
import Calendario from '../components/calendario';
import { isDateAllowed } from '../helpers/dates'


export default function ReservationMaps() {
  const {
    navigate,
    selectedPackage,
    showAlert,
    formatToCurrency,
    development,
    clienteAxios,
    showEventLocation,
    position,
    resetValuesReservation,
    eventInformation,
    onChangeFormEventInformation
  } = useAuth();

  const { name, nameF, eventType, contactNumber, eventDate, eventTime } = eventInformation;
  const [estatusEvent] = useState(selectedPackage.price ? 'reservation' : 'GetAquote');

  const confirmSend = async (e) => {
    try {
      e.preventDefault();
      if ([eventType, contactNumber, eventDate, eventTime].includes('')) throw new Error('Todos los campos son obligatorios');//validar que ninguno campo incluya valor vacio
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(contactNumber)) throw new Error('Formato de número de contacto invalido'); //validar telefono
      isDateAllowed(eventDate, { allowToday: false, maxMonths: 1, allowNextDayBeforeHour: true, hourLimit: 13 }); //validar fecha seleccionada

      if (estatusEvent === 'reservation') return navigate('/make-payment-reservation'); //si es reservacion dirigirlo a pasarela de pago

      if ([name].includes('')) throw new Error('Todos los campos son obligatorios');//validar que se incluya nombre
      const message = `${name.length > 0 && name.split(' ')[0]} tu ${eventType} se ${selectedPackage.title ? `reservara con el ${selectedPackage.title}` : 'cotizara'} para el ${eventDate} a las ${eventTime} `;
      showAlert({
        typeAlert: 'confirm',
        title: 'Confirma tu información',
        btnAccept: 'Confirmar',
        message,
        callbackAcept: () => handleSubmit(),
      });

    } catch (error) {
      console.log(error);
      let message = error.code ? error.response?.data?.message : error.message;

      showAlert({
        typeAlert: 'error',
        title: 'Revisa tu información!! 😥',
        message,
      });
    }
  }

  const handleSubmit = async () => {

    try {


      const [lat, lon] = position; //obtener coordenadas
      //envio de informacion
      const sendData = {
        name,
        eventType,
        contactNumber,
        eventDate,
        eventTime,
        estatusEvent,
        selectedPackage,
        ubicatioEvent: { lat, lon }
      };

      showAlert({ typeAlert: 'loading' });
      development && console.log('ENVIANDO DATA', sendData);
      //enviar informacion
      const { data } = await clienteAxios.post('/reservation', sendData);
      development && console.log(data);

      showAlert({
        typeAlert: 'success',
        title: '¡Cotización Recibida!',
        message: data.message,
        callbackAcept: () => {
          resetValuesReservation();
          navigate('/about');
        },
        // callbackCancel: () => {
        //   resetValuesReservation();
        //   navigate('/about');
        // }
      });

    } catch (error) {
      console.log(error);
      let message = error.code ? error.response?.data?.message : error.message;

      showAlert({
        typeAlert: 'error',
        title: 'Revisa tu información!! 😥',
        message,
      });
    }
  }

  return (
    showEventLocation ?

      (<Mapa titleMap="Selecciona ubicación del evento" cp="código postal" />)

      :

      (
        <section className="bg-gray-100 py-2">
          <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              {selectedPackage.title}
            </h1>
            <p className="text-gray-700 text-base mb-3">{selectedPackage.details} </p>
            {/* <p className="text-lg font-bold text-green-600">{selectedPackage.price && formatToCurrency(selectedPackage.price)}</p> */}

            <form
              className="mt-4 bg-white p-4 rounded-lg shadow-md max-h-[80vh] overflow-y-auto"
              onSubmit={confirmSend}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3"> {selectedPackage.price ? 'Reserva tu evento' : 'Cotiza Tu Evento'}</h2>
              {
                estatusEvent === 'GetAquote' && (
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      placeholder="Ingresa tu nombre completo."
                      onChange={onChangeFormEventInformation}
                      required
                      className="w-full border border-gray-300 rounded-lg p-1"
                    />
                  </div>

                )
              }


              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre del festejado
                </label>
                <input
                  type="text"
                  id="nameF"
                  name="nameF"
                  value={nameF}
                  placeholder="Ingresa nombre del festejado."
                  onChange={onChangeFormEventInformation}
                  required
                  className="w-full border border-gray-300 rounded-lg p-1"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="eventType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tipo de evento
                </label>
                <input
                  type="text"
                  id="eventType"
                  name="eventType"
                  value={eventType}
                  placeholder="Cumpleaños, boda, etc."
                  onChange={onChangeFormEventInformation}
                  required
                  className="w-full border border-gray-300 rounded-lg p-1"
                />
              </div>

              {/* Campo para la fecha y hora*/}
              <div className="mb-3">
                <Calendario setHora={onChangeFormEventInformation} setFecha={onChangeFormEventInformation} />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Número de contacto
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  pattern="[0-9]{10}"
                  placeholder="Ingresa tu número telefónico"
                  value={contactNumber}
                  onChange={onChangeFormEventInformation}
                  required
                  className="w-full border border-gray-300 rounded-lg p-1"
                />
              </div>

              <div className="mb-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="termsAndConditions"
                    name="termsAndConditions"
                    required
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring focus:ring-green-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Acepto los <p onClick={() => navigate('terms-conditions')} className="text-green-500 underline inline">términos y condiciones</p>
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                {selectedPackage.price ? 'Continuar Reservación' : 'Cotizar Evento'}
              </button>
            </form>
          </div>
        </section>

      )




  );
}
