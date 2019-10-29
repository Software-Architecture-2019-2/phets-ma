import config from "react-native-config";

const HOST = config.HOST || 'localhost'; // Variables from .env file in the project root folder
const API_GATEWAY_PORT = config.API_GATEWAY_PORT || "4000";
const FILE_MS_PORT = config.FILE_MS_PORT || '4007';

export const API_GATEWAY_URI = `http://${HOST}:${API_GATEWAY_PORT}/graphql`;
export const FILES_MS_URI = `http://${HOST}:${FILE_MS_PORT}/file`;

export function handleResponse(response) {
  return response.text().then(text => {
    console.log(text);
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}