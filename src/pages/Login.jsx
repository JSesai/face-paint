import { useEffect } from "react"
import useAuth from "../hooks/useAuth"; //fn hook propio que nos permite acceder a nuestro context de autenticacion AuthContext
import LoginForm from "../components/LoginForm";
import { ValidationRequestError, ValidationInputError } from "../utils/handlerErrors";
import { validateInformation } from '../helpers/validation'
import { handlerTypeError } from "../utils/validateTypeError";

export default function Login() {

  useEffect(() => {
    authUser()
  }, [])

  //extraer del context
  const { setAuth, showAlert, navigate, clienteAxios, authUser, location } = useAuth();

  //envio de petiicon para loguin
  const handleSubmit = async (email, password) => {   

    try {
      validateInformation({ "Correo Electrónico":email, "contraseña": password });//valida datos vacios
      if (password.length < 6) throw new ValidationInputError('La contresaña es muy corta. Debe ser  mayor a 6 caracteres');
      showAlert({ typeAlert: 'loading' })
     
      const { data } = await clienteAxios.post('/users/login', { email, password });
      console.log(data);
      
      const { statusCode, message, response: userReceived } = data;
      if (statusCode !== 200) throw new ValidationRequestError(message);
      // if (statusCode !== 200) throw new Error(message);    
      localStorage.setItem('token', userReceived.token); //almacenar en LS el token que es JWT que contiene el id del usuario
      const user = {
        _id: userReceived.id,
        name: userReceived.nombre,
        email: userReceived.email,
        typeUser: userReceived?.typeUser ? userReceived.typeUser : null
      };
      setAuth(user);//guardamos user logueado en context
      showAlert({ typeAlert: 'closeAlert' });
      navigate(location.state?.from?.pathname || "/events");

    } catch (error) {   
      console.log('¡this is error!',error);  
      console.log('here is the error', error.name);      
      const infoAlert = handlerTypeError(error);
      console.log(infoAlert);
      showAlert(infoAlert)
      
    }
  }

  return (
    <LoginForm handleSubmit={handleSubmit} />
  )
}
