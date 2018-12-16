import axios from "axios";
import { toast } from "react-toastify";
import { GOOGLE_MAPS_API_KEY } from "./keys";

export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    const {
      formatted_address,
      geometry: {
        location: { lat, lng }
      }
    } = firstPlace;
    return { formatted_address, lat, lng };
  } else {
    toast.error(data.error_message);
    return false;
  }
};
export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    if (!firstPlace) {
      return false;
    }
    const address = firstPlace.formatted_address;
    return address;
  } else {
    toast.error(data.error_message);
    return false;
  }
};