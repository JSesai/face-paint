//COMPONENETE QUE PROTEGE LAS RUTAS QUE ENVUELVE EN EL APP.JSX 
import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"; //hook propio para extraer informacion del context
import { Header, SideBar } from "../index"


export default function ProtectedRoute() {

    const { auth, location } = useAuth();
     
    return (
        <>
            {/* si existe id esta autenticado de lo contrario lo direccionamos al login  */}
            {auth?._id ?
                (
                    <div className="bg-gray-100">
                        <Header />
                        <div className="md:flex md:min-h-screen">
                            <SideBar />
                            <main className="w-full sm:ml-64">
                                <Outlet />
                            </main>
                        </div>
                    </div>
                ) :
                <Navigate to="/login" state={{ from: location }} replace />}
        </>
    )
}
