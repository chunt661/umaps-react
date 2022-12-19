// TODO: change these
const API_PATH = "http://localhost:8080/api";
const TILE_PATH = "http://localhost:8080/tiles";

export function fetchMapData(mapID, func) {
    fetch(`${API_PATH}/data/${mapID}`)
        .then(res => res.json())
        .then(json => func(json))
        .catch(e => console.log(e)); // TODO: proper logging
}

export function getTileURL(mapID, floor) {
    return `${TILE_PATH}/${mapID}/${floor}/{z}/{x}/{y}`;
}