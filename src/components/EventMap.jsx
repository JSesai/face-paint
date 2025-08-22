import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const EventMap = ({ lat, lon }) => {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      className="h-64 w-full rounded-lg shadow-lg"
    >
      {/* Capa del mapa (OpenStreetMap) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Marcador en la ubicación dada */}
      <Marker position={[lat, lon]}>
        <Popup>Ubicación del evento</Popup>
      </Marker>
    </MapContainer>
  );
};

export default EventMap;
