import "./MapView.css";

import { useState, useEffect } from "react";
import { fetchMapData, loadMapData, saveMapData, clearLocalData, fetchSingleFeature } from "../api";
import { SearchBar } from "./SearchBar";
import { InfoCard } from "./InfoCard";
import { Map } from "./Map";
const mapID = "mru";

export const MapView = (props) => {
    const [mapData, setMapData] = useState(null);
    
    /**
    Data of the currently selected feature, if any, to be displayed in the
    info card.
    */
    const [feature, setFeature] = useState(null);
    
    /**
    Fetches the complete data of a feature by its ID and assigns it as the
    current selection.
    */
    const handleFeatureSelect = (id) => {
        clearFeature();
        fetchSingleFeature(mapID, id, (data) => {
            setFeature(data[0]);
        });
    };
    
    /**
    Deselects the current selected feature.
    */
    const clearFeature = () => setFeature(null);
    
    useEffect(() => {
        fetchMapData(mapID, (data) => {
            const localData = loadMapData(mapID);
            if (!localData) {
                saveMapData(mapID, data);
            } else if (!localData.version || localData.version != data.version) {
                clearLocalData(mapID);
                saveMapData(mapID, data);
            }
            
            setMapData(data);
        });
    }, []);
    
    return (
        <main className="map-view">
            <nav className="navbar">
                <div className="navbar-title">
                    <img className="logo" src={process.env.PUBLIC_URL + "/icon.svg"} />
                    <b>MRU Room Finder</b>
                </div>
            </nav>
            <div className="map-container">
                <SearchBar mapID={mapID}
                    onSelect={handleFeatureSelect} />
            { mapData &&
                <Map mapID={mapID}
                    floors={mapData.floors}
                    startingFloor={mapData.startingFloor}
                    mapWidth={mapData.width}
                    mapHeight={mapData.height} 
                    maxZoom={mapData.maxZoom}
                    selection={feature}
                    onFeatureSelect={handleFeatureSelect}
                    clearSelection={clearFeature} />
            }
            </div>
            { feature &&
                <InfoCard roomName={feature.properties.name}
                    roomNumber={feature.room_id}
                    roomType={feature.properties.type}
                    description={feature.properties.description} /> }
        </main>
    );
};