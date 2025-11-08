# Evolution Simulation - React Frontend

Modern React-based dashboard for the Evolution Simulation.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Backend

Make sure the backend server is running on port 3001:

```bash
# From the parent directory
cd ..
npm run web
```

## Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: React charting library
- **Lucide React**: Icon library
- **Axios**: HTTP client

## Project Structure

```
src/
├── components/
│   ├── layout/       # Layout components
│   ├── controls/     # Control panel components
│   ├── stats/        # Statistics display components
│   ├── charts/       # Chart components
│   ├── events/       # Event log components
│   └── common/       # Reusable UI components
├── hooks/            # Custom React hooks
├── context/          # React context providers
├── services/         # API service layer
├── utils/            # Utility functions
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## Development

The app uses Vite's proxy to forward API calls to the backend server running on port 3001.

All `/api/*` requests are automatically proxied to `http://localhost:3001`.
