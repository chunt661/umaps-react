// From https://stackoverflow.com/questions/69530278/react-leaflet-v3-reusable-custom-control

import { useEffect } from "react";
import { Control, DomUtil, DomEvent } from "leaflet";

export const FloorControl = (props) => {
    
    useEffect(() => {
        const control = createFloorControl();
        control.addTo(props.map);
        
        return () => control.remove();
    }, [props.map])
    
    const createFloorControl = (floors) => {
        const FloorControl = Control.extend({
            onAdd: (map) => {
                const container = DomUtil.create("div", "leaflet-bar");
                
                // Add a button for each floor
                props.floors.slice().reverse().forEach(f =>
                    _createButton(f, "Floor " + f, container)
                );
                
                return container;
            }
        });
        
        const _createButton = (txt, title, container) => {
            const button = DomUtil.create("a", "", container);
            button.innerHTML = txt;
            button.href = "#";
            button.title = title;
            
            button.setAttribute("role", "button");
            button.setAttribute("aria-label", title)
            
            DomEvent.disableClickPropagation(button);
            DomEvent.on(button, "click", DomEvent.stop);
            
            return button;
        }
        
        return new FloorControl({position: "bottomright"});
    };
    
    return null;
}