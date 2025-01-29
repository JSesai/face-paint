import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
export default function AlertMessage({
  typeAlert,
  message,
  title,
  btnAccept = 'Aceptar',
  btnCancel = 'Cancelar',
  callbackAcept,
  callbackCancel,
  options
}) {

  switch (typeAlert) {
    case 'loading':

      MySwal.fire({
        title: title || 'Cargando...',
        text: title || 'Por favor espera mientras procesamos tu solicitud.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          MySwal.showLoading();
        }
      });
      break;

    case ('success'):
      MySwal.fire({
        icon: 'success',
        title: title || '¡Acción exitosa 🎉!',
        text: message || 'La operación se completó correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: btnAccept,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed && callbackAcept) callbackAcept();
      });
      break;

    case ('error'):
      MySwal.fire({
        icon: 'error',
        title: title || 'Oops...',
        text: message || 'Ocurrio un error',
        confirmButtonColor: "#3085d6",
        confirmButtonText: btnAccept,
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed && callbackAcept) callbackAcept();
      });
      break;

    case ('confirm'):
      MySwal.fire({
        icon: 'warning',
        title: title || '¡Confirma!',
        text: message || 'Estas seguro de realizar esta acción',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: btnAccept,
        cancelButtonText: btnCancel,
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed && callbackAcept) callbackAcept();
        if (!result.isConfirmed && callbackCancel) callbackCancel();
      });
      break;

    case ('info'):
      MySwal.fire({
        icon: 'info',
        title: title || 'Información!',
        text: message || 'Texto Informativo',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: btnAccept,
        cancelButtonText: btnCancel,
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed && callbackAcept) callbackAcept();
        if (!result.isConfirmed && callbackCancel) callbackCancel();
      });
      break;

    case ('selectOption'):
      MySwal.fire({
        title: title || 'Selecciona una opción',
        input: 'select',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        allowOutsideClick: false,
        confirmButtonText: btnAccept,
        inputOptions: options,
        inputPlaceholder: message || 'Selecciona una opción',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve, reject) => {
            if (value) {
              // console.log(value);

              resolve(); // Si se selecciona una opción válida
            } else {
              MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Necesitas seleccionar una opción!',
              });
              //se cancela Si no se selecciona una opción
              if (callbackCancel) callbackCancel(); 
              reject('¡Necesitas seleccionar una opción!');
            }
          });
        }
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.value) {
            if (callbackAcept) callbackAcept(result.value); // Llamada de éxito
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          if (callbackCancel) callbackCancel(); // Llamada si se cancela
        }
      }).catch((error) => {
        // Mostrar error si la validación falla
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      });
      break;



    case ('closeAlert'):
      MySwal.close();
      if (callbackAcept) callbackAcept();
      break;

    case ('loaderBackground'):
      MySwal.fire({
        title: "...",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(https://sweetalert2.github.io/#handling-dismissalsimages/trees.png)",
        backdrop: `
                  rgba(0,0,123,0.4)
                  url("https://sweetalert2.github.io/#handling-dismissalsimages/nyan-cat.gif")
                  left top
                  no-repeat
                `
      });
      break

    // case ('snackBarSuccess'):

    default:
      MySwal.fire({
        icon: 'error',
        title: 'Revisa el typeAlert ',
        text: `${typeAlert}  no coincede con ningun case`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: btnAccept,
      })
      break;
  }



}

