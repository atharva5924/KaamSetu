# 🗣️ Our Voice, Our Rights - MGNREGA District Performance Dashboard

A production-ready web application that makes Government MGNREGA employment data accessible and understandable to rural citizens with low digital literacy. Empowering communities through transparent, data-driven insights about their district's economic development.

**Tagline:** _"Know Your District's MGNREGA Performance - [translate:आपके जिले का MGNREGA प्रदर्शन जानिए]]"_

---

## 🌍 Live Deployment

- **Frontend URL:** [Deploy](https://kaam-setu.vercel.app/)
- **Backend API:** [backend](https://kaamsetu-6i75.onrender.com/api/health)

---

## 🌟 Features

- 📍 **Auto-Location Detection** - Geolocation-based auto-detection of user's district (bonus feature)
- 📊 **Visual Performance Dashboard** - Icons, charts, and color-coded insights for low-literacy users
- 🔍 **District Comparison** - Compare your district's performance with state averages
- 📈 **Historical Trends** - View district performance across multiple financial years (2018-2026)
- 💰 **Comprehensive Metrics** - Wages paid, employment days, women participation, SC/ST inclusion, timely payments
- 🎨 **Bilingual Interface** - [translate:Hindi and English]] support for accessibility
- 📱 **Mobile-First Design** - Responsive UI optimized for low-bandwidth rural areas
- ⚡ **Smart Caching** - API response caching to handle unreliable government API uptime
- 🔐 **Production-Ready** - Graceful fallbacks, error handling, and offline data availability
- 📊 **Interactive Charts** - Recharts integration for beautiful data visualizations

---

## 🎯 Problem Statement (Assignment Context)

Government of India's MGNREGA program is one of the largest welfare initiatives, benefitting 12.15 Crore rural Indians in 2025. However, the data through data.gov.in APIs is:

- **Not user-friendly** for non-technical citizens
- **Uses technical jargon** that rural populations don't understand
- **Lacks visual storytelling** for better comprehension
- **Requires high data literacy** to extract insights

**Our Solution:** A web application that transforms raw government data into accessible, visual stories that empower rural citizens to understand and advocate for their rights.

---

## 📁 Tech Stack

### Frontend
- **React 18** with Vite (fast build, ES modules)
- **Tailwind CSS** - Utility-first styling, responsive design
- **Recharts** - Beautiful, responsive data visualizations
- **Axios** - API client with error handling
- **React Hooks** - State management and side effects

### Backend
- **Node.js** with Express.js
- **MongoDB** - District data storage, caching
- **Node-Cache** - In-memory API response caching (1-hour TTL)
- **Axios** - Government API integration
- **CORS** - Cross-origin request handling
- **dotenv** - Environment variable management

### External APIs
- **data.gov.in** - MGNREGA district-wise performance data
- **Browser Geolocation API** - User location detection

### Production Features
- **Graceful Fallback Mechanism** - Uses cached data when API is down
- **API Rate-Limiting Protection** - Smart caching prevents throttling
- **MongoDB Persistence** - Pre-populated district data for offline access
- **Error Boundaries** - User-friendly error messages

---

## 🔧 Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- data.gov.in API key
- Git

---

### 1. Clone Repository

```bash
git clone https://github.com/atharva5924/KaamSetu.git
cd kaamSetu
```

---

### 2. Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mgnrega
DATA_GOV_API_KEY=your_api_key_from_data_gov_in
NODE_ENV=development
```

**Get API Key from data.gov.in:**
1. Go to https://data.gov.in/
2. Sign up/Login
3. Navigate to API section
4. Select MGNREGA district-wise dataset
5. Copy your unique API key

Start backend server:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`

---

### 3. Frontend Setup

In a new terminal, navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start development server:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 📁 Project Structure

```
kaamSetu/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json
│   ├── .env                      # Environment variables
│   ├── routes/
│   │   └── mgnrega.js           # MGNREGA API routes
│   ├── models/
│   │   └── District.js          # MongoDB District schema
│   ├── middleware/
│       └── cache.js             # NodeCache caching middleware
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx             # React entry point
│   │   ├── App.jsx              # Root component
│   │   ├── index.css            # Tailwind imports
│   │   ├── components/
│   │   │   ├── DistrictSelector.jsx    # District + Year selector
│   │   │   ├── Dashboard.jsx            # Main dashboard
│   │   │   └── Stats.jsx                # Stats with Recharts
│   │   └── services/
│   │       └── api.js           # Axios API calls
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── index.html
│
└── README.md
```

---

## 📊 API Endpoints

### MGNREGA Routes

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/mgnrega/districts` | Get all districts | - |
| GET | `/api/mgnrega/district/:name` | Get district performance data | `fin_year` (optional, default: 2025-2026) |
| GET | `/api/mgnrega/district-by-coords` | Find nearest district by geolocation | `lat`, `lng` |

**Response Example:**

```json
{
  "district": {
    "_id": "507f1f77bcf86cd799439011",
    "districtName": "Pune",
    "stateName": "Maharashtra",
    "latitude": 18.5204,
    "longitude": 73.8567
  },
  "mgnregaData": [
    {
      "fin_year": "2024-2025",
      "month": "Dec",
      "district_name": "PUNE",
      "Total_Households_Worked": 85237,
      "Average_days_of_employment_provided_per_Household": 34,
      "Wages": "8518.24",
      "Women_Persondays": 1083577,
      "percentage_payments_gererated_within_15_days": 100.72,
      "Number_of_Completed_Works": 22584,
      "SC_persondays": 52281,
      "ST_persondays": 1118476,
      ...
    }
  ]
}
```

---

## 🎨 UI Components

### DistrictSelector Component
- Side-by-side selectors for District and Financial Year
- Auto-detection of user location with geolocation
- Bilingual labels ([translate:Hindi/English]])
- Real-time data refresh on selection change

### Dashboard Component
- Header with district name, state, and context
- Key metrics grid (6 main statistics)
- Comparison indicators (vs state average)
- Performance badges (payment speed, category %, etc.)

### Stats Component (with Recharts)
- **Pie Charts** - Work completion status, payment quality
- **Bar Charts** - Community participation (SC/ST breakdown)
- **Vertical Bar Charts** - Employment quality metrics
- **Color-Coded Metrics** - Quick visual feedback

### Accessibility Features
- 🎯 Large buttons and icons for ease of clicking
- 📖 Simple language + [translate:Hindi explanations]]
- 💡 "What does this mean?" tooltips for each metric
- 🌈 Color-coded performance indicators
- ♿ High contrast for rural low-light environments

---

## 🛡️ Production Readiness

### Caching Strategy

Your backend uses **multi-layer caching** to handle unreliable government APIs:

1. **In-Memory Cache (NodeCache)**
   - Default TTL: 1 hour
   - Stores API responses from data.gov.in
   - Prevents repeated API calls and rate-limiting

2. **MongoDB Persistence**
   - Pre-populated district metadata
   - Fallback data when API is unavailable
   - Historical district information for geolocation

3. **Graceful Degradation**
   - If API fails: Return last cached/stored data
   - User sees "Data may be delayed" notice
   - Application remains functional

### Error Handling

```javascript
// Backend example - graceful fallback
const response = await axios.get(apiUrl, { timeout: 10000 });
const data = response.data.records || [];

if (!data || data.length === 0) {
  // Return cached data or empty
  return res.json({
    district,
    mgnregaData: cache.get(cacheKey) || [],
    message: 'Using cached data - API currently unavailable'
  });
}
```

---

## 🧪 Testing

### Manual Testing

1. **Test District Selection:**
   ```bash
   curl http://localhost:5000/api/mgnrega/districts
   ```

2. **Test Data Retrieval:**
   ```bash
   curl "http://localhost:5000/api/mgnrega/district/Pune?fin_year=2024-2025"
   ```

3. **Test Geolocation:**
   Open browser and check auto-detection feature

---

## 📊 Key Metrics Displayed

| Metric | Display | Purpose |
|--------|---------|---------|
| **Families Got Work** | 👨‍👩‍👧‍👦 {number} | Show employment reach |
| **Avg Employment Days** | 📅 {days} dिन | Compare with state average |
| **Wages Paid** | 💰 ₹{amount}Cr | Total economic impact |
| **Women Participation** | 👩‍🏭 {days}k | Gender inclusion metric |
| **Projects Completed** | ✅ {count} | Progress indicator |
| **Active Job Cards** | 🆔 {ratio}% active | Active rate assessment |
| **Payment Speed** | ⚡ {%} within 15 days | Service quality metric |
| **SC/ST Participation** | 🤝 {days} work days | Inclusive employment data |

---

## 🎯 Assignment Highlights

✅ **Low-Literacy UI Design**
- Icons, emojis, and pictorial representations
- Simple language with [translate:Hindi translations]]
- No technical jargon

✅ **Accessibility for Rural India**
- Mobile-first responsive design
- Works on low-bandwidth connections
- Geolocation auto-detection bonus feature

✅ **Production-Ready Architecture**
- API response caching (1-hour TTL)
- Graceful fallback when data.gov.in is down
- MongoDB pre-population for offline use
- Error boundaries and user-friendly messages

✅ **Comparative & Trend Insights**
- District vs state average comparison
- Financial year selection for trend viewing
- Performance badges and color-coded feedback

✅ **Professional Visual Design**
- Recharts integration for beautiful charts
- Tailwind CSS for consistent styling
- Color-coded metrics for quick understanding
- Responsive across all device sizes

---

## 👨‍💻 Developer

**Your Name**  
CSE Student @ IIIT Nagpur (Graduating 2026)  
📧 nileatharva20@gmail.com 
🔗 [LinkedIn](https://www.linkedin.com/in/atharva-nile-a50120294/) • [GitHub](https://github.com/atharva5924)

---

## 📝 License

[MIT](LICENSE)

---

Made with ❤️ for rural India's digital empowerment.
