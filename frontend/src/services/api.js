import axios from "axios";

const API_BASE =import.meta.env.PROD ? "https://kaamsetu-6i75.onrender.com/api/mgnrega" : "/api/mgnrega";


export const getDistricts = async () => {
  try {
    const response = await axios.get(`${API_BASE}/districts`);
    // console.log("Fetched districts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching districts:", error);
    return [];
  }
};

export const getDistrictData = async (districtName, finYear) => {
  try {
    const response = await axios.get(`${API_BASE}/district/${districtName}`, {
      params: { fin_year: finYear },
    });
    console.log("Fetched district data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching district data:", error);
    return null;
  }
};

export const getDistrictByCoords = async (lat, lng) => {
  try {
    const response = await axios.get(`${API_BASE}/district-by-coords`, {
      params: { lat, lng },
    });
    return response.data;
  } catch (error) {
    console.error("Error finding district:", error);
    return null;
  }
};
