const ip = "192.168.1.55";
const port = "4000";
const FILE_MS_PORT = '4007';

export const API_GATEWAY_URI = `http://${ip}:${port}/graphql`;
export const FILES_MS_URI = `http://${ip}:${FILE_MS_PORT}/file`;

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