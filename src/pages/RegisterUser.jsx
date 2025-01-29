import { useState } from "react"
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth"



export default function RegisterUser() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const { showAlert, navigate } = useAuth()


  const handleSubmit = async (e) => {
    e.preventDefault();
    //metemos en un array los estates para poder usar el metodo includes y evaluar que ninguno incluya valor vacio
    if ([nombre, email, password, repetirPassword].includes('')) {

      showAlert({
        title: 'Faltan datos 😥',
        typeAlert: 'error',
        message: 'Todos los campos son obligatorios',
      });
      return
    }
    //comprueba si password y repetir password no son iguales 
    if (password !== repetirPassword) {
      showAlert({
        title: 'Revisa  tus passwords 😥',
        typeAlert: 'error',
        message: 'Los passwords ingresados no son iguales',
      });
      return
    }

    //comprueba si la password es menor a 6 caracteres
    if (password.length < 6) {
      showAlert({
        title: 'El password es muy corto 😥',
        typeAlert: 'error',
        message: 'Debe ser  mayor a 6 caracteres',
      });
      return
    }

    //enviamos la peticion al backend con ayuda de axios
    try {
      showAlert({
        typeAlert: 'loading'
      })
      //hacemos uso de la baseurl que esta en cliente axios
      const { data } = await clienteAxios.post('/users', { nombre, email, password }); //peticion post pasa primer parametro la url, segundo parametro lo que envia en este caso enviamos un objeto con los datos necesarios para hacer un nuevo registro

      //seteamos los inputs a campos vacios
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');

      //seteamos la alerta para mostrar el mensaje retornado del back
      console.log(data);
      showAlert({
        typeAlert: 'success',
        message: data.message,
        callbackAcept: () => navigate('/')
      })

    } catch (error) {
      console.log(error);
      let message = error.response.data.message || 'Ocurrio un error intentalo más tarde si el problema persiste contacte a soporte técnico.'
      //en caso de ocurrir un error lo cachamos con axios con ayuda de error.response
      showAlert({
        typeAlert: 'error',
        message,
      })
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
              onChange={(e) => setNombre(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="repetir-password" className="block text-sm font-medium text-gray-700">RepetirContraseña</label>
            <input
              type="password"
              id="repetir-password"
              name="repetir-password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Repite tu contraseña"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
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
