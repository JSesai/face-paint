import React from 'react'
import useAuth from "../hooks/useAuth"; //fn hook propio que nos permite acceder a nuestro context de autenticacion AuthContext


export default function Cotizacion() {
  const { location } = useAuth();
  console.log(location);
  

  return (
    <div>
      <h1>Enviando cotizacion...</h1>
    </div>
  )
}
