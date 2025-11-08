# Evolution Simulation - React Frontend

A modern, real-time dashboard for visualizing and controlling the Evolution Simulation.

## Features

- **Real-time Visualization**: Live charts and statistics updated every 100ms
- **Interactive Controls**: Start, pause, reset simulation with adjustable speed
- **Comprehensive Charts**:
  - Population and variant trends over time
  - Top 10 genetic variants distribution
  - Genetic traits evolution
  - Genetic properties progress bars
  - Genetic properties heatmap
- **Statistics Dashboard**: Key metrics at a glance
- **Event Log**: Track simulation events in real-time
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Performance Optimized**: Memoization and efficient re-renders

## Tech Stack

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Data visualization
- **Axios**: HTTP client
- **Lucide React**: Icon library

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend server running on port 3001

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Layout, Theme toggle
│   ├── controls/        # Control panel, Speed slider
│   ├── stats/           # Statistics cards and grid
│   ├── charts/          # All chart components
│   ├── events/          # Event log components
│   ├── config/          # Configuration modal
│   └── common/          # Shared components (Loading, Toast, Error)
├── context/             # React Context providers
│   ├── SimulationContext.jsx
│   └── ThemeContext.jsx
├── hooks/               # Custom React hooks
│   └── usePolling.js
├── services/            # API service layer
│   └── api.js
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## API Integration

The frontend connects to the backend API at `http://localhost:3001` by default. You can change this by setting the `VITE_API_URL` environment variable.

### API Endpoints Used

- `POST /init` - Initialize simulation
- `POST /start` - Start simulation
- `POST /pause` - Pause simulation
- `POST /reset` - Reset simulation
- `POST /speed` - Set simulation speed
- `GET /stats` - Get current statistics
- `GET /status` - Get simulation status

## Components

### Layout Components

- **Header**: Top navigation with status, generation counter, and theme toggle
- **Layout**: Main layout wrapper
- **StatusIndicator**: Shows running/paused state
- **GenerationCounter**: Displays current generation
- **ThemeToggle**: Switch between light/dark mode

### Control Components

- **ControlPanel**: Main control interface with start/pause/reset buttons
- **SpeedSlider**: Adjust simulation speed (1-100 cycles/sec)
- **ConfigModal**: Configure simulation parameters

### Statistics Components

- **StatsGrid**: Grid of 6 key statistics
- **StatCard**: Individual statistic card

### Chart Components

- **PopulationChart**: Line chart showing population and variants over time
- **VariantChart**: Bar chart of top 10 genetic variants
- **GeneticsChart**: Multi-line chart of genetic traits evolution
- **GeneticBars**: Progress bars for average genetic properties
- **GeneticHeatmap**: Heatmap visualization of genetic properties

### Event Components

- **EventLog**: Scrollable list of simulation events
- **EventItem**: Individual event entry

### Common Components

- **LoadingSpinner**: Loading indicator
- **ChartSkeleton**: Skeleton loader for charts
- **StatsSkeleton**: Skeleton loader for statistics
- **ErrorBoundary**: Error boundary for graceful error handling
- **Toast**: Toast notification component
- **ToastContainer**: Toast notification provider

## State Management

The app uses React Context for global state management:

- **SimulationContext**: Manages simulation state, controls, and data
- **ThemeContext**: Manages theme (light/dark mode)
- **ToastContext**: Manages toast notifications

## Custom Hooks

- **useSimulation**: Access simulation state and controls
- **usePolling**: Poll data at regular intervals
- **useTheme**: Access and toggle theme
- **useToast**: Show toast notifications

## Styling

The app uses Tailwind CSS with custom components defined in `index.css`:

- `.card` - Card container
- `.btn` - Base button
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.btn-danger` - Danger/destructive action button

Dark mode is implemented using Tailwind's `dark:` variant and is controlled by the `ThemeContext`.

## Performance Optimizations

- **React.memo**: All chart and stat components are memoized
- **useMemo**: Expensive calculations are memoized
- **useCallback**: Event handlers are memoized
- **Efficient polling**: Only polls when simulation is running
- **Optimized re-renders**: Context is split to minimize re-renders

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:3001
```

## Troubleshooting

### Backend Connection Issues

If you see connection errors:
1. Ensure the backend server is running on port 3001
2. Check the `VITE_API_URL` environment variable
3. Check browser console for CORS errors

### Performance Issues

If the app is slow:
1. Reduce the polling interval in `App.jsx`
2. Reduce the simulation speed
3. Clear browser cache and reload

## License

MIT
