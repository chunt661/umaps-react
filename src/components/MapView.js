import "./MapView.css";

import { Map } from "./Map";

export const MapView = (props) => {
    return (
        <main className="map-view">
            <nav className="navbar">
                <div className="navbar-title">
                    <img className="logo" src={process.env.PUBLIC_URL + "/icon.svg"} />
                    <b>MRU Room Finder</b>
                </div>
            </nav>
            <div className="map-container">
                <Map />
            </div>
        </main>
    );
};