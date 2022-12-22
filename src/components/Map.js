import "./Map.css";
import "../leaflet/leaflet.css";

import { useState, useEffect } from "react"
import { latLngBounds, latLng, CRS } from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { getTileURL, fetchFeatures } from "../api";
import { FloorControl } from "./MapControls";
import { FeatureLayer, SelectionLayer } from "./MapLayers";
import { LoadingSpinner } from "./LoadingSpinner";

export const Map = (props) => {
    const [map, setMap] = useState(null);
    const [features, setFeatures] = useState(null);
    const [currentFloor, setCurrentFloor] = useState(props.startingFloor);
    const [loading, setLoading] = useState(false);
    
    const tileBounds = latLngBounds([-props.mapHeight, 0], [0, props.mapWidth]);
    const mapBounds = tileBounds.pad(.25);
    
    /**
    Sets the current floor and loads the new floor data.
    */
    const changeFloor = (floor) => {
        setLoading(true);
        
        fetchFeatures(props.mapID, floor, (data) => {
            setFeatures(data);
            setCurrentFloor(floor);
            setLoading(false);
        });
    };
    
    /**
    Zooms the map to the centre of the given feature.
    */
    const goToFeature = (feature) => {
        let minX = props.mapWidth;
        let minY = props.mapHeight;
        let maxX = -props.mapWidth;
        let maxY = -props.mapHeight;

        // Find the centre of the room
        feature.geometry.coordinates[0].forEach(c => {
            minX = Math.min(c[0], minX);
            minY = Math.min(c[1], minY);
            maxX = Math.max(c[0], maxX);
            maxY = Math.max(c[1], maxY);

        });

        // Change floor if necessary
        if (currentFloor != feature.floor) {
            changeFloor(feature.floor);
        }

        // Zoom in on the room
        const centre = latLng((maxY + minY)/2, (maxX + minX)/2);
        map.flyTo(centre, 3);
        
        // Disable map controls to prevent bugged display on interrupt
        map.dragging.disable();
        map.keyboard.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
    };
    
    const handleFeatureClick = (feature) => {
        props.onFeatureSelect(feature.feature.room_id);
    };
    
    /**
    Assigns the map object to the component state.
    */
    const handleMapCreated = (m) => {
        if (m) {
            setMap(m);
        }
    };
    
    // Activates once when the map loads to finalize map settings.
    useEffect(() => {
        if (map) {
            map.fitBounds(mapBounds);
            map.setMaxBounds(mapBounds);
            
            map.on("moveend", () => {
                map.dragging.enable();
                map.keyboard.enable();
                map.doubleClickZoom.enable();
                map.scrollWheelZoom.enable();
            });
            
            map.on("click", (e) => {
                props.clearSelection();
            });
            
            changeFloor(props.startingFloor);
        }
    }, [map]);
    
    // Updates the display when the selected room changes
    useEffect(() => {
        if (props.selection) {
            goToFeature(props.selection);
        }
    }, [props.selection]);
    
    return (
        <MapContainer id="map"
            crs={CRS.Simple}
            bounds={mapBounds}
            zoomControl={false}
            ref={handleMapCreated}>
            <TileLayer
                url={getTileURL("mru", currentFloor)}
                zoomOffset={0}
                maxZoom={props.maxZoom}
                bounds={tileBounds} />
            { features &&
                <FeatureLayer data={features}
                    floor={currentFloor}
                    onClick={handleFeatureClick} /> }
            { props.selection &&
                <SelectionLayer data={props.selection}
                    floor={currentFloor} />}
            { (map && currentFloor) &&
                <FloorControl
                    map={map}
                    floors={props.floors}
                    currentFloor={currentFloor}
                    onClick={changeFloor} /> }
            { loading && <LoadingSpinner size={96} /> }
        </MapContainer>
    );
};