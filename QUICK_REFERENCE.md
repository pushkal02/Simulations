# 🚀 Quick Reference Card

## One-Command Setup

**Windows:**
```bash
setup.bat && cd evolution-simulation && npm run web
```

**Mac/Linux:**
```bash
chmod +x setup.sh && ./setup.sh && cd evolution-simulation && npm run web
```

Then open: **http://localhost:3001**

## Common Commands

### Setup
```bash
# Automated setup (Windows)
setup.bat

# Automated setup (Mac/Linux)
chmod +x setup.sh && ./setup.sh
```

### Start Application

**Production Mode (Single Server):**
```bash
cd evolution-simulation
npm run web
# Open: http://localhost:3001
```

**Development Mode (Two Servers):**
```bash
# Terminal 1 - Backend
cd evolution-simulation
npm run web

# Terminal 2 - Frontend
cd evolution-simulation/frontend
npm run dev
# Open: http://localhost:5173
```

**Automated Dev Mode:**
```bash
# Windows
start-dev.bat

# Mac/Linux
chmod +x start-dev.sh && ./start-dev.sh
```

### Build Frontend
```bash
cd evolution-simulation/frontend
npm run build
```

### Copy Frontend to Public
```bash
cd evolution-simulation

# Windows
xcopy /E /I /Y frontend\dist public

# Mac/Linux
cp -r frontend/dist/* public/
```

## Project Structure

```
📁 Root
├── 📄 README.md                    # Main documentation
├── 📄 GETTING_STARTED.md           # Setup guide
├── 📄 QUICK_REFERENCE.md           # This file
├── 🔧 setup.bat / setup.sh         # Setup scripts
├── 🔧 start-dev.bat / start-dev.sh # Dev mode scripts
└── 📁 evolution-simulation/
    ├── 📁 src/                     # Backend code
    ├── 📁 config/                  # Configuration
    ├── 📁 frontend/                # React app
    │   ├── 📁 src/                 # React source
    │   ├── 📁 dist/                # Built frontend
    │   └── 📄 package.json
    ├── 📁 public/                  # Served files
    ├── 📄 server.js                # Web server
    └── 📄 package.json
```

## Ports

- **Backend API**: 3001
- **Frontend Dev**: 5173
- **Production**: 3001

## API Endpoints

```
POST /api/start   # Start simulation
POST /api/pause   # Pause simulation
POST /api/reset   # Reset simulation
POST /api/speed   # Set speed
GET  /api/stats   # Get statistics
GET  /api/init    # Check initialization
```

## Troubleshooting

### 404 Error
```bash
cd evolution-simulation/frontend
npm run build
cd ..
# Windows: xcopy /E /I /Y frontend\dist public
# Mac/Linux: cp -r frontend/dist/* public/
```

### Connection Error
```bash
# Check backend is running
cd evolution-simulation
npm run web
```

### Port in Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Missing Dependencies
```bash
# Backend
cd evolution-simulation
npm install

# Frontend
cd evolution-simulation/frontend
npm install
```

## Configuration Files

### Backend Config
`evolution-simulation/config/default.json`
```json
{
  "simulation": {
    "initialPopulation": 100,
    "resourcesPerGeneration": 1000,
    "cyclesPerSecond": 10
  }
}
```

### Frontend Config
`evolution-simulation/frontend/.env`
```env
VITE_API_URL=http://localhost:3001
```

## Dashboard Controls

- **Start**: Begin simulation
- **Pause**: Pause (keeps state)
- **Reset**: Reset to initial state
- **Speed**: 1-100 cycles/sec
- **⚙️**: Configuration modal
- **🌙/☀️**: Theme toggle

## Statistics Displayed

- Total Population
- Unique Variants
- Births This Generation
- Deaths This Generation
- Average Resources
- Average Age

## Charts Available

1. Population Over Time (line)
2. Top 10 Variants (bar)
3. Genetic Traits (multi-line)
4. Genetic Properties (bars)
5. Genetic Heatmap

## Keyboard Shortcuts

- **Ctrl+C**: Stop server
- **F5**: Refresh page
- **F12**: Open dev tools

## Quick Tips

✅ Use dev mode for development (hot reload)
✅ Use production mode for demos
✅ Check browser console for errors (F12)
✅ Reduce speed if charts lag
✅ Use dark mode for comfortable viewing
✅ Event log shows simulation activity

## Need Help?

1. 📖 Read [GETTING_STARTED.md](GETTING_STARTED.md)
2. 📚 Check [Frontend README](evolution-simulation/frontend/README.md)
3. 🔍 Review [API Docs](evolution-simulation/frontend/API.md)
4. 🐛 Check browser console (F12)
5. 📝 Check terminal output

## Success Checklist

- [ ] Dependencies installed (backend & frontend)
- [ ] Frontend built (`npm run build`)
- [ ] Frontend copied to public (if using production mode)
- [ ] Backend server running (`npm run web`)
- [ ] Browser open to correct URL
- [ ] Dashboard loads with controls and charts
- [ ] Click Start to begin simulation

---

**Happy Simulating! 🧬**
