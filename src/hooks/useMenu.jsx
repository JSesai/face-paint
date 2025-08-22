import React from 'react'
import { FaHome, FaCog, FaUsers, FaRegCalendarCheck } from "react-icons/fa";




export default function useMenu(rol) {
    const menu = {
        "managerArtist":
            [
                { id: 1, label: "Inicio", icon: <FaHome />, path: "/events" },
                { id: 2, label: "Usuarios", icon: <FaUsers />, path: "/events/manage-users" },
                { id: 3, label: "eventos", icon: <FaRegCalendarCheck />, path: "/events/manage-events" },
                { id: 4, label: "Configuración", icon: <FaCog />, path: "/events/config-resources" },
     
            ],
        "collaboratorArtist": [
            { id: 1, label: "Inicio", icon: <FaHome />, path: "#" },
            { id: 2, label: "Usuarios", icon: <FaUsers />, path: "#" },
            { id: 3, label: "Configuración", icon: <FaCog />, path: "#" },
    
        ]
    }
    console.log('el rol es', rol);
    

  return {
    menu: menu[rol]
  }
}


