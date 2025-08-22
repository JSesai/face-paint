import { ValidationInputError } from "../utils/handlerErrors";
 
 
 //fn recibe objeto con los datos a validar que no sean vacios
 export const validateInformation = (information) => {
    // console.log(information);
    Object.keys(information).map(item => {
      const value = information[item].trim();
      if (!value) throw new ValidationInputError(`${item} es requerido`);
    });
    return true
  }
