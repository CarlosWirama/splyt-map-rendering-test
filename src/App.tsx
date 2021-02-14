import React from 'react';
import GoogleMapReact from 'google-map-react';

function Marker({ lat, lng }: { lat: number; lng: number }) {
  // function Marker() {
  return (<div style={{ background: 'white', minWidth: 60 }}>qwerty</div>)
}
function App() {
  const center = {
    lat: 51.5049375,
    lng: -0.0964509,
  };
  const zoom = 11;

  return (
    // Important message from plugin: Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker
          lat={center.lat}
          lng={center.lng}
        />
      </GoogleMapReact>
    </div>
  );
}

export default App;
