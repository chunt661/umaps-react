// TODO: change these
const API_PATH = "http://localhost:8080/api";
const TILE_PATH = "http://localhost:8080/tiles";

export function fetchMapData(mapID, fn) {
    fetch(`${API_PATH}/data/${mapID}`)
        .then(res => res.json())
        .then(json => fn(json))
        .catch(e => console.log(e)); // TODO: proper logging
}

export function fetchFeatures(mapID, floor, fn) {
    console.log(`${API_PATH}/features/${mapID}/${floor}`);
    fetch(`${API_PATH}/features/${mapID}/${floor}`)
        .then(res => res.json())
        .then(json => fn(json))
        .catch(e => console.log(e)); // TODO: proper logging
}

export function getTileURL(mapID, floor) {
    return `${TILE_PATH}/${mapID}/${floor}/{z}/{x}/{y}`;
}