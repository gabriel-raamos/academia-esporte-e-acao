import PropTypes from 'prop-types'

import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

function Mapa({ google }) {
    return (
        <div style={{ width: '50%', height: '50%', border: 'solid 4px rgb(185 28 28)' }} >
            <Map
                google={google}
                zoom={15}
                initialCenter={{ lat: -22.790405430396863, lng: -45.183530760549445 }}
                style={{ width: '50%', height: '50%', border: 'solid 4px rgb(185 28 28)' }}
            >
                <Marker position={{ lat: -22.790405430396863, lng: -45.183530760549445 }} />
            </Map>
        </div>
    );
}

Mapa.propTypes = {
    google: PropTypes.string
}

export default GoogleApiWrapper({
    apiKey: import.meta.env.VITE_API_KEY
})(Mapa);