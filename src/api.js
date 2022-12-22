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
    fetch(`${API_PATH}/features/${mapID}/floor/${floor}`)
        .then(res => res.json())
        .then(json => fn(json))
        .catch(e => console.log(e)); // TODO: proper logging
}

export function fetchSingleFeature(mapID, featureID, fn) {
    fetch(`${API_PATH}/features/${mapID}/${featureID}`)
        .then(res => res.json())
        .then(json => fn(json))
        .catch(e => console.log(e)); // TODO: proper logging
}

export function fetchSearchResults(mapID, query, fn) {
    fetch(`${API_PATH}/search/${mapID}/${query}`)
        .then(res => res.json())
        .then(json => fn(json))
        .catch(e => console.log(e)); // TODO: proper logging
}

export function getTileURL(mapID, floor) {
    return `${TILE_PATH}/${mapID}/${floor}/{z}/{x}/{y}`;
}