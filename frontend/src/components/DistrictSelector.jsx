import React, { useState, useEffect } from "react";
import { getDistricts, getDistrictByCoords } from "../services/api";

// Financial years (can update as needed)
const FIN_YEARS = [
  "2018-2019",
  "2019-2020",
  "2020-2021",
  "2021-2022",
  "2022-2023",
  "2023-2024",
  "2024-2025",
  "2025-2026",
];

export default function DistrictSelector({
  selectedDistrict,
  setSelectedDistrict,
  finYear,
  setFinYear,
}) {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geoStatus, setGeoStatus] = useState("");

  useEffect(() => {
    fetchDistricts();
    attemptAutoDetect();
  }, []);

  const fetchDistricts = async () => {
    const data = await getDistricts();
    setDistricts(data);
    setLoading(false);
  };

  const attemptAutoDetect = () => {
    if (navigator.geolocation) {
      setGeoStatus("Detecting your location...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const district = await getDistrictByCoords(latitude, longitude);
          if (district) {
            setSelectedDistrict(district.districtName);
            setGeoStatus(`✓ Found: ${district.districtName}`);
          } else {
            setGeoStatus("Could not detect your location");
          }
        },
        () => setGeoStatus("Location permission denied")
      );
    }
  };

  const handleDistrictChange = (e) => setSelectedDistrict(e.target.value);
  const handleYearChange = (e) => setFinYear(e.target.value);

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-600">Loading districts...</div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-4 justify-center mb-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex-1">
        <label className="block text-base font-bold mb-1 text-gray-900">
          District
        </label>
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white cursor-pointer"
        >
          <option value="">-- Select District --</option>
          {districts.map((district) => (
            <option key={district._id} value={district.districtName}>
              {district.districtName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-base font-bold mb-1 text-gray-900">
          Financial Year
        </label>
        <select
          value={finYear}
          onChange={handleYearChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base bg-white cursor-pointer"
        >
          {FIN_YEARS.slice()
            .reverse()
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
      {geoStatus && (
        <p
          className={`text-sm font-semibold ${
            geoStatus.includes("✓") ? "text-green-600" : "text-gray-600"
          }`}
        >
          {geoStatus}
        </p>
      )}
    </div>
  );
}
