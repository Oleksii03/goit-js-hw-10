export const fetchCountries = (name) => {

  const BASE_URL = 'https://restcountries.com/v2'
  const FILTER_RESPONSE = 'name,capital,population,flags,languages'

  return fetch(`${BASE_URL}/name/${name}?fields=${FILTER_RESPONSE}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      };
      return response.json();
    });
};