# 🧬 Evolution Simulation - Getting Started Guide

Complete guide to set up and run the Evolution Simulation with React frontend.

## 📋 Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Comes with Node.js
- **Terminal/Command Prompt**: For running commands

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

Open your terminal in the project root and run:

```bash
# Install backend dependencies
cd evolution-simulation
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Build the React Frontend

```bash
# From the evolution-simulation directory
cd frontend
npm run build
cd ..
```

This creates an optimized production build in `frontend/dist`.

### Step 3: Start the Application

You have two options:

#### Option A: Development Mode (Recommended for Development)

Run backend and frontend separately in two terminals:

**Terminal 1 - Backend API:**
```bash
cd evolution-simulation
npm run web
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd evolution-simulation/frontend
npm run dev
```

Then open: **http://localhost:5173**

#### Option B: Production Mode (Single Server)

First, copy the built frontend to the public directory:

**Windows:**
```bash
cd evolution-simulation
xcopy /E /I /Y frontend\dist public
npm run web
```

**Mac/Linux:**
```bash
cd evolution-simulation
cp -r frontend/dist/* public/
npm run web
```

Then open: **http://localhost:3001**

## 📖 Detailed Instructions

### Backend Setup

The backend is a Node.js server that runs the simulation engine and provides API endpoints.

**Location:** `evolution-simulation/`

**Key Files:**
- `server.js` - Web server with API endpoints
- `src/` - Simulation engine code
- `config/default.json` - Simulation configuration

**Available Scripts:**
```bash
npm run web    # Start web server (port 3001)
npm run dev    # Run simulation in console mode
npm test       # Run engine tests
```

### Frontend Setup

The frontend is a React application built with Vite.

**Location:** `evolution-simulation/frontend/`

**Key Files:**
- `src/` - React components and application code
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration

**Available Scripts:**
```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔧 Configuration

### Backend Configuration

Edit `evolution-simulation/config/default.json`:

```json
{
  "simulation": {
    "initialPopulation": 100,
    "resourcesPerGeneration": 1000,
    "cyclesPerSecond": 10,
    "maxAge": 100
  }
}
```

### Frontend Configuration

Create `evolution-simulation/frontend/.env`:

```env
VITE_API_URL=http://localhost:3001
```

## 🎮 Using the Application

### Starting the Simulation

1. Open the application in your browser
2. Click the **Start** button in the Controls panel
3. Watch the real-time statistics and charts update

### Controls

- **Start**: Begin the simulation
- **Pause**: Pause the simulation (keeps current state)
- **Reset**: Reset to initial state
- **Speed Slider**: Adjust simulation speed (1-100 cycles/sec)
- **Settings Icon**: Configure simulation parameters
- **Theme Toggle**: Switch between light and dark mode

### Dashboard Features

**Statistics Cards:**
- Total Population
- Unique Variants
- Births This Generation
- Deaths This Generation
- Average Resources
- Average Age

**Charts:**
- Population Over Time (line chart)
- Top 10 Genetic Variants (bar chart)
- Genetic Traits Over Time (multi-line chart)
- Genetic Properties (progress bars)
- Genetic Properties Heatmap

**Event Log:**
- Real-time event tracking
- Auto-scrolls to latest events

## 🐛 Troubleshooting

### "404 Not Found" Error

**Problem:** The `public` directory is empty.

**Solution:** Build the frontend and copy to public:

```bash
cd evolution-simulation/frontend
npm run build
cd ..

# Windows
xcopy /E /I /Y frontend\dist public

# Mac/Linux
cp -r frontend/dist/* public/
```

### "Cannot GET /" Error

**Problem:** Server is running but no files to serve.

**Solution:** Use development mode instead:

```bash
# Terminal 1
cd evolution-simulation
npm run web

# Terminal 2
cd evolution-simulation/frontend
npm run dev
```

Then open http://localhost:5173

### Backend Connection Error

**Problem:** Frontend can't connect to backend.

**Solutions:**
1. Ensure backend is running: `npm run web` in `evolution-simulation/`
2. Check backend is on port 3001: http://localhost:3001/api/stats
3. Check CORS settings in `server.js`
4. Verify `VITE_API_URL` in frontend `.env` file

### Port Already in Use

**Problem:** Port 3001 or 5173 is already in use.

**Solution:**

For backend (port 3001):
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

For frontend (port 5173):
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### Module Not Found Errors

**Problem:** Dependencies not installed.

**Solution:**
```bash
# Backend
cd evolution-simulation
npm install

# Frontend
cd evolution-simulation/frontend
npm install
```

## 📁 Project Structure

```
evolution-simulation/
├── config/              # Simulation configuration
├── src/                 # Backend simulation engine
│   ├── core/           # Core simulation logic
│   ├── models/         # Data models (Piro, Genetics)
│   ├── managers/       # Resource and population managers
│   └── utils/          # Utility functions
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # React Context providers
│   │   ├── hooks/      # Custom React hooks
│   │   └── services/   # API service layer
│   └── dist/           # Built frontend (after npm run build)
├── public/             # Static files served by backend
├── server.js           # Web server
└── package.json        # Backend dependencies
```

## 🔄 Development Workflow

### Recommended Setup

1. **Two Terminal Windows:**
   - Terminal 1: Backend (`npm run web`)
   - Terminal 2: Frontend (`npm run dev`)

2. **Development:**
   - Edit React components in `frontend/src/`
   - Changes auto-reload in browser
   - Backend API runs on port 3001
   - Frontend dev server on port 5173

3. **Testing:**
   - Test backend: `npm test` in `evolution-simulation/`
   - Test frontend: Open http://localhost:5173

### Production Build

1. Build frontend:
   ```bash
   cd evolution-simulation/frontend
   npm run build
   ```

2. Copy to public:
   ```bash
   cd ..
   # Windows: xcopy /E /I /Y frontend\dist public
   # Mac/Linux: cp -r frontend/dist/* public/
   ```

3. Start server:
   ```bash
   npm run web
   ```

4. Open: http://localhost:3001

## 🌐 API Endpoints

The backend provides these API endpoints:

- `GET /api/init` - Check if simulation is initialized
- `POST /api/start` - Start the simulation
- `POST /api/pause` - Pause the simulation
- `POST /api/reset` - Reset the simulation
- `POST /api/speed` - Set simulation speed
- `GET /api/stats` - Get current statistics

See `evolution-simulation/frontend/API.md` for detailed API documentation.

## 📚 Additional Documentation

- **Frontend README**: `evolution-simulation/frontend/README.md`
- **Component Docs**: `evolution-simulation/frontend/COMPONENTS.md`
- **API Docs**: `evolution-simulation/frontend/API.md`
- **Implementation Summary**: `evolution-simulation/frontend/IMPLEMENTATION_SUMMARY.md`

## 🎯 Next Steps

1. ✅ Install dependencies (both backend and frontend)
2. ✅ Build the frontend
3. ✅ Start the application (dev or prod mode)
4. 🎮 Explore the simulation dashboard
5. ⚙️ Adjust configuration as needed
6. 📊 Monitor statistics and charts

## 💡 Tips

- **Performance**: Reduce simulation speed if charts lag
- **Dark Mode**: Toggle theme in header for comfortable viewing
- **Mobile**: The dashboard is fully responsive
- **Events**: Check event log for simulation activity
- **Config**: Use settings modal to adjust parameters

## 🆘 Need Help?

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Verify all dependencies are installed
3. Ensure both backend and frontend are running
4. Check browser console for errors (F12)
5. Check terminal output for server errors

## 🎉 Success!

If you see the dashboard with charts and controls, you're all set! Click **Start** to begin the simulation and watch evolution in action.

---

**Happy Simulating! 🧬**
