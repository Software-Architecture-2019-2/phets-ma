import config from "react-native-config";

const HOST = config.HOST || 'localhost'; // Variables from .env file in the project root folder

export const API_GATEWAY_URI = `http://${HOST}/graphql`;
export const FILES_MS_URI = `http://${HOST}/file`;