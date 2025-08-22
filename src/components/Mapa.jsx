import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useAuth from "../hooks/useAuth";


export default function Mapa({ titleMap }) {
    const [cpInput, setCpInput] = useState(""); // Código postal ingresado
    const [attemptsToSearchCP, setAttempsToSearch] = useState(0); // Código postal ingresado
    const mapRef = useRef(null); // Referencia al mapa
    const { showAlert, development, position, setPosition, ubicationConfirmed, setUbicationConfirmed, setShowEventLocation } = useAuth();

    useEffect(() => {
        getCurrentLocation()

    }, [])
    //obtener geolocalizacion
    const getCurrentLocation = () => {

        showAlert({ typeAlert: 'loading' })

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    development && console.log("Coordenadas obtenidas:", latitude, longitude);
                    setUbicationConfirmed(true)
                    // Centrar el mapa en la ubicación obtenida
                    setPosition([latitude, longitude]);
                    mapRef.current.flyTo([latitude, longitude], 13);
                },

                (error) => {
                    console.error(error);

                    if (error.message.includes("denied Geolocation")) {
                        showAlert({
                            typeAlert: "info",
                            title: "Información.",
                            message: "Habilita el permiso de ubicación o ingresa el código postal manualmente"
                        });
                        return

                    }

                    showAlert({
                        typeAlert: "info",
                        title: "Información",
                        message: "Ingresa el código postal.",
                        btnAccept: "Habilitar Ubicación",
                        callbackAcept: () => getCurrentLocation(),

                    });
                }
            );
        } else {
            console.warn("Tu navegador no soporta geolocalización. Por favor, ingresa el código postal manualmente.")
            showAlert({
                typeAlert: "info",
                message: "Ingresa el código postal manualmente."
            });
        }
    };


    // Función para obtener coordenadas por CP
    const getCoordinatesByCP = async (cp) => {
        let attempts = 0;
        const maxAttempts = 5;
        showAlert({ typeAlert: 'loading' })
        // Función para realizar la consulta
        const fetchCoordinates = async (cpToSearch) => {
            const url = `https://nominatim.openstreetmap.org/search?postalcode=${cpToSearch}&country=Mexico&format=json`;
            try {

                development && console.log("Buscando coordenadas para el CP:", cpToSearch);
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    development && console.log("Coordenadas obtenidas:", { lat, lon });
                    setUbicationConfirmed(true)
                    showAlert({ typeAlert: 'closeAlert' });
                    // Actualiza la posición en el mapa
                    setPosition([lat, lon]);
                    if (mapRef.current) {
                        mapRef.current.flyTo([lat, lon], 13);
                    } else {
                        console.error("mapRef.current es null, no se puede mover el mapa.");
                    }

                    return true; // Coordenadas encontradas
                } else {
                    return false; // No se encontraron coordenadas
                }
            } catch (error) {
                console.error("Error al buscar coordenadas:", error);
                showAlert({
                    typeAlert: 'info',
                    title: `CP no encontrado!! 😥`,
                    message: error.message || 'Error',
                });
                return false;
            }
        };

        // Intentos para buscar coordenadas
        while (attempts < maxAttempts) {
            const success = await fetchCoordinates(cp);
            if (success) {
                break; // Si se encontraron coordenadas, terminamos los intentos
            }

            // Incrementar el CP y volver a intentarlo
            cp = Number(cp) + 1;
            attempts += 1;
            development && console.log(`Intento ${attempts}: código postal actualizado a ${cp}`);
        }

        // Si no se encontraron coordenadas después de los intentos
        if (attempts === maxAttempts) {

            const message = `Ajusta la ubicación manualmente en el mapa.`;
            showAlert({
                typeAlert: 'error',
                title: `CP no encontrado!! 😥`,
                message,
            });

            setUbicationConfirmed(false)
            console.warn(message);

        }
    };

    // Función para manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (cpInput.length < 5) {
            let message = "CP debe ser de minimo 5 numeros";
            setAttempsToSearch(attemptsToSearchCP + 1);
            if (attemptsToSearchCP > 3) message = "Codigo Postal Invalido. Selecciona la ubicacion en el mapa";

            showAlert({
                typeAlert: 'info',
                title: "Ingresa el código postal",
                message
            });

            return;
        };

        if (cpInput) {
            development && console.log("Enviando CP para búsqueda:", cpInput); // Verifica que el CP se envía al submit
            getCoordinatesByCP(cpInput);
        }
    };

    // Componente para el marcador
    const LocationMarker = () => {
        const map = useMapEvents({
            click(event) {
                const { lat, lng } = event.latlng;
                development && console.log("Click en el mapa. Nuevas coordenadas:", { lat, lng }); // Verifica las coordenadas del clic
                setPosition([lat, lng]); // Cambia la posición del marcador al hacer clic
                map.flyTo([lat, lng], map.getZoom()); // Mueve la vista del mapa
            },
        });

        return (
            <Marker
                position={position}
                draggable={true} // Hacer que el marcador sea draggable
                eventHandlers={{
                    dragend: (e) => {
                        const newLatLng = e.target.getLatLng();
                        development && console.log("Marcador arrastrado a:", newLatLng); // Verifica las coordenadas después de arrastrar
                        setUbicationConfirmed(true)
                        setPosition([newLatLng.lat, newLatLng.lng]); // Actualiza el estado al mover el marcador
                        map.flyTo([newLatLng.lat, newLatLng.lng], map.getZoom()); // Centra el mapa
                    },
                }}
            >
                <Popup>
                    Ubicación seleccionada: {position[0].toFixed(6)}, {position[1].toFixed(6)}
                </Popup>
            </Marker>
        );
    };

    const handleNext = () => {
        development && console.log('avanzando...');
        development && console.log('ubicacion confirmada', ubicationConfirmed);

        if (!ubicationConfirmed) {
            showAlert({
                typeAlert: 'info',
                title: "Selecciona Ubicación",
                message: 'Debes elegir la Ubicación donde se realizara el evento.',
            });
            return
        }

        setShowEventLocation(false)
    }
    return (
        <div className="container mx-auto px-4 py-6">
            {/* Título del mapa */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {titleMap ?? "Ubicación"}
            </h1>

            {/* Formulario compacto para Código Postal */}
            <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-2">
                <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-2/3"
                    placeholder="Ingresa el código postal a buscar"
                    value={cpInput}
                    onChange={(e) => setCpInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 w-1/3"
                >
                    Buscar
                </button>
            </form>

            {/* Mapa */}
            <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: "500px", width: "100%" }}
                    ref={mapRef}
                    whenCreated={(map) => {
                        development && console.log("Referencia al mapa creada.");
                        mapRef.current = map;
                    }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker />
                </MapContainer>
            </div>

            <div className="flex justify-center items-center mt-3">
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 lg:py-2 lg:text-xl lg:w-1/3 w-2/3 "
                    type="button"
                    onClick={handleNext}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
