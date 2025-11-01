import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function Stats({ data, stateAverage }) {
  if (!data || !data.mgnregaData || data.mgnregaData.length === 0) {
    return (
      <div className="text-center py-12 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-gray-700 text-lg">
          डेटा वर्तमान में उपलब्ध नहीं है | Data not currently available. Please
          check back later.
        </p>
      </div>
    );
  }

  const record = data.mgnregaData[0];
  // const percentage = record.percentage_payments_gererated_within_15_days;
  const percentage =
    Number(record.percentage_payments_gererated_within_15_days) || 0;

  // Helper function to format large numbers in Indian format
  const formatIndian = (num) => {
    if (!num) return "0";
    return num.toLocaleString("en-IN");
  };

  // Helper function to compare with state average
  const getComparison = (districtValue, avgValue) => {
    if (!avgValue) return null;
    const diff = ((districtValue - avgValue) / avgValue) * 100;
    if (diff > 5) return { status: "better", percent: diff.toFixed(1) };
    if (diff < -5)
      return { status: "worse", percent: Math.abs(diff).toFixed(1) };
    return { status: "average", percent: 0 };
  };

  // Calculate wages per household
  const wagesPerHousehold = record.Wages
    ? (record.Wages / record.Total_Households_Worked).toFixed(2)
    : 0;


  // Data for pie chart - Work Status
  const workStatusData = [
    {
      name: "Completed",
      value: Number(record.Number_of_Completed_Works),
      fill: "#22c55e",
    },
    {
      name: "Ongoing",
      value: Number(record.Number_of_Ongoing_Works),
      fill: "#3b82f6",
    },
  ];

  // Data for bar chart - Community participation
  const communityData = [
    {
      name: "SC",
      value: Number(record.SC_workers_against_active_workers) || 0,
    },
    {
      name: "ST",
      value: Number(record.ST_workers_against_active_workers) || 0,
    },
  ];

  // Data for employment quality
  const employmentQualityData = [
    {
      category: "Payment Quality %",
      value: Number(record.percentage_payments_gererated_within_15_days),
      fill: "#ef4444",
    },
    {
      category: "Agriculture Expenditure %",
      value: Number(record.percent_of_Expenditure_on_Agriculture_Allied_Works),
      fill: "#f97316",
    },
    {
      category: "NRM Expenditure %",
      value: Number(record.percent_of_NRM_Expenditure),
      fill: "#eab308",
    },
  ];

  const paymentQualityData = [
    {
      status: "Within 15 days",
      value: Number(record.percentage_payments_gererated_within_15_days),
    },
    {
      status: "Remaining",
      value: Math.max(
        0,
        100 - Number(record.percentage_payments_gererated_within_15_days)
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Families Got Work */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-sm font-semibold">
              Families Got Work | परिवारों को काम मिला
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {formatIndian(record.Total_Households_Worked)}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            families in {record.district_name}
          </p>
        </div>

        {/* Average Employment Days */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-sm font-semibold">
              Average Work Days/Family | औसत काम के दिन
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {record.Average_days_of_employment_provided_per_Household} Days
          </p>
          <p className="text-sm text-gray-600">days per family on average</p>
        </div>

        {/* Total Wages */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-sm font-semibold">
              Total Wages Paid | कुल मजदूरी दी गई
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            ₹{(record.Wages / 10).toFixed(2)}Cr
          </p>
          <p className="text-sm text-gray-600">
            ₹{wagesPerHousehold} per family average
          </p>
          <div
            className={`mt-3 text-sm font-semibold text-center ${
              record.percentage_payments_gererated_within_15_days > 95
                ? "text-green-600"
                : "text-orange-600"
            }`}
          >
            {percentage > 95
              ? `✓ ${percentage.toFixed(1)}% paid within 2 weeks`
              : `⏱ ${percentage.toFixed(1)}% paid within 2 weeks`}
          </div>
        </div>

        {/* Women's Participation */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500 hover:shadow-lg transition flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-sm font-semibold">
              Women Got Work Days | महिलाओं को काम के दिन मिले
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {formatIndian(Math.floor(record.Women_Persondays / 10000))}k Days
          </p>
          <p className="text-sm text-gray-600">women participation in work</p>
          <p className="mt-3 text-sm font-semibold text-pink-600 text-center">
            🌟 Celebrating women's empowerment!
          </p>
        </div>

        {/* Projects Completed */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-sm font-semibold">
              Projects Completed | पूरी की गई परियोजनाएं
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {formatIndian(record.Number_of_Completed_Works)}
          </p>
          <p className="text-sm text-gray-600">
            completed works in {record.district_name}
          </p>
          <p className="mt-2 text-sm text-purple-600 font-semibold text-center">
            {formatIndian(record.Number_of_Ongoing_Works)} ongoing projects
          </p>
        </div>

        {/* Active Job Cards */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500 hover:shadow-lg transition flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-sm font-semibold">
              Active Job Cards | सक्रिय नौकरी कार्ड
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {formatIndian(record.Total_No_of_Active_Job_Cards)}
          </p>
          <p className="text-sm text-gray-600">
            out of {formatIndian(record.Total_No_of_JobCards_issued)} total
            issued
          </p>
          <p className="mt-2 text-sm text-indigo-600 font-semibold text-center">
            {(
              (record.Total_No_of_Active_Job_Cards /
                record.Total_No_of_JobCards_issued) *
              100
            ).toFixed(1)}
            % active rate
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wrap each chart with centering flex */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Work Status | परियोजनाओं की स्थिति
          </h3>
          <div className="w-full flex justify-center items-center">
            <ResponsiveContainer width="80%" height={300}>
              <PieChart>
                <Pie
                  data={workStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${formatIndian(value)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {workStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatIndian(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Payment Quality | तेजी से भुगतान
          </h3>
          <div className="w-full flex justify-center items-center">
            <ResponsiveContainer width="80%" height={300}>
              <PieChart>
                <Pie
                  data={paymentQualityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, value }) =>
                    `${status}: ${Number(value).toFixed(1)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#e5e7eb" />
                </Pie>
                <Tooltip
                  formatter={(value) => {
                    const num = Number(value);
                    return Number.isFinite(num) ? `${num.toFixed(1)}%` : value;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Community Participation | समुदाय की भागीदारी
          </h3>
          <div className="w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={communityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatIndian(value)} />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" name="Workers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Work Quality Metrics | रोजगार गुणवत्ता मीट्रिक्स
          </h3>
          <div className="w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employmentQualityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={150} />
                <Tooltip
                  formatter={(value) => {
                    const num = Number(value);
                    return Number.isFinite(num) ? `${num.toFixed(1)}%` : value;
                  }}
                />
                <Bar dataKey="value" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SC/ST Inclusion Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center">
          Inclusive Employment | SC/ST Participation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <p className="text-gray-600 font-semibold text-sm mb-1 text-center">
              Work days for SC community
            </p>
            <p className="text-2xl font-bold text-blue-600 text-center">
              {formatIndian(record.SC_persondays)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold text-sm mb-1 text-center">
              Work days for ST community
            </p>
            <p className="text-2xl font-bold text-green-600 text-center">
              {formatIndian(record.ST_persondays)}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Badge Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
          {record.district_name}
        </h3>
        <div className="space-y-3 w-full flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-between p-3 bg-gray-50 rounded w-[60%]">
            <span className="text-gray-700 font-semibold text-center">
              Quick Payment | तेजी से भुगतान
            </span>
            <span
              className={`px-3 py-1 rounded-full w-[100px] text-white font-bold text-sm text-center ${
                record.percentage_payments_gererated_within_15_days > 95
                  ? "bg-green-500"
                  : record.percentage_payments_gererated_within_15_days > 85
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {record.percentage_payments_gererated_within_15_days > 95 &&
                `✓ Excellent`}
              {record.percentage_payments_gererated_within_15_days <= 95 &&
                record.percentage_payments_gererated_within_15_days > 85 &&
                `⚠ Good`}
              {record.percentage_payments_gererated_within_15_days <= 85 &&
                `⚠ Needs Improvement`}
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between p-3 bg-gray-50 rounded w-[60%]">
            <span className="text-gray-700 font-semibold text-center">
              Agriculture & Allied Works | कृषि और संबद्ध कार्य
            </span>
            <span className="px-3 py-1 w-[100px] rounded-full text-white font-bold text-sm bg-blue-500 text-center">
              {record.percent_of_Expenditure_on_Agriculture_Allied_Works}% spent
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between p-3 bg-gray-50 rounded w-[60%]">
            <span className="text-gray-700 font-semibold text-center">
              Category B
            </span>
            <span className="px-3 py-1 w-[100px] rounded-full text-white font-bold text-sm bg-purple-500 text-center">
              {record.percent_of_Category_B_Works}%
            </span>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-sm text-gray-700 flex flex-col items-center justify-center text-center">
        <p className="font-semibold text-blue-900 mb-2 text-center">
          💡 What does this data mean?
        </p>
        <p className="text-gray-600 text-center">
          These stats show how many families got work, average work days, and
          total wages paid under MGNREGA in your district. Quick payments mean
          workers received their money faster.
        </p>
      </div>
    </div>
  );
}
