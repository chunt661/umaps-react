import "./InfoCard.css";

export const InfoCard = (props) => {
    return (
        <div className="infocard-wrapper">
            <div className="infocard-handle" />
            <div className="infocard">
                <div className="infocard-title">
                    <b>Room Name</b>
                </div>
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
    );
};