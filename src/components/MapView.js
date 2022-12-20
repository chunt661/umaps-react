import "./MapView.css";

import { useState, useEffect } from "react";
import { fetchMapData } from "../api";
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
    
    useEffect(() => {
        fetchMapData(mapID, setMapData);
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
                <SearchBar mapID={mapID} />
            { mapData &&
                <Map mapID={mapID}
                    floors={mapData.floors}
                    startingFloor={mapData.startingFloor}
                    mapWidth={mapData.width}
                    mapHeight={mapData.height} 
                    maxZoom={mapData.maxZoom}
                    onFeatureSelect={setFeature} />
            }
            </div>
            { feature &&
                <InfoCard roomName={feature.name}
                    roomNumber={feature.roomID}
                    roomType={feature.type}
                    description={feature.description} /> }
        </main>
    );
};