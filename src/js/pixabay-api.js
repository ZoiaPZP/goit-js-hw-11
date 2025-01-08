import axios from 'axios';

export async function service(query, page = 1, perPage = 40) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '48018775-66f870a0a55ddc658d7ca6c06';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });

  console.log("Запит до API:", `${BASE_URL}?${params}`); 

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    console.log("Успішна відповідь від API:", response.data); 
    return response;
  } catch (error) {
    console.error("Помилка у запиті API:", error); 
    throw error;
  }
}





