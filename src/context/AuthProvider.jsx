//ARCHIVO QUE CONTIENE EL CONTEXTO GLOBAL CON INFORMACION PARA PODER HACERLA ACCESIBLE EN TODA LA APP
import { useState, useEffect, createContext } from "react";
import showAlert from "../components/showAlert"
import clienteAxios, { dataFacePaint } from "../config/clienteAxios";
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { formatToCurrency } from "../helpers/formatCurrency"


const AuthContext = createContext(); //creamos el contexto 

//creamos el provider con la fn AuthProvider que rode a la App por eso recibe children
const AuthProvider = ({ children }) => {
    // informacion que sera disponible
    const [development] = useState(true);

    const [paramValuesFacePaint, setParamValuesFacePaint] = useState({})
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(false);
    const [ubicationConfirmed, setUbicationConfirmed] = useState(false);
    const [showEventLocation, setShowEventLocation] = useState(true);
    const [packagesFacePaint, setPackagesFacePaint] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState({});
    const [infoContact, setInfoContact] = useState({});
    const [position, setPosition] = useState([19.432608, -99.133209]); // Coordenadas iniciales (CDMX)
    const [eventInformation, setEventInformation] = useState({
        name: '',
        eventType: '',
        contactNumber: '',
        eventDate: '',
        eventTime: ''
    });
    const [eventSelected, setEventSelected] = useState({});
    const [allEvents, setAllEvents] = useState([]);

    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        setCargando(true)
        getDataInicial()

    }, []);


    const onChangeFormEventInformation = (event) => {

        let { name, value } = event.target;
        setEventInformation((prevState) => ({ ...prevState, [name]: value }));
    }


    //obtener parametro
    const getParam = async () => {
        try {
            const id = dataFacePaint.param.replace('/', '')
            //obtener param de aws
            const { data } = await clienteAxios.post('/param', { id });
            development && console.log(data);
            return data
            // return parametro
        } catch (error) {
            console.log(console.error);
            throw error;
        }
    }

    //fn retorna JSON de string valido caso contrario retorna string
    const convertStringToJson = (string) => {
        try {
            return JSON.parse(string)

        } catch (error) {
            // development && console.log('No es un JSON valido retornara el string sin parsear', error);
            return string
        }
    }


    //obtener informacion inicial
    const getDataInicial = async () => {
        const { response: paramFacePaint } = await getParam();
        if (!paramFacePaint) {
            development && console.log('error al obtener params', paramFacePaint);
            return;
        };

        let getValuesParam = {};
        for (const paramItem in paramFacePaint) {
            getValuesParam[paramItem] = convertStringToJson(paramFacePaint[paramItem])
        }



        setParamValuesFacePaint(getValuesParam)
        getDataManager(getValuesParam)
        setCargando(false)

    }

    //obtener informacion del manager
    const getDataManager = (getValuesParam) => {

        if (getValuesParam && getValuesParam.infoManagerContact && getValuesParam.infoManagerContact.length > 0) {
            const filterManager = getValuesParam.infoManagerContact.filter(manager => manager.active && !manager.deleted)
            development && console.log('Informacion del manager', filterManager);

            setInfoContact(filterManager[0].contactInformation)

        }

    }

    //fn que autentica al usuario
    const authUser = async () => {

        //extraemos el token de LS
        const token = tokenExists();
        if (!token) return setCargando(false);

        //cabeceras para el envio de la peticion (objeto con la config)
        const config = {
            headers: {
                "Content-Type": "application/json", //tipo de contenido
                Authorization: `Bearer ${token}`, //enviamos el tipo de autenticacion que es Bearer y el JWT que es nuestro token

            }
        }
        //si hay token se intenta autenticar al usuario con JWT
        try {
            //extraemos la respuesta de nuestar peticion lo hacemos con await para que se detenga la ejecucion hasta obtener la respuesta de lo contrario sigue ejecutando y data se llena con valor de undefind
            const { data } = await clienteAxios('/users/profile', config);
            development && console.log('data', data);

            const { statusCode, message, response: userReceived } = data;
            if (statusCode !== 200) throw new Error(message);

            const user = {
                _id: userReceived.id,
                name: userReceived.nombre,
                email: userReceived.email,
                typeUser: userReceived?.typeUser ? userReceived.typeUser : null
            }
            development && console.log('user loged', user);
            setAuth(user); //guardar obj de user
            navigate(location.state?.from?.pathname || "/events");

        } catch (error) {
            console.log(error.name);
            setAuth({});                                    
            localStorage.clear();

        } finally {
            // setCargando(false); 
        }

    }

    //valida que exista un token
    const tokenExists = () => {
        const token = localStorage.getItem('token');

        //si no existe el token lo regresamos al login
        if (!token) {
            development && console.log("No existe token");
            return undefined
        }

        return token
    }

    //fn para cerrar la sesion de la autenticacion
    const cerrarSesionAuth = () => {
        development && console.log('cerrando sesion');

        //seteamos los estates a vacios para 
        localStorage.clear();
        setAuth({})
        navigate('/', { replace: true });
        development && console.log(location);

    }

    //obtener paquetes promocionales
    const getPackagesFacePaint = async (selectedLocation) => {
        development && console.log('obteniendo paquetes promocionales...', paramValuesFacePaint.packagesFacePaint);
        //si no recibe ubicacion retorna el primer elemento de paquetes
        if (!selectedLocation) {
            if (paramValuesFacePaint && paramValuesFacePaint.packagesFacePaint && Object.keys(paramValuesFacePaint.packagesFacePaint).length > 0 && paramValuesFacePaint.packagesFacePaint.length > 0) {
                development && console.log('retorna el primer elemento de paquetes', paramValuesFacePaint.packagesFacePaint[0]?.packages);
                return paramValuesFacePaint.packagesFacePaint[0]?.packages || []
            }
        }

        if (paramValuesFacePaint && paramValuesFacePaint.packagesFacePaint && Object.keys(paramValuesFacePaint.packagesFacePaint).length > 0 && paramValuesFacePaint.packagesFacePaint.length > 0) {
            const findPackageByLocation = paramValuesFacePaint.packagesFacePaint.find(pkg => pkg.priceLocation.toUpperCase() === selectedLocation.toUpperCase())
            if (!findPackageByLocation) {
                development && console.log('parametro de s3', paramValuesFacePaint);
                const messageHelp = paramValuesFacePaint.helpsMessage.find(msg => msg.questionNonExistentLocation)
                development && console.log('mensage de ayuda:', messageHelp);

                showAlert({
                    title: 'Precios por Definir',
                    typeAlert: 'info',
                    message: messageHelp.questionNonExistentLocation,
                    btnAccept: 'Seleccionar Ubicación',
                    callbackAcept: () => {
                        setShowEventLocation(true)
                        navigate('reservationMaps')
                        setSelectedPackage({})
                        setPackagesFacePaint([])
                    },
                    callbackCancel: () => {
                        setSelectedPackage({})
                        setPackagesFacePaint([])
                    }
                });
                return
            }
            development && console.log('findPackageByLocation', findPackageByLocation);

            setPackagesFacePaint(findPackageByLocation.packages)
        }

    }

    //maneja el paquete seleccionado
    const handlePackageSelected = (pkg) => {
        setSelectedPackage(pkg)
        navigate(`package/${pkg.id}`)
    }

    //redirecciona a whatssap
    const redirectToWhatsApp = (message) => {
        development && console.log('infoContact del manager', infoContact);
        development && console.log('mensaje a enviar', message);
        const { phone: phoneNumber } = infoContact

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    };

    if (cargando) {
        showAlert({ typeAlert: 'loading' })
    }
    if (!cargando) {
        showAlert({ typeAlert: 'closeAlert' })
    }

    const resetValuesReservation = () => {
        setUbicationConfirmed(false);
        setSelectedPackage({});
        setShowEventLocation(true);
        setInfoContact({
            name: '',
            eventType: '',
            contactNumber: '',
            eventDate: '',
            eventTime: ''
        });
    };


    const handleEventSelected = (eventSelec) => {
        console.log('seleccionaste el evento', eventSelec);        
        setEventSelected(eventSelec);
        navigate(`/events/manage-events/event-detail`);
    }



    //retornamos el context
    return (
        <AuthContext.Provider
            value={{ //prop que devuelve informacion  en un objeto que es la que esta disponible para los componentes
                clienteAxios,
                authUser,
                auth,
                setAuth,
                cargando,
                setCargando,
                cerrarSesionAuth,
                showAlert,
                navigate,
                params,
                location,
                tokenExists,
                getPackagesFacePaint,
                packagesFacePaint,
                selectedPackage,
                handlePackageSelected,
                formatToCurrency,
                development,
                setPackagesFacePaint,
                setSelectedPackage,
                paramValuesFacePaint,
                redirectToWhatsApp,
                position,
                setPosition,
                ubicationConfirmed,
                setUbicationConfirmed,
                showEventLocation,
                setShowEventLocation,
                resetValuesReservation,
                eventInformation,
                onChangeFormEventInformation,
                handleEventSelected,
                eventSelected,
                allEvents, 
                setAllEvents
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext;