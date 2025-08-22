
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ValidationRequestError, ValidationInputError } from "../utils/handlerErrors";
import { handlerTypeError } from "../utils/validateTypeError";
import { validateInformation } from '../helpers/validation';
import useAuth from "../hooks/useAuth";

export default function NewPassword() {
  const { showAlert, navigate, clienteAxios } = useAuth();
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const params = useParams();
  const { token } = params;

  //comprueba el token sea valido haciendo una peticion get
  const comprobarToken = async () => {
    try {
      showAlert({ typeAlert: 'loading' });
      //cabeceras para el envio de la peticion (objeto con la config)
      const config = {
        headers: {
          "Content-Type": "application/json", //tipo de contenido
          Authorization: `Bearer ${token}`, //enviamos el tipo de autenticacion que es Bearer y el JWT que es nuestro token
        }
      }

      const { data } = await clienteAxios('/users/forgot-password', config);
      const { statusCode, message, response } = data;
      if (statusCode !== 200) throw new ValidationRequestError(message);
      setTokenValido(true);
      showAlert({ typeAlert: 'closeAlert' });
      setId(response.id)


    } catch (error) {
      console.log('here is the error', error.name);
      handlerTypeError(error);
    }
  }

  //submit del form, envia nuevo passwors haciendo peticion post
  const handleSubmit = async e => {

    e.preventDefault();
    try {
      validateInformation({ "Contraseña": password });
      if (password.length < 6) throw new ValidationInputError('La contraseña es muy corta. Debe ser  mayor a 6 caracteres');
      showAlert({ typeAlert: 'loading' });
      const config = {
        headers: {
          "Content-Type": "application/json", //tipo de contenido
        }
      };
      const { data } = await clienteAxios.patch('/users/forgot-password', { password, id }, config);
      const { statusCode, response, message  } = data;
      if (statusCode !== 200) throw new ValidationRequestError(message);

      showAlert({
        typeAlert: 'success',
        message: response.message,
        callbackAcept: () => navigate('/login')
      });

    } catch (error) {
      console.log('here is the error', error.name);
      handlerTypeError(error);
    }
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center flex-col gap-5">
        <h1 className="text-purple-400 font-black text-3xl md:w-2/3 text-center capitalize">reestablece tu password y no pierdas acceso a tus {' '} <span className="text-slate-700">Eventos</span> </h1>
        {tokenValido ?
          (
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-11/12 ">
              <form onSubmit={handleSubmit}>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nuevo Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Escribe tu Nuevo Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Guardar Nuevo Password
                </button>
              </form>

            </div>
          )
          :
          (
            <button onClick={comprobarToken} className="bg-purple-400 lg:w-4/12 my-20 p-3 text-white font-bold uppercase rounded-lg hover:cursor-pointer hover:bg-purple-700 transition-colors ">Reestablecer Password Ahora</button>
          )
        }

      </div>

    </>
  )
}
