import { DateTime } from "luxon";


export const isDateAllowed = (selectedDateISO, options = { allowToday: false, maxMonths: 1, allowNextDayBeforeHour: false, hourLimit: 10 }) => {
    const { allowToday, maxMonths, allowNextDayBeforeHour, hourLimit } = options;
  
    const now = DateTime.now(); // Fecha y hora actual
    const today = now.startOf("day"); // Inicio del día actual
    const maxDate = today.plus({ months: maxMonths }).endOf("day"); // Fecha máxima permitida
    const selectedDate = DateTime.fromISO(selectedDateISO).startOf("day"); // Normalizar fecha seleccionada
  
    // Validar si se permite el día actual
    if (!allowToday && selectedDate.equals(today)) {
      throw new Error("No se permite seleccionar la fecha actual.");
    }
  
    // Validar si se permite el día siguiente bajo una condición de hora
    const tomorrow = today.plus({ days: 1 });
    if (
      allowNextDayBeforeHour &&
      selectedDate.equals(tomorrow) &&
      now.hour >= hourLimit
    ) {
      throw new Error(
        `La fecha seleccionada no es permitida debido a que esta muy proxima.`
      );
    }
  
    // Validar si la fecha es pasada
    if (selectedDate < today) {
      throw new Error("No se permiten fechas pasadas.");
    }
  
    // Validar si la fecha está fuera del rango permitido
    if (selectedDate > maxDate) {
      throw new Error(
        `Solo puedes seleccionar hasta ${maxMonths} mes(es) a partir de la fecha actual.`
      );
    }
  
    return true; // Fecha válida
  };
  