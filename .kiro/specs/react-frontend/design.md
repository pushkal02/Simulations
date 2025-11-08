# React Frontend Design

## Overview

The React frontend is a modern, single-page application (SPA) that provides real-time visualization and control of the Evolution Simulation. Built with React 18, Vite, and Tailwind CSS, it offers a responsive, performant interface for observing evolutionary dynamics.

## Architecture

### Component Hierarchy

```
App
├── SimulationProvider (Context)
│   ├── Header
│   │   ├── StatusIndicator
│   │   └── GenerationCounter
│   ├── ControlPanel
│   │   ├── StartButton
│   │   ├── PauseButton
│   │   ├── ResetButton
│   │   └── SpeedSlider
│   ├── Dashboard
│   │   ├── StatsGrid
│   │   │   └── StatCard (x6)
│   │   ├── PopulationChart
│   │   ├── VariantChart
│   │   ├── GeneticsChart
│   │   ├── GeneticBars
│   │   │   └── ProgressBar (x6)
│   │   └── EventLog
│   │       └── EventItem (multiple)
│   └── ThemeToggle
```

### State Management

**Global State (Context)**:
- `isRunning`: Boolean indicating simulation state
- `speed`: Current cycles per second (1-100)
- `statistics`: Current generation statistics
- `history`: Array of historical data points
- `events`: Array of event log entries
- `theme`: Current theme ('light' | 'dark')

**Local State**:
- Component-specific UI state (hover, focus, etc.)
- Form inputs
- Loading states

### Data Flow

```
Backend (Port 3001)
    ↓
API Service (Axios)
    ↓
Custom Hooks (useSimulation, usePolling)
    ↓
Context Provider (SimulationContext)
    ↓
Components (consume context)
    ↓
UI Updates (React re-render)
```

## Components and Interfaces

### Layout Components

#### Header
```jsx
<Header>
  <Logo />
  <StatusIndicator status={isRunning} />
  <GenerationCounter generation={statistics.generation} />
  <ThemeToggle />
</Header>
```

**Props**: None (uses context)
**State**: None
**Styling**: Fixed top bar, gradient background

#### Layout
```jsx
<Layout>
  <Header />
  <main className="container mx-auto p-4">
    {children}
  </main>
</Layout>
```

### Control Components

#### ControlPanel
```jsx
<ControlPanel>
  <Button onClick={handleStart} disabled={isRunning}>Start</Button>
  <Button onClick={handlePause} disabled={!isRunning}>Pause</Button>
  <Button onClick={handleReset}>Reset</Button>
  <SpeedSlider value={speed} onChange={handleSpeedChange} />
</ControlPanel>
```

**Props**: None (uses context)
**Events**: start, pause, reset, speedChange

#### SpeedSlider
```jsx
<SpeedSlider 
  value={speed} 
  min={1} 
  max={100} 
  onChange={handleChange}
/>
```

**Props**: 
- `value: number`
- `min: number`
- `max: number`
- `onChange: (value: number) => void`

### Statistics Components

#### StatsGrid
```jsx
<StatsGrid>
  <StatCard label="Total Population" value={stats.totalPopulation} />
  <StatCard label="Unique Variants" value={stats.uniqueVariants} />
  <StatCard label="Births" value={stats.births} color="success" />
  <StatCard label="Deaths" value={stats.deaths} color="danger" />
  <StatCard label="Avg Resources" value={stats.avgResources} />
  <StatCard label="Avg Age" value={stats.avgAge} />
</StatsGrid>
```

#### StatCard
```jsx
<StatCard 
  label="Total Population"
  value={487}
  color="primary"
  icon={<Users />}
/>
```

**Props**:
- `label: string`
- `value: number | string`
- `color?: 'primary' | 'success' | 'danger' | 'warning'`
- `icon?: ReactNode`

### Chart Components

#### PopulationChart
```jsx
<PopulationChart data={history} />
```

**Data Structure**:
```typescript
{
  generation: number,
  population: number,
  variants: number
}[]
```

**Chart Type**: Line chart with dual Y-axis
**Library**: Recharts LineChart

#### VariantChart
```jsx
<VariantChart data={variantData} />
```

**Data Structure**:
```typescript
{
  variantId: string,
  count: number
}[]
```

**Chart Type**: Bar chart
**Library**: Recharts BarChart

#### GeneticsChart
```jsx
<GeneticsChart data={history} />
```

**Data Structure**:
```typescript
{
  generation: number,
  replicationRate: number,
  attractiveness: number,
  strength: number,
  mutationChance: number,
  intelligence: number,
  resourceEfficiency: number
}[]
```

**Chart Type**: Multi-line chart
**Library**: Recharts LineChart

#### GeneticBars
```jsx
<GeneticBars genetics={statistics.averageGenetics} />
```

**Props**:
```typescript
{
  replicationRate: number,
  attractiveness: number,
  strength: number,
  mutationChance: number,
  intelligence: number,
  resourceEfficiency: number
}
```

### Event Log

#### EventLog
```jsx
<EventLog events={events} maxEvents={50} />
```

**Event Structure**:
```typescript
{
  id: string,
  timestamp: number,
  message: string,
  type: 'info' | 'success' | 'warning' | 'error'
}
```

## Data Models

### Statistics
```typescript
interface Statistics {
  generation: number;
  totalPopulation: number;
  uniqueVariants: number;
  birthsThisGeneration: number;
  deathsThisGeneration: number;
  averageResources: number;
  averageAge: number;
  averageGenetics: {
    replicationRate: number;
    attractiveness: number;
    strength: number;
    mutationChance: number;
    intelligence: number;
    resourceEfficiency: number;
  };
  populationByVariant: Record<string, number>;
}
```

### HistoryPoint
```typescript
interface HistoryPoint {
  generation: number;
  population: number;
  variants: number;
  births: number;
  deaths: number;
  genetics: {
    replicationRate: number;
    attractiveness: number;
    strength: number;
    mutationChance: number;
    intelligence: number;
    resourceEfficiency: number;
  };
}
```

## API Service

### Endpoints

```typescript
class SimulationAPI {
  async init(): Promise<{ success: boolean }>;
  async start(): Promise<{ success: boolean }>;
  async pause(): Promise<{ success: boolean }>;
  async reset(): Promise<{ success: boolean }>;
  async setSpeed(speed: number): Promise<{ success: boolean }>;
  async getStats(): Promise<Statistics>;
}
```

### Error Handling

```typescript
try {
  const stats = await api.getStats();
  updateState(stats);
} catch (error) {
  if (error.code === 'ECONNREFUSED') {
    showError('Backend server not running');
  } else {
    showError('Failed to fetch statistics');
  }
}
```

## Custom Hooks

### useSimulation
```typescript
function useSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [speed, setSpeed] = useState(10);
  
  const start = async () => { /* ... */ };
  const pause = async () => { /* ... */ };
  const reset = async () => { /* ... */ };
  const updateSpeed = async (newSpeed) => { /* ... */ };
  
  return { isRunning, statistics, speed, start, pause, reset, updateSpeed };
}
```

### usePolling
```typescript
function usePolling(callback, interval, enabled) {
  useEffect(() => {
    if (!enabled) return;
    
    const id = setInterval(callback, interval);
    return () => clearInterval(id);
  }, [callback, interval, enabled]);
}
```

### useChartData
```typescript
function useChartData(statistics, maxPoints = 100) {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    if (statistics) {
      setHistory(prev => {
        const newHistory = [...prev, transformStats(statistics)];
        return newHistory.slice(-maxPoints);
      });
    }
  }, [statistics, maxPoints]);
  
  return history;
}
```

## Styling Strategy

### Tailwind CSS Classes

**Layout**:
- Container: `max-w-7xl mx-auto p-4`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
- Card: `bg-white rounded-xl shadow-lg p-6`

**Colors**:
- Primary: `bg-primary-600 text-white`
- Success: `bg-green-600 text-white`
- Danger: `bg-red-600 text-white`
- Warning: `bg-yellow-600 text-white`

**Responsive Breakpoints**:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Performance Optimizations

### Memoization
```typescript
const MemoizedChart = React.memo(PopulationChart, (prev, next) => {
  return prev.data.length === next.data.length;
});
```

### Debouncing
```typescript
const debouncedSpeedChange = useMemo(
  () => debounce((value) => updateSpeed(value), 300),
  []
);
```

### Virtual Scrolling
```typescript
// For event log with many items
<VirtualList
  items={events}
  itemHeight={40}
  height={400}
  renderItem={(event) => <EventItem event={event} />}
/>
```

## Error Handling

### Error Boundary
```jsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

### Toast Notifications
```typescript
function showToast(message, type) {
  toast[type](message, {
    position: 'top-right',
    autoClose: 3000,
  });
}
```

## Testing Strategy

### Component Tests
- Render tests for all components
- Interaction tests for controls
- State update tests

### Integration Tests
- API service tests with mock responses
- Context provider tests
- Hook tests

### E2E Tests (Deferred)
- Full user flows
- Cross-browser testing
- Performance testing

## Build Configuration

### Vite Config
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['recharts']
        }
      }
    }
  }
});
```

## Deployment

### Production Build
```bash
npm run build
```

### Static File Serving
Serve `dist/` folder with any static file server or integrate with backend.

### Environment Variables
```
VITE_API_URL=http://localhost:3001
```
