import React from 'react'
import useArtist from '../hooks/useArtist'

export default function ConfigPackage() {
    const {development} = useArtist();
    console.log(development);
    
  return (
    <div>
      configuracion de paquetes
    </div>
  )
}
