import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { currentDate } from "../helpers/dates";
import { handlerTypeError } from "../utils/validateTypeError";
import { validateInformation } from '../helpers/validation';
import { ValidationRequestError } from "../utils/handlerErrors";


export default function ForgotPassword() {
  const { showAlert, navigate, clienteAxios } = useAuth();
  const { email, onInputValue } = useForm({ email: '' });


  const handleSubmit = async e => {
    try {
      e.preventDefault();
      validateInformation({ "Correo Electrónico": email });
      showAlert({ typeAlert: 'loading' });
      //hacemos peticion post y extraemos lo que devuelve como respuesta en data
      const { data } = await clienteAxios.post(`/users/forgot-password`, { email, recoveyDate: currentDate() });
      const { statusCode, message, response } = data;
      if (statusCode !== 200) throw new ValidationRequestError(message);
      showAlert({
        typeAlert: 'success',
        message: response.message,
        callbackAcept: () => navigate('/')
      });
    } catch (error) {
      console.log('here is the error', error.name);      
      handlerTypeError(error);
    }
  };


  return (
    <>

      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white m-2 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Recupera tu cuenta</h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={ onInputValue }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Enviar
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="mt-2 text-sm text-gray-600">¿No tienes cuenta? <Link to="/registrar" className="text-purple-600 hover:text-purple-800">Regístrate</Link></p>
            <p className="mt-2 text-sm text-gray-600">¿Tienes cuenta? <Link to="/login" className="text-purple-600 hover:text-purple-800">Inicia sesión</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}
