import axios from 'axios';

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
    await axios.post('https://brasil-acessivel-api-production.up.railway.app/reports', {
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