import { FILES_MS_URI } from './utils';

export async function uploadFile(file, token) {
  const data = new FormData();
  data.append('file', {
    name: file.fileName,
    type: file.type,
    uri: Platform.OS === "android" ? file.uri : file.uri.replace("file://", "")
  });
  return await createFile(data, token);
}

async function createFile(data, token){
  try {
    const response = await fetch(FILES_MS_URI, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}