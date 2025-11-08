# 🎯 Getting Started

## Quick Setup (3 Steps)

### 1. Run Setup

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### 2. Start Server

```bash
cd evolution-simulation
npm run web
```

### 3. Open Browser

Go to: **http://localhost:3001**

Click **Start** to begin! 🧬

---

## Development Mode

**Windows:**
```bash
start-dev.bat
```

**Mac/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

Open: **http://localhost:5173**

---

## Next Steps

- **Configure**: See [Configuration Guide](docs/configuration/README.md)
- **API**: See [API Documentation](docs/api/README.md)
- **Design**: See [Design Documentation](docs/design/README.md)

---

## Troubleshooting

**404 Error?** Run `rebuild-frontend.bat` (Windows) or `rebuild-frontend.sh` (Mac/Linux)

**Connection Error?** Make sure backend is running: `npm run web`

**Port in Use?** Kill the process on port 3001 or 5173
