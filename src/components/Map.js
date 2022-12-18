import "./Map.css";
import "../leaflet/leaflet.css";

import { latLngBounds, CRS } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { getTileURL } from "../api";

export const Map = (props) => {
    const tileBounds = latLngBounds([-props.mapHeight, 0], [0, props.mapWidth]);
    const mapBounds = tileBounds.pad(.25);
    
    const handleMapCreated = (map) => {
        map.fitBounds(mapBounds);
        map.setMaxBounds(mapBounds);
    };
    
    return (
        <MapContainer id="map"
            crs={CRS.Simple}
            bounds={mapBounds}
            whenCreated={handleMapCreated}>
            <TileLayer
                url={getTileURL("mru", 1)}
                zoomOffset={0}
                maxZoom={props.maxZoom}
                bounds={tileBounds} />
        </MapContainer>
    );
};