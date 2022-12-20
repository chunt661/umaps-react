import { useEffect } from "react";
import { Control, DomUtil, DomEvent } from "leaflet";

const _createButton = (txt, title, className, container, fn) => {
    const button = DomUtil.create("a", className, container);
    button.innerHTML = txt;
    button.href = "#";
    button.title = title;

    button.setAttribute("role", "button");
    button.setAttribute("aria-label", title)

    DomEvent.disableClickPropagation(button);
    DomEvent.on(button, "click", DomEvent.stop);
    DomEvent.on(button, "click", fn);

    return button;
}

export const FloorControl = (props) => {
    useEffect(() => {
        const control = createFloorControl();
        control.addTo(props.map);
        
        return () => control.remove();
    }, [props.map, props.currentFloor])
    
    const createFloorControl = (floors) => {
        const FloorControl = Control.extend({
            onAdd: (map) => {
                const container = DomUtil.create("div", "leaflet-bar");
                
                // Add a button for each floor
                props.floors.slice().reverse().forEach(f =>
                    _createButton(f, "Floor " + f,
                                  props.currentFloor == f ? "selected" : "",
                                  container,
                                  () => props.onClick(f))
                );
                
                return container;
            }
        });
        
        return new FloorControl({position: "bottomright"});
    };
    
    return null;
}