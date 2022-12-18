import "./Map.css";
import "../leaflet/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

export const Map = (props) => {
    return (
        <MapContainer id="map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
<TileLayer
attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
        </MapContainer>
    );
};