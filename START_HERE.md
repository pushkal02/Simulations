# 🎯 START HERE - Evolution Simulation

## 🚀 Fastest Way to Get Started

### Step 1: Run Setup Script

**Windows (Command Prompt):**
```bash
setup.bat
```

**Mac/Linux (Terminal):**
```bash
chmod +x setup.sh
./setup.sh
```

This will:
- ✅ Install all dependencies
- ✅ Build the React frontend
- ✅ Copy files to the right place

### Step 2: Start the Server

```bash
cd evolution-simulation
npm run web
```

### Step 3: Open Your Browser

Go to: **http://localhost:3001**

### Step 4: Start Simulating!

Click the **Start** button and watch evolution happen in real-time! 🧬

---

## 📖 More Information

- **Full Setup Guide**: [GETTING_STARTED.md](GETTING_STARTED.md)
- **Quick Commands**: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **Main README**: [README.md](README.md)

---

## 🐛 Having Issues?

### "404 Not Found" Error?

The frontend needs to be built first. Run:

```bash
cd evolution-simulation/frontend
npm run build
cd ..

# Windows
xcopy /E /I /Y frontend\dist public

# Mac/Linux
cp -r frontend/dist/* public/

npm run web
```

### Want Development Mode Instead?

**Windows:**
```bash
start-dev.bat
```

**Mac/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

Then open: **http://localhost:5173**

---

## ✨ What You'll See

- 📊 **Real-time Statistics**: Population, variants, births, deaths
- 📈 **Live Charts**: Population trends, genetic traits, variant distribution
- 🎮 **Interactive Controls**: Start, pause, reset, adjust speed
- 🌙 **Dark Mode**: Toggle for comfortable viewing
- 📝 **Event Log**: Track what's happening in the simulation

---

## 🎮 Using the Dashboard

1. **Start**: Click the green "Start" button
2. **Adjust Speed**: Use the slider (1-100 cycles/sec)
3. **Configure**: Click the ⚙️ icon to change parameters
4. **Theme**: Click 🌙/☀️ to toggle dark/light mode
5. **Watch**: See evolution happen in real-time!

---

## 💡 Pro Tips

- Start with speed at 10 cycles/sec
- Watch the population chart to see growth patterns
- Check the variant chart to see genetic diversity
- Use the event log to track major events
- Try dark mode for extended viewing

---

## 🆘 Need Help?

1. Check [GETTING_STARTED.md](GETTING_STARTED.md) for detailed instructions
2. See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for common commands
3. Read [README.md](README.md) for full documentation
4. Press F12 in browser to check for errors

---

**That's it! You're ready to simulate evolution! 🧬✨**
