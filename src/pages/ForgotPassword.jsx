import { useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta"

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); //estate que almacena el email que el usuario ingresa

  const handleSubmit = async e => {
    e.preventDefault(); //prenimos envio por default
    //validacion de state email y vacio
    if (email === '' || email.length < 6) {
      setAlerta({
        msg: "El Email Es Obligatorio",
        error: true
      })
      return
    }
    try {
      //hacemos peticion post y extraemos lo que devuelve como respuesta en data
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email });
      // setAlerta({
      //   msg: data.msg,
      //   error: false
      // })
    } catch (error) {
      //cacha el error y extrae el mensaje que viene del back en response por eso error.respose.data.msg
      // setAlerta({
      //   msg: error.response.data.msg,
      //   error: true
      // })

    }
  }


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
                onChange={(e) => setEmail(e.target.value)}
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
            <p className="mt-2 text-sm text-gray-600">¿No tienes cuenta? <Link to="/registrar" className="text-purple-600 hover:text-purple-800">Regístrate</Link></p>
            <p className="mt-2 text-sm text-gray-600">¿Tienes cuenta? <Link to="/login" className="text-purple-600 hover:text-purple-800">Inicia sesión</Link></p>
          </div>
        </div>
      </div>



    </>
  )
}
