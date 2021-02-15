import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import RangeSlider from 'react-bootstrap-range-slider';
import { Container, SliderContainer, Marker } from './App.styled';
import { buildDriverApi, defaultCenter } from './constants';

type MockedResponse = Array<{ lat: number; lng: number }>;

function App() {
  const center = defaultCenter;
  const zoom = 11;

  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState<MockedResponse>([]);

  function refreshDrivers() {
    setIsLoading(true);
    const driverApi = buildDriverApi(center.lat, center.lng, count);

    async function fetchDriverApi() {
      /**
       * I got 404 while trying to fetch this API
       * so I made my own drivers fetch with mocked response
       * // const result = await fetch(driverApi);
       */
      const mockedResponse: MockedResponse = [
        { lat: 51.5149375, lng: -0.1065309 },
        { lat: 51.5112375, lng: -0.1018409 },
        { lat: 51.5127675, lng: -0.1024509 },
        { lat: 51.5135375, lng: -0.1032609 },
        { lat: 51.5149375, lng: -0.1041809 },
        { lat: 51.5151475, lng: -0.1053109 },
        { lat: 51.5166575, lng: -0.1079309 },
        { lat: 51.5175775, lng: -0.1084309 },
        { lat: 51.5180975, lng: -0.1097609 },
        { lat: 51.5192975, lng: -0.1007409 },
        { lat: 51.5107675, lng: -0.1064309 },

        { lat: 51.4904775, lng: -0.0812409 },
        { lat: 51.4918875, lng: -0.0864209 },
        { lat: 51.4927775, lng: -0.0825309 },
        { lat: 51.4935375, lng: -0.0842309 },
        { lat: 51.4947675, lng: -0.0831309 },
        { lat: 51.4962275, lng: -0.0875309 },
        { lat: 51.4954575, lng: -0.0868309 },
        { lat: 51.4974475, lng: -0.0854309 },
        { lat: 51.4983375, lng: -0.0886309 },
        { lat: 51.4991175, lng: -0.0893209 },
        { lat: 51.4900075, lng: -0.0807709 },

        { lat: 51.5049376, lng: -0.0964509 },
        { lat: 51.5040077, lng: -0.0954249 },
        { lat: 51.5047378, lng: -0.0944509 },
        { lat: 51.5039379, lng: -0.0934879 },
        { lat: 51.5045380, lng: -0.0924509 },
        { lat: 51.5044375, lng: -0.0910508 },
        { lat: 51.5043375, lng: -0.0904507 },
        { lat: 51.5042375, lng: -0.0864506 },
        { lat: 51.5041375, lng: -0.0874509 },
        { lat: 51.5049375, lng: -0.0964509 },
      ];

      const mockedDriverApi = (count: number) => new Promise<MockedResponse>(
        resolve => {
          setTimeout(() => resolve(mockedResponse.slice(-count)), 1000);
        }
      );
      const result = await mockedDriverApi(count);
      return result;
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
        {drivers.map((driver, index) => <Marker {...driver} key={index} />)}
      </GoogleMapReact>
    </Container>
  );
}

export default App;
