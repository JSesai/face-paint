import { CustomtError, ValidationRequestError, ValidationInputError } from "../utils/handlerErrors";


export const handlerTypeError = (error) => {

    let infoError = {
        typeAlert: 'error',
        title: 'Ocurrio un error:',
        message: 'Si el problema persiste contacte al administrador.',
        excepcionControlada: true
    }

    if (error instanceof ValidationRequestError) {
        // showAlert({
        //     typeAlert: 'error',
        //     title: 'Ocurrio un error:',
        //     message,
        // });
        return {
            ...infoError,
            title: 'Error al solicitar información:',
            message: error.message,
        }
    };

    if (error instanceof ValidationInputError) {
        // showAlert({
        //     typeAlert: 'error',
        //     title: 'Revisa información ingresada',
        //     message,
        // })
        return {
            ...infoError,
            title: 'Revisa información ingresada',
            message: error.message
        }
    };

    console.log('excepcion no controlada 💣 🧨 💥', error);

    return {
        typeAlert: 'error',
        title: 'Error interno:',
        excepcionControlada: false
    }


}
