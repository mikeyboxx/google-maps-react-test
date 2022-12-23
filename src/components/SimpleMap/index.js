import React, {useEffect, useState} from 'react';
import GoogleMap from 'google-map-react';
import { DiAndroid } from 'react-icons/di';

const AnyReactComponent = () => 
  <>
    <DiAndroid style={{
      height: 40, 
      width: 40}} 
    /> 
  </>;

export default function SimpleMap(){
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const defaultZoom = 16;

  const clickHandler = (e)=>{
    setLoading(true);
    // if position is null then watchPosition
    !position && navigator.geolocation.watchPosition(
      position => {
        setLoading(false);
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      error => setError(error),{
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      {loading && <h2>Requesting Google Maps API Data...</h2>}
      {position &&
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyCRI3hUC5eeAv3j8xC91LMkoIquO6XWJ94' }}
          defaultCenter={{
            lat: position.lat,
            lng: position.lng
          }}
          defaultZoom={defaultZoom}
          yesIWantToUseGoogleMapApiInternals
        >
          <AnyReactComponent
            lat={position.lat}
            lng={position.lng}
            text="My Marker"
          />
        </GoogleMap>}

        {!position && 
          <button 
            style={{
                height: 200, 
                width: '50%', 
                margin: 300}} 
            onClick={clickHandler}>
              Start Game
          </button>}

        {error && <div>${error.message}</div>}

    </div>
  );
}