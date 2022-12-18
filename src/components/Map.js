import "./Map.css";
import "../leaflet/leaflet.css";

import { useState } from "react"
import { latLngBounds, CRS } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { getTileURL } from "../api";
import { FloorControl } from "./MapControls";

export const Map = (props) => {
    const [map, setMap] = useState(null);
    
    const tileBounds = latLngBounds([-props.mapHeight, 0], [0, props.mapWidth]);
    const mapBounds = tileBounds.pad(.25);
    
    const handleMapCreated = (map) => {
        if (map) {
            map.fitBounds(mapBounds);
            map.setMaxBounds(mapBounds);

            setMap(map);
        }
    };
    
    return (
        <MapContainer id="map"
            crs={CRS.Simple}
            bounds={mapBounds}
            zoomControl={false}
            ref={handleMapCreated}>
            <TileLayer
                url={getTileURL("mru", 1)}
                zoomOffset={0}
                maxZoom={props.maxZoom}
                bounds={tileBounds} />
            { map && <FloorControl map={map} floors={props.floors} />}
        </MapContainer>
    );
};