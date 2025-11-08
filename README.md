# 🧬 Evolution Simulation

A sophisticated JavaScript-based evolution simulation system that models natural selection, genetic inheritance, and population dynamics. Features a modern React dashboard for real-time visualization and control.

![Evolution Simulation](https://img.shields.io/badge/Node.js-16%2B-green)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### Simulation Engine
- **Natural Selection**: Beings (Piros) compete for resources and reproduce
- **Genetic Inheritance**: 6 genetic traits passed to offspring with mutation
- **Population Dynamics**: Birth, death, aging, and resource management
- **Variant Tracking**: Monitor unique genetic variants over time

### React Dashboard
- **Real-time Visualization**: Live charts updating every 100ms
- **Interactive Controls**: Start, pause, reset, and adjust speed
- **Comprehensive Statistics**: Population, variants, births, deaths, and more
- **Multiple Chart Types**: Line charts, bar charts, progress bars, heatmaps
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Event Log**: Track simulation events in real-time

## 🚀 Quick Start

### Automated Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

Then start the application:
```bash
cd evolution-simulation
npm run web
```

Open: **http://localhost:3001**

### Development Mode

**Windows:**
```bash
start-dev.bat
```

**Mac/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

This starts both backend (port 3001) and frontend (port 5173) servers.

Open: **http://localhost:5173**

### Manual Setup

See [GETTING_STARTED.md](GETTING_STARTED.md) for detailed instructions.

## 📖 Documentation

- **[Getting Started Guide](GETTING_STARTED.md)** - Complete setup instructions
- **[Frontend README](evolution-simulation/frontend/README.md)** - React app documentation
- **[Component Docs](evolution-simulation/frontend/COMPONENTS.md)** - Component API reference
- **[API Documentation](evolution-simulation/frontend/API.md)** - Backend API endpoints
- **[Implementation Summary](evolution-simulation/frontend/IMPLEMENTATION_SUMMARY.md)** - Technical overview

## 🎮 Usage

### Starting the Simulation

1. Open the dashboard in your browser
2. Click the **Start** button
3. Watch real-time statistics and charts update
4. Adjust speed with the slider (1-100 cycles/sec)
5. Click **Settings** to configure parameters

### Dashboard Overview

**Control Panel:**
- Start/Pause/Reset buttons
- Speed slider
- Configuration modal

**Statistics:**
- Total Population
- Unique Variants
- Births/Deaths per Generation
- Average Resources & Age

**Charts:**
- Population & Variants Over Time
- Top 10 Genetic Variants
- Genetic Traits Evolution
- Genetic Properties (bars & heatmap)

**Event Log:**
- Real-time event tracking
- Color-coded by type

## 🏗️ Architecture

### Backend (Node.js)
```
evolution-simulation/
├── src/
│   ├── core/           # Simulation engine
│   ├── models/         # Piro, Genetics models
│   ├── managers/       # Resource, Population managers
│   └── utils/          # Helper functions
├── config/             # Configuration files
└── server.js           # Web server & API
```

### Frontend (React + Vite)
```
evolution-simulation/frontend/
├── src/
│   ├── components/     # React components
│   ├── context/        # State management
│   ├── hooks/          # Custom hooks
│   └── services/       # API client
└── dist/               # Production build
```

## 🔧 Configuration

### Simulation Parameters

Edit `evolution-simulation/config/default.json`:

```json
{
  "simulation": {
    "initialPopulation": 100,
    "resourcesPerGeneration": 1000,
    "cyclesPerSecond": 10,
    "maxAge": 100
  },
  "genetics": {
    "mutationRate": 0.1,
    "mutationStrength": 0.05
  }
}
```

### Frontend Configuration

Create `evolution-simulation/frontend/.env`:

```env
VITE_API_URL=http://localhost:3001
```

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm

### Install Dependencies
```bash
# Backend
cd evolution-simulation
npm install

# Frontend
cd frontend
npm install
```

### Run Development Servers
```bash
# Backend (Terminal 1)
cd evolution-simulation
npm run web

# Frontend (Terminal 2)
cd evolution-simulation/frontend
npm run dev
```

### Build for Production
```bash
cd evolution-simulation/frontend
npm run build

# Copy to public directory
cd ..
# Windows: xcopy /E /I /Y frontend\dist public
# Mac/Linux: cp -r frontend/dist/* public/
```

### Available Scripts

**Backend:**
- `npm run web` - Start web server
- `npm run dev` - Run in console mode
- `npm test` - Run tests

**Frontend:**
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🧪 Testing

```bash
cd evolution-simulation
npm test
```

## 📊 Technology Stack

### Backend
- Node.js (ES Modules)
- HTTP Server (built-in)
- Custom Simulation Engine

### Frontend
- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- Recharts (data visualization)
- Axios (HTTP client)
- Lucide React (icons)

## 🐛 Troubleshooting

### 404 Not Found
Build and copy frontend to public directory:
```bash
cd evolution-simulation/frontend
npm run build
cd ..
# Windows: xcopy /E /I /Y frontend\dist public
# Mac/Linux: cp -r frontend/dist/* public/
```

### Backend Connection Error
1. Ensure backend is running: `npm run web`
2. Check port 3001 is available
3. Verify CORS settings

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

See [GETTING_STARTED.md](GETTING_STARTED.md) for more troubleshooting tips.

## 📈 Performance

- **Simulation Speed**: 1-100 cycles per second
- **Population Capacity**: Tested up to 10,000 Piros
- **Chart Updates**: Real-time (100ms polling)
- **Memory Usage**: Optimized with efficient data structures

## 🎯 Roadmap

- [ ] WebSocket support for real-time updates
- [ ] Data export (CSV/JSON)
- [ ] Simulation presets
- [ ] Advanced genetic algorithms
- [ ] Multi-environment support
- [ ] Replay functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by evolutionary biology and genetic algorithms
- Built with modern web technologies
- Designed for education and research

## 📞 Support

For issues and questions:
1. Check [GETTING_STARTED.md](GETTING_STARTED.md)
2. Review documentation in `evolution-simulation/frontend/`
3. Check browser console (F12) for errors
4. Check terminal output for server errors

---

**Made with ❤️ for science and simulation**

🧬 **Start evolving today!**
