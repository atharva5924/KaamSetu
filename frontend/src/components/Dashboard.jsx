import React, { useState, useEffect } from "react";
import { getDistrictData } from "../services/api";
import Stats from "./Stats";

export default function Dashboard({ districtName, finYear }) {
  const [data, setData] = useState(null);
  const [stateAverage, setStateAverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (districtName && finYear) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [districtName, finYear]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const result = await getDistrictData(districtName, finYear);
    if (result) {
      setData(result);
      if (result.mgnregaData && result.mgnregaData.length > 0) {
        const allRecords = result.mgnregaData;
        const avgEmploymentDays =
          allRecords.reduce(
            (sum, r) =>
              sum + (r.Average_days_of_employment_provided_per_Household || 0),
            0
          ) / allRecords.length;
        const avgWagesPerHousehold =
          allRecords.reduce(
            (sum, r) =>
              sum + (parseFloat(r.Wages) / r.Total_Households_Worked || 0),
            0
          ) / allRecords.length;
        setStateAverage({
          avgEmploymentDays: Math.round(avgEmploymentDays),
          avgWagesPerHousehold: avgWagesPerHousehold.toFixed(2),
        });
      }
    } else {
      setError("Unable to load district data");
    }
    setLoading(false);
  };

  if (!districtName) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-gray-500 text-center">
          अपना जिला चुनें या स्थान दें
        </p>
        <p className="text-sm text-gray-400 text-center">
          Select your district to view performance data
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="inline-block animate-spin text-xl">⌛</div>
        <p className="mt-4 text-gray-600 text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-red-500 text-lg font-semibold text-center">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 rounded-lg flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          {data?.district?.districtName}
        </h2>
        <p className="text-blue-100 text-lg text-center">
          {data?.district?.stateName}
        </p>
        <p className="text-sm mt-2 opacity-90 text-center">
          आपके जिले का MGNREGA प्रदर्शन | Your District's MGNREGA Performance
        </p>
      </div>

      {/* Main Stats with Charts in center */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-center mx-auto">
        <Stats data={data} stateAverage={stateAverage} />
      </div>
    </div>
  );
}
