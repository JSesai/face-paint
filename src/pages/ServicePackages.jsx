import React, { useEffect, useState } from 'react'
import useAuth from "../hooks/useAuth";

export default function ServicePackages() {
    const { navigate, getPackagesFacePaint, packagesFacePaint, handlePackageSelected, showAlert, development, setPackagesFacePaint, setSelectedPackage } = useAuth();
    const [accountNumber] = useState('014610250112650066')

    const locations = ['CDMX', 'EDOMEX', 'OTRO']

    useEffect(() => {
       
        selectUbication()

    }, [])

    const selectUbication = () => {
        showAlert({
            typeAlert: 'selectOption',
            title: 'Selecciona ubicación del evento',
            message: 'Seleciona un estado',
            btnAccept: 'Aceptar',
            options: locations,
            callbackAcept: (selectedLocation) => getPricesByLocation(selectedLocation),
            callbackCancel: () => {
                navigate('/')
                setSelectedPackage({})
                setPackagesFacePaint([])
            }

        })
    }

    //modifica precios en base a lo ingresado
    const getPricesByLocation = async (selectedLocation) => {
        development && console.log('selectedLocation', locations[selectedLocation]);

        await getPackagesFacePaint(locations[selectedLocation])
        development && console.log('packagesFacePaint', packagesFacePaint);

    }

    const handleShowAccountInfo = () => {

        showAlert({
            typeAlert: 'info',
            title: 'Datos de transferencia',
            message: `Numero de cuenta: ${accountNumber} Beneficiario: Talia Zavaleta`,
            btnAccept: 'Copiar Cuenta',
            callbackAcept: () => handleCopyAccountNumber()
        })
    }
    // Función para copiar al portapapeles
    const handleCopyAccountNumber = () => {
        navigator.clipboard
            .writeText(accountNumber)
            .then(() => {
                showAlert({ typeAlert: 'closeAlert' })
            })
            .catch((err) => {
                development && console.error("Error al copiar el número de cuenta:", err);
                showAlert({
                    title: 'Error 😥',
                    typeAlert: 'error',
                    message: 'Error al copiar el número de cuenta',
                });
            });
    };


    return (
        <section className="bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded">
                    <p className="text-sm">
                        <strong>Nota:</strong> Tu reservación se confirma con un pago inicial de{" "}
                        <span className="font-semibold">100 pesos</span>.{" "}
                        <button
                            onClick={handleShowAccountInfo}
                            className="text-purple-600 font-medium underline"
                        >
                            Mostrar número de cuenta
                        </button>
                    </p>
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Paquetes Promocionales de Pintacaritas
                </h1>


                {packagesFacePaint.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packagesFacePaint.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden"
                            >
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                                    />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        {pkg.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                                    <p className="text-lg font-bold text-gray-900">${pkg.price}MXN</p>
                                    <button onClick={() => handlePackageSelected(pkg)}
                                        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                                        Reservar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className='text-red-400'>No hay paquetes promocionales para la ubicación seleccionada</div>
                }

            </div>
        </section>
    );

}
