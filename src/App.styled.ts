import styled from 'styled-components';
import { Coords } from 'google-map-react';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SliderContainer = styled.div`
  position: fixed;
  z-index: 1;
  background: white;
  padding: 0 16px 8px;
  border-radius: 50px;
`;

export const Marker = styled.div<Coords>`
  height: 20px;
  width: 20px;
  background: #b12727;
  border-radius: 50%;

  &:before {
    position: absolute;
    content: '';
    top: 10px;
    left: 4px;
    height: 12px;
    width: 12px;
    background: #b12727;
    transform: rotate(45deg) skew(10deg, 10deg);
  }
`;
