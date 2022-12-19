import "./Map.css";
import "../leaflet/leaflet.css";

import { useState, useEffect } from "react"
import { latLngBounds, CRS } from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { getTileURL, fetchFeatures } from "../api";
import { FloorControl } from "./MapControls";

export const Map = (props) => {
    const [map, setMap] = useState(null);
    const [features, setFeatures] = useState(null);
    const [currentFloor, setCurrentFloor] = useState(0);
    
    const tileBounds = latLngBounds([-props.mapHeight, 0], [0, props.mapWidth]);
    const mapBounds = tileBounds.pad(.25);
    
    /**
    Sets the current floor and loads the new floor data.
    */
    const changeFloor = (floor) => {
        fetchFeatures(props.mapID, floor, (data) => {
            setFeatures(data);
            setCurrentFloor(floor);
            console.log("change floor: " + floor);
        });
    };
    
    // Activates when the map loads
    useEffect(() => {
        if (map) {
            changeFloor(props.startingFloor);
        }
    }, [map]);
    
    /**
    Called during map setup. Finalizes map settings and sets the map state.
    */
    const handleMapCreated = (m) => {
        if (m) {
            m.fitBounds(mapBounds);
            m.setMaxBounds(mapBounds);
            setMap(m);
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
            <FeatureLayer data={features} />
            { map && <FloorControl
                         map={map}
                         floors={props.floors}
                         currentFloor={currentFloor} />}
        </MapContainer>
    );
};

const FeatureLayer = (props) => {
    return (
        <GeoJSON
            data={props.data}
            onEachFeature={(feature, layer) => {
                layer.bindTooltip(l => l.feature.properties.name);
            }} />
    );
};