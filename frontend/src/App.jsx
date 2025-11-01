import { useState } from "react";
import DistrictSelector from "./components/DistrictSelector";
import Dashboard from "./components/Dashboard";

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [finYear, setFinYear] = useState("2025-2026");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 flex flex-col items-center justify-start">
      {/* Header */}
      <header className="w-full flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
            🗣️ Our Voice, Our Rights
          </h1>
          <p className="text-blue-100 text-lg max-w-xl text-center">
            Know Your District&apos;s MGNREGA Performance | अपने जिले का MGNREGA
            प्रदर्शन जानें
          </p>
          <p className="text-blue-50 text-sm mt-2 max-w-xl text-center">
            Powered by Government of India Open Data | Government of India की
            खुली डेटा से
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DistrictSelector
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          finYear={finYear}
          setFinYear={setFinYear}
        />
        {selectedDistrict && (
          <Dashboard districtName={selectedDistrict} finYear={finYear} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white w-full mt-12 py-8 flex flex-col items-center">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
          <p className="text-gray-300 mb-2 text-center">
            Data Source: Government of India MGNREGA Program
          </p>
          <p className="text-gray-400 text-sm text-center">
            Last updated: {new Date().toLocaleDateString("en-IN")}
          </p>
          <p className="text-gray-500 text-xs mt-4 text-center">
            This app is built for everyone
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
