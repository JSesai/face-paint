//ARCHIVO CON LA CONFIGURACION PARA LAS PETICIONES CON AXIOS
import axios from "axios";
//crate crea la configuracion
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_FACE_PAINT_MAJO}/` //url tomada del .env y añadiendo /
})


export const dataFacePaint = {
    param: `${import.meta.env.VITE_BACKEND_FACE_PAINT_PARAM}/`
}

export default clienteAxios;
