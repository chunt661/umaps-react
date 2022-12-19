import "./MapView.css";

import { useState, useEffect } from "react";
import { fetchMapData } from "../api";
import { SearchBar } from "./SearchBar";
import { Map } from "./Map";
const mapID = "mru";

export const MapView = (props) => {
    const [mapData, setMapData] = useState(null);
    
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
                <SearchBar />
            { mapData &&
                <Map mapID={mapID}
                    floors={mapData.floors}
                    startingFloor={mapData.startingFloor}
                    mapWidth={mapData.width}
                    mapHeight={mapData.height} 
                    maxZoom={mapData.maxZoom} />
            }
            </div>
        </main>
    );
};