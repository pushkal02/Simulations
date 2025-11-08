# Component Documentation

## Layout Components

### Header

Main header component with branding, status, and controls.

**Props**: None (uses context)

**Features**:
- Displays app logo and title
- Shows current generation
- Shows simulation status (running/paused)
- Theme toggle button
- Responsive design

**Usage**:
```jsx
<Header />
```

### Layout

Main layout wrapper component.

**Props**:
- `children` (ReactNode) - Content to render

**Usage**:
```jsx
<Layout>
  <YourContent />
</Layout>
```

### StatusIndicator

Shows whether simulation is running or paused.

**Props**:
- `isRunning` (boolean) - Simulation running state

**Features**:
- Animated pulse effect when running
- Color-coded (green = running, gray = paused)

**Usage**:
```jsx
<StatusIndicator isRunning={true} />
```

### GenerationCounter

Displays current generation number.

**Props**:
- `generation` (number) - Current generation

**Features**:
- Formatted with thousands separators
- Responsive text sizing

**Usage**:
```jsx
<GenerationCounter generation={1234} />
```

### ThemeToggle

Button to toggle between light and dark themes.

**Props**: None (uses ThemeContext)

**Usage**:
```jsx
<ThemeToggle />
```

## Control Components

### ControlPanel

Main control interface for the simulation.

**Props**: None (uses SimulationContext)

**Features**:
- Start/Pause/Reset buttons
- Speed slider
- Configuration button
- Responsive layout

**Usage**:
```jsx
<ControlPanel />
```

### SpeedSlider

Slider to adjust simulation speed.

**Props**:
- `value` (number) - Current speed
- `onChange` (function) - Callback when speed changes
- `min` (number, optional) - Minimum speed (default: 1)
- `max` (number, optional) - Maximum speed (default: 100)

**Usage**:
```jsx
<SpeedSlider 
  value={10} 
  onChange={(speed) => console.log(speed)}
  min={1}
  max={100}
/>
```

### ConfigModal

Modal for configuring simulation parameters.

**Props**:
- `isOpen` (boolean) - Whether modal is open
- `onClose` (function) - Callback to close modal

**Features**:
- Form validation
- Configurable parameters:
  - Initial population
  - Resources per generation
  - Max age
  - Mutation rate

**Usage**:
```jsx
<ConfigModal 
  isOpen={showConfig} 
  onClose={() => setShowConfig(false)} 
/>
```

## Statistics Components

### StatsGrid

Grid layout of statistics cards.

**Props**: None (uses SimulationContext)

**Features**:
- 6 key statistics
- Responsive grid (1-3 columns)
- Color-coded cards
- Icons for each stat

**Usage**:
```jsx
<StatsGrid />
```

### StatCard

Individual statistic card.

**Props**:
- `label` (string) - Stat label
- `value` (number|string) - Stat value
- `color` (string, optional) - Color theme (primary, success, danger, warning, info)
- `icon` (ReactNode, optional) - Icon to display

**Usage**:
```jsx
<StatCard 
  label="Total Population"
  value={487}
  color="primary"
  icon={<Users size={32} />}
/>
```

## Chart Components

### PopulationChart

Line chart showing population and variants over time.

**Props**:
- `data` (array) - Array of history points with `generation`, `population`, `variants`

**Features**:
- Dual Y-axis
- Responsive sizing
- Tooltips
- Legend

**Usage**:
```jsx
<PopulationChart data={history} />
```

### VariantChart

Bar chart showing top 10 genetic variants.

**Props**:
- `data` (array) - Array of variants with `variantId`, `count`

**Features**:
- Color-coded bars
- Responsive sizing
- Animated transitions
- Rotated labels

**Usage**:
```jsx
<VariantChart data={variantData} />
```

### GeneticsChart

Multi-line chart showing genetic traits over time.

**Props**:
- `data` (array) - Array of history points with genetic properties

**Features**:
- 6 genetic traits
- Color-coded lines
- Legend with toggle
- Responsive sizing

**Usage**:
```jsx
<GeneticsChart data={history} />
```

### GeneticBars

Progress bars for average genetic properties.

**Props**:
- `genetics` (object) - Object with genetic properties (0-1 values)

**Features**:
- 6 progress bars
- Color-coded
- Animated transitions
- Value labels

**Usage**:
```jsx
<GeneticBars genetics={statistics.averageGenetics} />
```

### GeneticHeatmap

Heatmap visualization of genetic properties.

**Props**:
- `genetics` (object) - Object with genetic properties (0-1 values)

**Features**:
- Color-coded cells
- Percentage display
- Hover effects
- Responsive grid

**Usage**:
```jsx
<GeneticHeatmap genetics={statistics.averageGenetics} />
```

### ProgressBar

Individual progress bar component.

**Props**:
- `label` (string) - Bar label
- `value` (number) - Current value
- `color` (string, optional) - Color theme
- `max` (number, optional) - Maximum value (default: 1)

**Usage**:
```jsx
<ProgressBar 
  label="Strength"
  value={0.75}
  color="danger"
  max={1}
/>
```

## Event Components

### EventLog

Scrollable list of simulation events.

**Props**:
- `events` (array) - Array of event objects
- `maxEvents` (number, optional) - Maximum events to display (default: 50)

**Features**:
- Auto-scroll to latest
- Color-coded by type
- Timestamps
- Empty state

**Usage**:
```jsx
<EventLog events={events} maxEvents={50} />
```

### EventItem

Individual event entry.

**Props**:
- `event` (object) - Event object with `id`, `timestamp`, `message`, `type`

**Event Types**:
- `info` - Blue
- `success` - Green
- `warning` - Yellow
- `error` - Red

**Usage**:
```jsx
<EventItem event={{
  id: '123',
  timestamp: Date.now(),
  message: 'Simulation started',
  type: 'success'
}} />
```

## Common Components

### LoadingSpinner

Loading indicator.

**Props**:
- `size` (string, optional) - Size (sm, md, lg) (default: md)

**Usage**:
```jsx
<LoadingSpinner size="lg" />
```

### ChartSkeleton

Skeleton loader for charts.

**Props**: None

**Usage**:
```jsx
<ChartSkeleton />
```

### StatsSkeleton

Skeleton loader for statistics grid.

**Props**: None

**Usage**:
```jsx
<StatsSkeleton />
```

### ErrorBoundary

Error boundary component for graceful error handling.

**Props**:
- `children` (ReactNode) - Components to wrap

**Features**:
- Catches React errors
- Shows error UI
- Reload button

**Usage**:
```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Toast

Toast notification component.

**Props**:
- `message` (string) - Notification message
- `type` (string, optional) - Type (info, success, warning, error)
- `onClose` (function) - Callback to close toast
- `duration` (number, optional) - Auto-close duration in ms (default: 3000)

**Usage**:
```jsx
<Toast 
  message="Simulation started"
  type="success"
  onClose={() => {}}
  duration={3000}
/>
```

### ToastContainer

Toast notification provider and container.

**Props**:
- `children` (ReactNode) - App content

**Usage**:
```jsx
<ToastProvider>
  <App />
</ToastProvider>
```

## Context Providers

### SimulationProvider

Provides simulation state and controls.

**Value**:
- `isRunning` (boolean)
- `speed` (number)
- `statistics` (object)
- `history` (array)
- `events` (array)
- `error` (string)
- `start` (function)
- `pause` (function)
- `reset` (function)
- `updateSpeed` (function)
- `fetchStats` (function)
- `addEvent` (function)

**Usage**:
```jsx
<SimulationProvider>
  <App />
</SimulationProvider>
```

### ThemeProvider

Provides theme state and controls.

**Value**:
- `theme` (string) - 'light' or 'dark'
- `toggleTheme` (function)

**Usage**:
```jsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

## Custom Hooks

### useSimulation

Access simulation state and controls.

**Returns**: SimulationContext value

**Usage**:
```jsx
const { isRunning, statistics, start, pause } = useSimulation();
```

### usePolling

Poll a function at regular intervals.

**Parameters**:
- `callback` (function) - Function to call
- `interval` (number) - Interval in ms
- `enabled` (boolean) - Whether polling is enabled

**Usage**:
```jsx
usePolling(fetchStats, 100, isRunning);
```

### useTheme

Access theme state and controls.

**Returns**: ThemeContext value

**Usage**:
```jsx
const { theme, toggleTheme } = useTheme();
```

### useToast

Show toast notifications.

**Returns**: 
- `addToast` (function) - Show a toast

**Usage**:
```jsx
const { addToast } = useToast();
addToast('Success!', 'success', 3000);
```
