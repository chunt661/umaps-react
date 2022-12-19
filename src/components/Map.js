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
            map.fitBounds(mapBounds);
            
            changeFloor(props.startingFloor);
        }
    }, [map]);
    
    /**
    Zooms the map to the centre of the given feature.
    */
    const goToFeature = (feature) => {
        let minX = props.mapWidth;
        let minY = props.mapHeight;
        let maxX = -props.mapWidth;
        let maxY = -props.mapHeight;

        // Find the centre of the room
        feature[0].geometry.coordinates[0].forEach(c => {
            minX = Math.min(c[0], minX);
            minY = Math.min(c[1], minY);
            maxX = Math.max(c[0], maxX);
            maxY = Math.max(c[1], maxY);

        });

        // Change floor if necessary
        if (currentFloor != feature[0].floor) {
            setCurrentFloor(feature[0].floor);
        }

        // Zoom in on the room
        const centre = latLng((maxY + minY)/2, (maxX + minX)/2);
        map.flyTo(centre, 2.5);
        
        // Disable map controls to prevent bugged display on interrupt
        map.dragging.disable();
        map.keyboard.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
    };
    
    const selectFeature = (feature) => {
        props.onFeatureSelect({
            ...feature.properties,
            roomID: feature.room_id
        });
    };
    
    /**
    Called during map setup. Finalizes map settings and sets the map state.
    */
    const handleMapCreated = (m) => {
        if (m) {
            m.setMaxBounds(mapBounds);
            
            m.on("moveend", () => {
                m.dragging.enable();
                m.keyboard.enable();
                m.doubleClickZoom.enable();
                m.scrollWheelZoom.enable();
            });
            
            setMap(m);
        }
    };
    
    const handleFeatureClick = (feature) => {
        fetchSingleFeature(props.mapID, feature.feature.room_id, (data) => {
            goToFeature(data);
            selectFeature(data[0]);
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