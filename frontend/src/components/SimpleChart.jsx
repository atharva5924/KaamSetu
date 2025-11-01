import React from "react";

export default function SimpleChart({ data }) {
  if (!data) return null;

  // Simple pictorial representation instead of complex charts
  const households = Math.min(data.Total_Households_Worked / 10000, 10);
  const completedWorks = Math.min(data.Number_of_Completed_Works / 2000, 10);
  const paymentQuality = data.percentage_payments_gererated_within_15_days / 10;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Households Pictorial */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          परिवारों की संख्या (Households)
        </h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: Math.round(households) }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
            >
              👨‍👩‍👧
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Each symbol = 10,000 families | Total:{" "}
          {Math.round(data.Total_Households_Worked / 10000)}x
        </p>
      </div>

      {/* Payment Quality Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          तेजी से भुगतान की गुणवत्ता
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-8">
          <div
            className={`h-8 rounded-full flex items-center justify-center text-white font-bold transition-all ${
              paymentQuality > 9
                ? "bg-green-500"
                : paymentQuality > 8
                ? "bg-yellow-500"
                : "bg-orange-500"
            }`}
            style={{ width: `${paymentQuality * 10}%` }}
          >
            {paymentQuality > 4 &&
              `${parseFloat(
                data.percentage_payments_gererated_within_15_days || 0
              ).toFixed(1)}%`}
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          {data.percentage_payments_gererated_within_15_days > 95
            ? "✓ Excellent! Workers paid very fast"
            : "⚠ Good payment speed"}
        </p>
      </div>

      {/* Projects Completed Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          परियोजनाओं की स्थिति
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-green-600">
                Completed ✓
              </span>
              <span className="text-sm font-bold">
                {data.Number_of_Completed_Works}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className="h-6 bg-green-500 rounded-full"
                style={{
                  width: `${
                    (data.Number_of_Completed_Works /
                      (data.Number_of_Completed_Works +
                        data.Number_of_Ongoing_Works)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-blue-600">
                Ongoing 🔄
              </span>
              <span className="text-sm font-bold">
                {data.Number_of_Ongoing_Works}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className="h-6 bg-blue-500 rounded-full"
                style={{
                  width: `${
                    (data.Number_of_Ongoing_Works /
                      (data.Number_of_Completed_Works +
                        data.Number_of_Ongoing_Works)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Employment Days Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          आयु वर्ग और प्रतिभाग
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-pink-50 rounded">
            <span className="text-sm font-semibold">Women 👩‍🏭</span>
            <span className="font-bold text-pink-600">
              {Math.floor(data.Women_Persondays / 1000)}k days
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
            <span className="text-sm font-semibold">SC Community</span>
            <span className="font-bold text-blue-600">
              {Math.floor(data.SC_persondays / 1000)}k days
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded">
            <span className="text-sm font-semibold">ST Community</span>
            <span className="font-bold text-green-600">
              {Math.floor(data.ST_persondays / 1000)}k days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
