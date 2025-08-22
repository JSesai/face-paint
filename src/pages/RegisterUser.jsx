import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { currentDate } from "../helpers/dates";
import { ValidationRequestError, ValidationInputError } from "../utils/handlerErrors";
import { validateInformation } from '../helpers/validation';
import { handlerTypeError } from "../utils/validateTypeError";



export default function RegisterUser({ typeUser = 'collaboratorArtist' }) {

  const { showAlert, navigate, clienteAxios } = useAuth();
  const { nombre, email, telefono, password, repetirPassword, onInputValue, resetForm } = useForm({ nombre: '', email: '', telefono: '', password: '', repetirPassword: '' })


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //validacion de datos ingresados
      validateInformation({ "Nombre": nombre, "Correo": email, "Telefono": telefono, "Contraseña": password, "Repetir contraseña": repetirPassword }); //valida campos vacios
      if (password.length < 6) throw new ValidationInputError('La contraseña es muy corta. Debe ser  mayor a 6 caracteres');
      if (password !== repetirPassword) throw new ValidationInputError('Los contraseñas ingresadas no son iguales.');

      showAlert({ typeAlert: 'loading' });
      const sendInformation = { nombre, email, telefono, password, typeUser, dateRegister: currentDate() }
      
      const { data } = await clienteAxios.post('/users', sendInformation);
      const { statusCode, message, response } = data;
      if (statusCode !== 200) throw new ValidationRequestError(message);
      resetForm();//reseteamos el formulario
      showAlert({
        typeAlert: 'success',
        message: response.message, //mensaje retornado del back
        callbackAcept: () => navigate('/login')
      });

    } catch (error) {
      console.log('here is the error', error.name);      
      handlerTypeError(error);
    }
  }

  return (

    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white m-2 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Registrate</h2>



        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ingresa tu correo electrónico"
              value={nombre}
              onChange={onInputValue}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={onInputValue}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Numero Telefónico</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ingresa tu Numero Telefónico"
              value={telefono}
              onChange={onInputValue}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={onInputValue}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="repetir-password" className="block text-sm font-medium text-gray-700">RepetirContraseña</label>
            <input
              type="password"
              id="repetirPassword"
              name="repetirPassword"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Repite tu contraseña"
              value={repetirPassword}
              onChange={onInputValue}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Registrarme
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/olvide-password" className="text-sm text-purple-600 hover:text-purple-800">¿Olvidaste tu contraseña?</Link>
          <p className="mt-2 text-sm text-gray-600">Tienes cuenta? <Link to="/login" className="text-purple-600 hover:text-purple-800">Inicia sesión</Link></p>
        </div>
      </div>
    </div>

  )
}
