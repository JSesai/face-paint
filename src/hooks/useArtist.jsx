//ARCHIVO PERSONALIZADO PARA MANEJAR EL CONTEXT CON HOOK PROPIO
import { useContext  } from "react"; //Importamos use context para poder acceder al context
import ArtistsContext from "../context/ArtistsProvider";

//Fn que nos ayuda a acceder a la informacion de autenticacion que se encuentra en el AuthContext
const useArtist = ()=> {

    //accedemos al context con useContext y pasamos nustro context, con esto hara disponible la informacion que retorna el provider de AuthProvider
    return useContext(ArtistsContext)
}

export default useArtist;