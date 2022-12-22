import "./InfoCard.css";

import { useState, useRef, useEffect } from "react";
import { Transition } from "react-transition-group";

const duration = 200;

const defaultStyle = {
  transition: `height ${duration}ms ease-in-out`,
  height: 0,
}


export const InfoCard = (props) => {
    const [open, setOpen] = useState(false);
    const [titleHeight, setTitleHeight] = useState(0);
    
    const titleContainerRef = useRef(null);
    const titleRef = useRef(null);
    
    const handleTitleClick = () => {
        setOpen(!open);
    };
    
    const transitionStyles = {
      entering: { height: (titleHeight+8) + "px" },
      entered:  { height: titleHeight + "px" },
      exiting:  { height: 0 },
      exited:  { height: 0 },
    };
    
    useEffect(() => {
        if (titleRef.current) {
            setTitleHeight(titleRef.current.getBoundingClientRect().height);
        }
        
        return () => setTitleHeight(0);
    }, [titleRef]);
    
    return (
        <div className={"infocard-wrapper" + (open ? " open" : " closed")}>
            <div className="infocard">
                <Transition nodeRef={titleContainerRef}
                    in={true} appear={true}
                    unmountOnExit={true}
                    timeout={duration}>
                { state => (
                    <div className="infocard-title-container"
                        ref={titleContainerRef}
                        onClick={handleTitleClick}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                        <div className="infocard-title"
                            ref={titleRef}>
                            <b>{props.roomName}</b>
                        </div>
                    </div>
                )}
                </Transition>
                <div className="infocard-content-wrapper">
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