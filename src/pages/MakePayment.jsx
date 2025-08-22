import React from 'react'
import PasarelaPago from '../components/PasarelaPago'
import { paymentResponseMessages } from '../constants/constans'
import useAuth from "../hooks/useAuth";


export default function MakePayment() {
    const {
        navigate,
        selectedPackage,
        showAlert,        
        development,
        clienteAxios,        
        position,
        resetValuesReservation,
        eventInformation        
    } = useAuth();

    const { price, title } = selectedPackage;
    const initialization = {
        amount: price,
        quantity: 1,
        title,
    };

    const onSubmit = async (formData) => {

        try {
            showAlert({ typeAlert: 'loading' });
            const [lat, lon] = position; //obtener coordenadas
            const informationSent = {
                ...eventInformation,
                ...formData,
                estatusEvent: 'reservation',
                selectedPackage,
                ubicatioEvent: { lat, lon }
            }

            const { data } = await clienteAxios.post('/payment', informationSent);
            const { response } = data;
            development && console.log(data);
            const { statusType, message } = paymentResponseMessages[response.status_detail];
            showAlert({
                typeAlert: statusType,
                message: message,
                callbackAcept: () => {
                    resetValuesReservation();
                    navigate('./about');
                },
                callbackCancel: () => {
                    resetValuesReservation();
                    navigate('/about');
                }
            });


        } catch (error) {
            console.log(error);
            showAlert({
                typeAlert: 'error',
                message: 'Ocurrio un error, intentelo mas tarde.',
                callbackAcept: () => {
                    resetValuesReservation();
                    navigate('./about');
                },
                callbackCancel: () => {
                    resetValuesReservation();
                    navigate('/about');
                }
            });
        }
    };

    return (
        <>
            <div className="bg-yellow-100 border-l-4 m-2 border-yellow-500 text-yellow-700 p-2 rounded">
                <p className="text-sm">
                    <strong>Nota:</strong> Tu reservación se confirma con un pago inicial de{" "}
                    <span className="font-semibold">100 pesos</span>.{" "}
                </p>
            </div>
            <PasarelaPago
                initialization={initialization}
                onSubmit={onSubmit}
            />
        </>
    )
}


