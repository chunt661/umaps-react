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
                    <b>{props.roomName}</b>
                </div>
                <div className={"infocard-content-wrapper" + (open ? " open" : " closed")}>
                    <div className="infocard-content">
                        <div className="infocard-subcontent">
                            <span>{props.roomNumber}</span>
                            <span>{props.roomType}</span>
                        </div>
                        <p>{props.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};