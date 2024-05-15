import PropTypes from 'prop-types'

import './Mapa.css'

import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

function Mapa({ google }) {

    return (
        <div className='map-container flex' >
            <Map
                google={google}
                zoom={15}
                initialCenter={{ lat: -22.790405430396863, lng: -45.183530760549445 }}
                style={{ maxHeight: '50%', maxWidth: '50%' }}
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