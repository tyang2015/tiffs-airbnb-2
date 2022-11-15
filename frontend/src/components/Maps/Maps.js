// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import "./Maps.css"
import CustomMarker from './CustomMarker';
// import Cust

const containerStyle = {
  width: '100%',
  height: '500px',
};

// const center = {
//   lat: 38.9072,
//   lng: 77.0369,
// };



const Maps = ({ apiKey, lng, lat }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  let newLng = parseFloat(lng)
  let newLat = parseFloat(lat)
  return (
    <>
      {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lng: newLng, lat: newLat}}
            zoom={15}
          >
            <CustomMarker
              // position={{lng,lat}}
              lat={newLng}
              lng={newLat}
            />
            {/* <Marker className="spot-marker" position={{lng, lat}}/> */}
          </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
