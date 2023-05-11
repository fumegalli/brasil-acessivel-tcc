import axios from 'axios';

const BASE_URL = 'https://brasil-acessivel-api-production.up.railway.app';

export const createReport = async ({
    placeId,
    blindness,
    guideDog,
    hearingImpairment,
    learningImpairment,
    mobilityImpairment,
    muteness,
    visualImpairment,
    wheelchair
}) => {
  try {
    await axios.post(`${BASE_URL}/reports`, {
      placeId,
      blindness,
      guideDog,
      hearingImpairment,
      learningImpairment,
      mobilityImpairment,
      muteness,
      visualImpairment,
      wheelchair
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPlacesReportsData = async ({places}) => {
  const ids = places.map((place) => ({ id: place.id }));
  try {
    const { data } = await axios.post(`${BASE_URL}/reports/places`, {
      places: ids
    });
    return data;
  } catch(error) {
    console.error(error);
    throw error;
  }
}
