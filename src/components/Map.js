import "./Map.css";
import "../leaflet/leaflet.css";

import { useState, useEffect } from "react"
import { latLngBounds, latLng, CRS } from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { getTileURL, fetchFeatures, fetchSingleFeature } from "../api";
import { FloorControl } from "./MapControls";
import { FeatureLayer } from "./MapLayers";

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
    
    const handleFeatureClick = (feature) => {
        fetchSingleFeature(props.mapID, feature.feature.room_id, (data) => {
            console.log(data);
        });
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
            { features &&
                <FeatureLayer data={features}
                    onClick={handleFeatureClick} /> }
            { (map && currentFloor) &&
                <FloorControl
                     map={map}
                     floors={props.floors}
                     currentFloor={currentFloor} /> }
        </MapContainer>
    );
};