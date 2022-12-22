import L from "leaflet";
import { GeoJSON } from "react-leaflet";
import { useState, useEffect } from "react";

export const FeatureLayer = (props) => {
    const defaultStyle = {
        "opacity": "0",
        "fillOpacity": "0",
        "fillColor": "#ffff00"
    };
    
    const handleClick = (e, layer) => {
        props.onClick(layer.target);
    };
    
    const handleMouseOver = (e, layer) => {
        layer.target.setStyle({ "fillOpacity": "0.5"});
    };
    
    const handleMouseOut = (e, layer) => {
        layer.target.setStyle({ "fillOpacity": "0"});
    };
    
    return (
        <GeoJSON
            key={`features-floor-${props.floor}`}
            data={props.data}
            style={defaultStyle}
            bubblingMouseEvents={false}
            onEachFeature={(feature, layer) => {
                layer.bindTooltip(l => l.feature.properties.name);
                layer.on("mouseover", L.bind(handleMouseOver, null, layer));
                layer.on("mouseout", L.bind(handleMouseOut, null, layer));
                layer.on("click", L.bind(handleClick, null, layer));
            }} />
    );
};

/**
A layer that displays the footprint of selected features.
*/
export const SelectionLayer = (props) => {
    const [key, setKey] = useState("selection-layer");
    
    const selectionStyle = {
        color: "red",
        opacity: 0.5,
        fillOpacity: 0
    };
    
    const hiddenStyle = { opacity: 0 };
    
    const style = props.floor == props.data.floor ? selectionStyle : hiddenStyle;
    
    /*
    Changes the component's key whenever the selected feature changes.
    This ensures that the component will redraw itself.
    */
    useEffect(() => {
        if (props.data) {
            setKey("selection-layer-" + props.data._id);
        } else {
            setKey("selection-layer");
        }
    }, [props.data]);
    
    return (
        <GeoJSON
            key={key}
            data={props.data}
            style={style} />
    );
};