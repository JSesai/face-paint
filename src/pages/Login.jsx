import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"; //fn hook propio que nos permite acceder a nuestro context de autenticacion AuthContext
import LoginForm from "../components/LoginForm";


export default function Login() {
  
  //extraer del context
  const { setAuth, showAlert, navigate, development, clienteAxios } = useAuth();

  //envio de petiicon para loguin
  const handleSubmit = async( e, email, password) => {
    e.preventDefault();//evita envio por default
    if ([email.trim(), password.trim()].includes('')) { //valida si estan vacios email y password    
      showAlert({
        typeAlert: 'error',
        title: 'Faltan datos',
        message: 'Debes ingresar Usuario y Contraseña',     
      })
      return
    }
    
    try { 
      showAlert({typeAlert: 'loading'})
      //enviamos datos para validar loguin
      const { data } = await clienteAxios.post('/users/login', { email, password });
     
      console.log(data);
      //almacenamos el LS el token que es JWT que contiene el id del usuario
      localStorage.setItem('token', data.user.token);
      //guardamos la informacion data en el context
      const user = {
        _id: data.user.id,
        name: data.user.nombre,
        email: data.user.email
      }
      setAuth(user);
      //navegamos a proyectos
      showAlert({
        typeAlert: 'closeAlert',
        callbackAcept: () => navigate('/files')
      })
     
    } catch (error) {
      console.log(error);

      let message = error.response?.data?.message || 'Ocurrio un error intentalo más tarde si el problema persiste contacte a soporte técnico.'
      showAlert({
        typeAlert: 'error',
        title: 'Error al iniciar sesión',
        message: message,
      })
    
    }

  }

  return (
    
    <LoginForm 
    // email={email}
    // setEmail={setEmail}
    // password={password}
    // setPassword={setPassword}
    handleSubmit={handleSubmit}

    />
  )
}
