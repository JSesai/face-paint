import { useState } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useMenu from "../hooks/useMenu";



const Sidebar = () => {
  const { navigate, auth, cerrarSesionAuth } = useAuth();
  const { menu } = useMenu(auth.typeUser);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  console.log(menu);

  const onClick = (path) => {
    navigate(path);
    setIsOpen(!isOpen)
  }


  return (
    <>
      {/* Botón para abrir sidebar */}
      <button onClick={toggleSidebar} className="p-2 fixed top-4 left-4 bg-gray-200 rounded-md z-500 sm:hidden">
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 p-4 shadow-md transition-transform flex flex-col justify-between ${isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
      >
        {/* Sección del usuario */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-300 dark:border-gray-700">
          <div className="relative">
            {/* Avatar con inicial */}
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
              {auth.name.charAt(0).toUpperCase()}

            </div>
            {/* Indicador de estado */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </div>
          <span className="text-lg font-medium dark:text-white">{auth.name.split(' ')[0]}</span>
        </div>

        {/* Menú dinamico */}
        <nav className="flex flex-col gap-4 mt-4">

          {menu && menu.map((item) => (
            <div key={item.id} onClick={() => onClick(item.path)} className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-blue-500">
              {item.icon}
              {item.label}
            </div>
          ))}
        </nav>

        {/* Botón de cerrar sesión */}
        <button
          onClick={cerrarSesionAuth}
          className="mt-auto flex items-center gap-2 text-red-700 hover:text-red-500 w-full text-left p-2"
        >
          <FaSignOutAlt size={20} />
          Cerrar sesión
        </button>

        {/* Botón para cerrar el sidebar en móvil */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md sm:hidden"
        >
          ✕
        </button>
      </div>

      {/* Fondo oscuro al abrir el sidebar */}
      {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 sm:hidden"></div>}
    </>
  );
};

export default Sidebar;
