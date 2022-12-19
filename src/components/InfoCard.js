import "./InfoCard.css";

import { useState } from "react";

export const InfoCard = (props) => {
    const [open, setOpen] = useState(false);
    
    const handleTitleClick = () => {
        setOpen(!open);
    };
    
    return (
        <div className="infocard-wrapper">
            <div className="infocard-handle" />
            <div className="infocard">
                <div className="infocard-title"
                    onClick={handleTitleClick}>
                    <b>Room Name</b>
                </div>
                <div className={"infocard-content-wrapper" + (open ? " open" : " closed")}>
                    <div className="infocard-content">
                        <div className="infocard-subcontent">
                            <span>Room Number</span>
                            <span>Type of Room</span>
                        </div>
                        <p>
                            This is the room description. My internet is down and I don't have access to a lorem ipsum generator. Here is my placeholder text instead.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};