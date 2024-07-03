import axios from 'axios';

//API_URL almacena la URL base de la API de Rest para obtener listado de paises e informacion sobre ellos 
const API_URL = 'https://restcountries.com/v3.1';

//Esta función (fetchAllCountries) se puede usar en cualquier parte de aplicación para obtener la lista de todos los países de la API
export const fetchAllCountries = async () => {
  try {
    // Utilizamos Axios para hacer una solicitud GET con el endpoint correspondiente
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
