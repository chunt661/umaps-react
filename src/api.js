// TODO: change these
const API_PATH = "http://localhost:8080/api";
const TILE_PATH = "http://localhost:8080/tiles";

/**
Retrieves high-level information of a map from the API. Data retrieved
includes the map name, dimensions, number of floors, and other metadata
related to map display and navigation.
*/
export function fetchMapData(mapID, fn, errFn) {
    fetchData(`${mapID}/data`, fn, errFn);
}

/**
Retrieves basic information and geometry of all features on a given floor.
*/
export function fetchFeatures(mapID, floor, fn, errFn) {
    loadData(`${mapID}/features/floor/${floor}`, fn, errFn);
}

/**
Retrieves complete information about a single feature.
*/
export function fetchSingleFeature(mapID, featureID, fn, errFn) {
    fetchData(`${mapID}/features/${featureID}`, fn, errFn);
}

/**
Retrieves search results from the server.
*/
export function fetchSearchResults(mapID, query, fn, errFn) {
    fetchData(`${mapID}/search/${query}`, fn, errFn);
}

/**
Returns a path to a specific map tile image.
*/
export function getTileURL(mapID, floor) {
    return `${TILE_PATH}/${mapID}/${floor}/{z}/{x}/{y}`;
}

/**
Loads map data from local storage.
*/
export function loadMapData(mapID) {
    return JSON.parse(localStorage.getItem(`${mapID}/data`));
}

/**
Saves map data to local storage.
*/
export function saveMapData(mapID, data) {
    localStorage.setItem(`${mapID}/data`, JSON.stringify(data));
}

/**
Clears all local storage entries that belong to the given map ID.
*/
export function clearLocalData(mapID) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).match(`${mapID}\/.*`)) {
            localStorage.removeItem(localStorage.key(i));
        }
    }
}

/**
Loads saved data or fetches it from the server if it is not saved locally.
*/
function loadData(path, fn, errFn) {
    const data = localStorage.getItem(path);
    
    if (!data) {
        fetchData(path, (data) => {
            fn(data);
            localStorage.setItem(path, JSON.stringify(data));
        }, errFn);
    } else {
        fn(JSON.parse(data));
    }
}

/**
Retrieves data from the server.
*/
function fetchData(path, fn, errFn) {
    fetch(`${API_PATH}/${path}`)
        .then(res => res.json())
        .then(json => fn(json))
        .catch(e => {
            console.log(e);  // TODO: proper logging
            if (errFn) {
                errFn();
            }
        });
}