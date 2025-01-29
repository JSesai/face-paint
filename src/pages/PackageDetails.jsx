import React, { useState } from 'react'
import useAuth from "../hooks/useAuth";
import Mapa from '../components/Mapa';
import Calendario from '../components/calendario';
import { isDateAllowed } from '../helpers/dates'


export default function PackageDetails() {
  const { navigate,
    selectedPackage,
    showAlert,
    formatToCurrency,
    development,
    clienteAxios,
    paramValuesFacePaint,
    redirectToWhatsApp,
    showEventLocation,
    position,
    resetValuesReservation
  } = useAuth();
  const [nombre, setNombre] = useState('');
  const [tipoEvento, setTipoEvento] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);
  const [numeroReferencia, setNumeroReferencia] = useState('');
  const [errorYaExisteReferencia, setErrorYaExisteReferencia] = useState(0);

  const handlerExisteReferencia = () => {
    setErrorYaExisteReferencia(errorYaExisteReferencia + 1)
  }

  const confirmSend = async (e) => {
    e.preventDefault()
    const message = `${nombre.split(' ')[0]} tu ${tipoEvento} se ${selectedPackage.title ? `reservara con el ${selectedPackage.title}` : 'cotizara'} para el ${fecha} a las ${hora} `
    showAlert({
      typeAlert: 'confirm',
      title: 'Confirma tu información',
      btnAccept: 'Confirmar',
      message,
      callbackAcept: () => handleSubmit(),

    })
  }

  const handleSubmit = async () => {

    const intentosPermitidos = 3;

    try {

      let estatusEvent = ''
      if (selectedPackage.price) {
        development && console.log('es confirmacion');
        estatusEvent = 'reservation'

      } else {
        estatusEvent = 'GetAquote'
      }

      //metemos en un array los estates para poder usar el metodo includes y evaluar que ninguno incluya valor vacio
      if ([nombre, tipoEvento, numeroContacto].includes('')) {
        throw new Error('Todos los campos son obligatorios')
      }
      if (estatusEvent === 'reservation') {
        if ([numeroReferencia.trim()].includes('')) throw new Error('Número de referencia es obligatorio');
        if (numeroReferencia.trim().length < 7) throw new Error('Número de referencia Invalido');
      }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(numeroContacto)) throw new Error('Formato de número de contacto invalido');
        //validar fecha seleccionada
        isDateAllowed(fecha, { allowToday: false, maxMonths: 1, allowNextDayBeforeHour: true, hourLimit: 13 });
        const [lat, lon] = position
        development && console.log({ lat, lon });
        showAlert({ typeAlert: 'loading' })

        const sendData = {
          nombre,
          tipoEvento,
          fecha,
          hora,
          numeroContacto,
          numeroReferencia,
          estatusEvent,
          selectedPackage,
          ubicatioEvent: { lat, lon }
        }
        development && console.log('ENVIANDO DATA', sendData);
        //enviar informacion
        const { data } = await clienteAxios.post('/reservation', sendData);
        development && console.log(data);

        showAlert({
          typeAlert: 'success',
          title: `${estatusEvent === 'reservation' ? '¡Reservación Recibida!' : '¡Cotización Recibida!'}`,
          message: data.message,
          callbackAcept: () => resetValuesReservation(),
          callbackCancel: () => navigate('/about')
        })

      } catch (error) {
        console.log(error);
        let message = error.code ? error.response?.data?.message : error.message
        if (error.response?.data?.message.includes('Ya existe una reservación con ese número de referencia.')) handlerExisteReferencia()
        development && console.log('La reservacion ya esta registrada, intento: ', errorYaExisteReferencia);

        if (errorYaExisteReferencia === intentosPermitidos) {
          development && console.log('parametro de s3', paramValuesFacePaint);
          const messageHelp = paramValuesFacePaint.helpsMessage.find(msg => msg.reservationExists)
          development && console.log('mensage de ayuda:', messageHelp);
          const messageSend = messageHelp.reservationExists.replace('#transfer', numeroReferencia)
          development && console.log('enviar el mensage:', messageSend);
          showAlert({
            title: 'Lo sentimos 😥',
            typeAlert: 'info',
            message: '¿Requieres ayuda para confirmar la recepción de la transferencia?',
            btnAccept: 'Solicitar ayuda',
            callbackAcept: () => {
              redirectToWhatsApp(messageSend);
              resetValuesReservation();
            },
            callbackCancel: () => navigate('/about')
          });
          return
        } else {

          showAlert({
            typeAlert: 'error',
            title: 'Upss!! 😥',
            message,
          });
          return

        }
      }
    }

  return (
      showEventLocation ? (
        <Mapa titleMap="Ubicación del evento" cp="código postal" />

      )
        :
        (
          <section className="bg-gray-100 py-2">
            <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                {selectedPackage.title}
              </h1>
              <p className="text-gray-700 text-base mb-3">{selectedPackage.details}</p>
              <p className="text-lg font-bold text-green-600">{selectedPackage.price && formatToCurrency(selectedPackage.price)}</p>

              <form
                className="mt-4 bg-white p-4 rounded-lg shadow-md max-h-[80vh] overflow-y-auto"
                onSubmit={confirmSend}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3"> {selectedPackage.price ? 'Reserva tu evento' : 'Cotiza Tu Evento'}</h2>
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ingresa tu nombre Completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
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
                    value={tipoEvento}
                    placeholder="Cumpleaños, boda, etc."
                    onChange={(e) => setTipoEvento(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg p-1"
                  />
                </div>

                {/* Campo para la fecha y hora*/}
                <div className="mb-3">
                  <Calendario setHora={setHora} setFecha={setFecha} />
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
                    value={numeroContacto}
                    onChange={(e) => setNumeroContacto(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg p-1"
                  />
                </div>

                {
                  selectedPackage?.price && (
                    <div className="mb-3">
                      <label
                        htmlFor="numero-referencia"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Clave de rastreo o número de referencia
                      </label>
                      <input
                        type="text"
                        id="numero-referencia"
                        name="numero-referencia"
                        placeholder="Ingresa clave de rastreo o número de referencia"
                        value={numeroReferencia}
                        onChange={(e) => setNumeroReferencia(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-1"
                      />
                    </div>)
                }


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
                      Acepto los <p onClick={()=> navigate('terms-conditions')} className="text-green-500 underline inline">términos y condiciones</p>
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  {selectedPackage.price ? 'Confirmar Reservación' : 'Cotizar Evento'}
                </button>
              </form>
            </div>
          </section>

        )




    );
  }
