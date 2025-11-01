import express from "express";
import axios from "axios";
import { cacheMiddleware } from "../middleware/cache.js";
import District from "../models/District.js";

const router = express.Router();

// Get all districts
router.get("/districts", cacheMiddleware(3600), async (req, res) => {
  try {
    const districts = await District.find().select(
      "districtName stateName latitude longitude"
    );
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch districts" });
  }
});


router.get("/district/:name", cacheMiddleware(3600), async (req, res) => {
  try {
    const districtName = req.params.name;
     const finYear = req.query.fin_year || '2025-2026'

    // Find the district info from your database (for geo data etc)
    const district = await District.findOne({ districtName });
    if (!district) {
      return res.status(404).json({ error: "District not found" });
    }

    // Call data.gov.in API with correct resource ID and query params
    const response = await axios.get(
      "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722",
      {
        params: {
          "api-key": process.env.DATA_GOV_API_KEY,
          format: "json",
          "filters[state_name]": "MAHARASHTRA",
          "filters[fin_year]": finYear,
          limit: 1000, // Increase limit to get more records
        },
        timeout: 10000,
      }
    );

    // Extract all records from response
    const allRecords = response.data.records || [];

    // Filter records by district_name (case-insensitive match)
    const filteredData = allRecords.filter(
      (record) =>
        record.district_name &&
        record.district_name.toLowerCase() === districtName.toLowerCase()
    );

    // Return district info plus filtered MGNREGA data records
    res.json({
      district,
      mgnregaData: filteredData,
    });
  } catch (error) {
    console.error("Error fetching district data:", error.message);
    res.status(500).json({ error: "Failed to fetch district MGNREGA data" });
  }
});

// Get district by coordinates (for geolocation)
router.get("/district-by-coords", cacheMiddleware(3600), async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude required" });
    }

    // Find closest district using simple distance calculation
    const districts = await District.find();

    let closest = districts[0];
    let minDistance = Number.MAX_VALUE;

    districts.forEach((district) => {
      if (district.latitude && district.longitude) {
        const distance = Math.sqrt(
          Math.pow(parseFloat(lat) - district.latitude, 2) +
            Math.pow(parseFloat(lng) - district.longitude, 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          closest = district;
        }
      }
    });

    res.json(closest);
  } catch (error) {
    res.status(500).json({ error: "Failed to find district" });
  }
});

export default router;
