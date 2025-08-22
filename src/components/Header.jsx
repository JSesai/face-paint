//HEADER DEL PROYECTO
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Busqueda from "./Busqueda"


export default function Header() {
    // const { handleBuscador, cerrarSesionProyectos } = useProyectos()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth();
    }


    return (

        <header className="py-3 px-4 md:p-4 bg-white border-b shadow-sm sm:ml-64">
            <div className="">
                <h2 className="text-3xl text-sky-600 font-black text-center mb-1 md:mb-0">COLOREARTE</h2>

                <div className="flex flex-col md:flex-row items-center gap-4">
                </div>

            </div>

        </header>
    )
}
