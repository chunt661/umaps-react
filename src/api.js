// TODO: change these
const API_PATH = "http://localhost:8080/api";
const TILE_PATH = "http://localhost:8080/tiles";

export function fetchMapData(mapID, fn, errFn) {
    fetchData(`data/${mapID}`, fn, errFn);
}

export function fetchFeatures(mapID, floor, fn, errFn) {
    loadData(`features/${mapID}/floor/${floor}`, fn, errFn);
}

export function fetchSingleFeature(mapID, featureID, fn, errFn) {
    fetchData(`features/${mapID}/${featureID}`, fn, errFn);
}

export function fetchSearchResults(mapID, query, fn, errFn) {
    fetchData(`search/${mapID}/${query}`, fn, errFn);
}

export function getTileURL(mapID, floor) {
    return `${TILE_PATH}/${mapID}/${floor}/{z}/{x}/{y}`;
}

export function loadMapData(mapID) {
    return JSON.parse(localStorage.getItem(`data/${mapID}`));
}

export function saveMapData(mapID, data) {
    localStorage.setItem(`data/${mapID}`, JSON.stringify(data));
}

export function clearLocalData(mapID) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).match(`[^\/]+\/${mapID}\/.*`)) {
            localStorage.removeItem(localStorage.key(i));
        }
    }
}

/**
Retrieves data from the API. First attempts to load the data from local 
storage. If no data is stored, it is fetched from the server instead.
*/
function loadData(path, fn, errFn) {
    const data = localStorage.getItem(path);
    
    if (!data) {
        fetch(`${API_PATH}/${path}`)
            .then(res => res.json())
            .then(json => {
                fn(json);
                localStorage.setItem(path, JSON.stringify(json));
            })
            .catch(e => {
                console.log(e);  // TODO: proper logging
                if (errFn) {
                    errFn();
                }
            });
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