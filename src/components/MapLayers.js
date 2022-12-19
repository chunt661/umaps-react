import L from "leaflet";
import { GeoJSON } from "react-leaflet";

export const FeatureLayer = (props) => {
    const defaultStyle = {
        "opacity": "0",
        "fillOpacity": "0",
        "fillColor": "#ffff00"
    };

    const selectionStyle = {
        color: "red",
        fillColor: "red",
        opacity: 0.5,
        fillOpacity: 0.25
    };

    const hiddenStyle = {
        opacity: 0,
        fillOpacity: 0
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
            data={props.data}
            style={defaultStyle}
            onEachFeature={(feature, layer) => {
                layer.bindTooltip(l => l.feature.properties.name);
                layer.on("mouseover", L.bind(handleMouseOver, null, layer));
                layer.on("mouseout", L.bind(handleMouseOut, null, layer));
                layer.on("click", L.bind(handleClick, null, layer));
            }} />
    );
};