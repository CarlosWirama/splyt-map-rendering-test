import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import RangeSlider from 'react-bootstrap-range-slider';
import { Container, SliderContainer, Marker } from './App.styled';
import { buildDriverApi, defaultCenter } from './constants';

interface LatLng {
  lat: number;
  lng: number;
}

interface ApiResponse {
  drivers: Array<{
    location: {
      latitude: number;
      longitude: number;
    }
  }>
}

function App() {
  const center = defaultCenter;
  const zoom = 11;

  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState<LatLng[]>([]);

  function refreshDrivers() {
    setIsLoading(true);
    const driverApi = buildDriverApi(center.lat, center.lng, count);

    async function fetchDriverApi(): Promise<LatLng[]> {
      const result: ApiResponse = await fetch(driverApi).then(r => r.json());
      return result.drivers.map(({ location }) => ({
        lat: location.latitude,
        lng: location.longitude,
      }));
    }

    fetchDriverApi().then(newDrivers => {
      setDrivers(newDrivers);
      setIsLoading(false);
    });
  }

  useEffect(refreshDrivers, []);

  return (
    <Container>
      <SliderContainer>
        <RangeSlider
          min={1}
          max={50}
          disabled={isLoading}
          value={count}
          onChange={(_, value) => setCount(value)}
          onAfterChange={() => refreshDrivers()}
        />
      </SliderContainer>

      <GoogleMapReact
        // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {drivers.map((driver, index) => <Marker lat={driver.lat} lng={driver.lng} key={index} />)}
      </GoogleMapReact>
    </Container>
  );
}

export default App;
