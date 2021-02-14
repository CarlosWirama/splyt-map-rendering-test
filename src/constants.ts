/**
 * Driver API
 * 
 * example:
 * https://qa-interview-test.qa.splytech.io/api/drivers?
 * latitude=51.5049375,&longitude=-0.0964509&count=1
 */
export const buildDriverApi = (
  latitude: number,
  longitude: number,
  count: number,
) => `https://qa-interview-test.qa.splytech.io/api/drivers?latitude=${latitude}&longitude=${longitude}&count=${count}`;

/**
 * Default center 
 * 
 * to center the mapview
 * default to Splyt's office lat-long
 */
export const defaultCenter = {
  lat: 51.5049375,
  lng: -0.0964509,
};
