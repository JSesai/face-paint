//ARCHIVO QUE CONTIENE EL CONTEXTO GLOBAL CON INFORMACION PARA PODER HACERLA ACCESIBLE EN TODA LA APP
import { useState, useEffect, createContext } from "react";
import showAlert from "../components/showAlert"
import clienteAxios, { dataFacePaint } from "../config/clienteAxios";
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { formatToCurrency } from "../helpers/formatCurrency"


const ArtistsContext = createContext(); //creamos el contexto 

//creamos el provider con la fn AuthProvider que rode a la App por eso recibe children
const ArtistsProvider = ({ children }) => {
    // informacion que sera disponible
    const [development] = useState(true);
    const [cargando, setCargando] = useState(false);

 

    if (cargando) {
        showAlert({ typeAlert: 'loading' })
    }
    if (!cargando) {
        showAlert({ typeAlert: 'closeAlert' })
    }

 


    //retornamos el context
    return (
        <ArtistsContext.Provider
            value={{ //prop que devuelve informacion  en un objeto que es la que esta disponible para los componentes
                development,
                cargando
            }}
        >
            {children}
        </ArtistsContext.Provider>
    )
}

export {
    ArtistsProvider
}
export default ArtistsContext;