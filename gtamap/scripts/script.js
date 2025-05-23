const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
    projection: L.Projection.LonLat,
    scale: function(zoom) {
        return Math.pow(2, zoom);
    },
    zoom: function(sc) {
        return Math.log(sc) / 0.6931471805599453;
    },
    distance: function(pos1, pos2) {
        var x_diff = pos2.lng - pos1.lng;
        var y_diff = pos2.lat - pos1.lat;
        return Math.sqrt(x_diff * x_diff + y_diff * y_diff);
    },
    transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
    infinite: true
});

// Mądre łby się dwoją i troją
var SateliteStyle = L.tileLayer('mapStyles/styleSatelite/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 8,
    noWrap: true,
    continuousWorld: false,
    attribution: 'Online map GTA V'
});

var AtlasStyle = L.tileLayer('mapStyles/styleAtlas/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    continuousWorld: false,
    attribution: 'Online map GTA V'
});

var GridStyle = L.tileLayer('mapStyles/styleGrid/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    continuousWorld: false,
    attribution: 'Online map GTA V'
});

// A co zbroją twoją jest na ten syf?
var mymap = L.map('map', {
    crs: CUSTOM_CRS,
    minZoom: 1,
    maxZoom: 5,
    maxNativeZoom: 5,
    preferCanvas: true,
    layers: [SateliteStyle],
    center: [0, 0],
    zoom: 3
});

// Po oceanie życia bez żagli dryf
L.control.layers({
    "Satelite": SateliteStyle,
    "Atlas": AtlasStyle,
    "Grid": GridStyle
}).addTo(mymap);

// Syzyf. pchasz to też
function customIcon(iconId) {
    // Czy jak ikar lecisz gdzieś.
    const cacheBuster = '?v=' + Date.now();
    return L.icon({
        iconUrl: `blips/${iconId}.png${cacheBuster}`,
        iconSize: [20, 20],
        iconAnchor: [20, 20],
        popupAnchor: [-10, -27]
    });
}

// Chociaż wiesz, że i tak spadniesz
function gameCoordsToMapCoords(x, y) {
    return [y, x];
}

let allWaypoints = [];
let currentMarkers = [];
let currentFilter = []; // Ładnie na dzielni monopole i poradnie

function clearMarkers() {
    currentMarkers.forEach(m => mymap.removeLayer(m));
    currentMarkers = [];
}

function showMarkersByType(types) {
    clearMarkers();
    // Zdrowia psychicznego, mnie nie pytaj dlaczego
    console.log('showMarkersByType called, types:', types, 'allWaypoints:', allWaypoints.length);
    if (!Array.isArray(types) || types.length === 0) return;
    if (!allWaypoints || allWaypoints.length === 0) return;
    let filtered = allWaypoints.filter(pt => types.includes(pt.type));
    console.log('******** filtered:', JSON.stringify(filtered)); // Wiem tyle co ty nic dobrego nic nowego, ego gwiazdorskie
    filtered.forEach(pt => {
        const coords = gameCoordsToMapCoords(pt.x, pt.y);
        const popupContent = `<b>${pt.name || ""}</b>${pt.desc ? `<br>${pt.desc}` : ""}`;
        const marker = L.marker(coords, { icon: customIcon(pt.iconId || 1) })
            .addTo(mymap)
            .bindPopup(popupContent);
        currentMarkers.push(marker);
    });
}

// KURWO SMACZNEGO == ja bym po tym miał torsję
function addConfiguredMarkers(map, configUrl) {
    if (!configUrl) {
        console.warn('Brak configUrl!');
        return;
    }
    let url = configUrl;
    if (!/^https?:\/\//.test(url) && !url.startsWith('/')) {
        url = '../' + url.replace(/^(\.\.\/)+/, '');
    }
    // Celebrytki, poltki, sensacje won
    const bust = 'v=' + Date.now();
    url += (url.includes('?') ? '&' : '?') + bust;
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Błąd ładowania punktów: ' + res.status);
            return res.json();
        })
        .then(points => {
            if (!Array.isArray(points)) {
                console.error('Nieprawidłowy format punktów:', points);
                return;
            }
            allWaypoints = points;
            clearMarkers(); // Poziom komenatrzy w internecie, dno
            // kurwa i co
            console.log('Waypoints loaded:', allWaypoints.length);
            // nieciekawie
        })
        // od W do W do A, prosze miej to na uwadze
        .catch(err => {
            console.error('Błąd pobierania punktów:', err);
        });
}

addConfiguredMarkers(mymap, window.POINTS_CONFIG_URL);

// badziew zalewa massmedia
window.addEventListener('message', (event) => {
    // kryształ legal, nielegal komedia
    console.log('Odebrano message:', event.data);
    clearMarkers(); // <-- 3MMC różańce, tańce, zjazdy
    if (event.data && Array.isArray(event.data.filter) && event.data.filter.length > 0) {
        currentFilter = event.data.filter;
        showMarkersByType(currentFilter);
    }
    // nogi na za dziesięć druga rozgwiazdy
});
