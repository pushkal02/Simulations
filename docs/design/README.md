# 🏗️ Design Documentation

## System Architecture

The Evolution Simulation consists of two main parts:

1. **Backend** - Node.js simulation engine
2. **Frontend** - React dashboard

## Backend Architecture

### Core Components

```
SimulationEngine
├── PopulationManager
│   └── Manages Piro lifecycle
├── ResourceManager
│   └── Distributes resources
└── Statistics
    └── Tracks metrics
```

### Data Models

**Piro (Individual)**
- Unique ID
- Age
- Resources
- Genetics (array of attributes)
- Variant ID (based on rounded genetics)

**Genetics**
- Array of N attributes (configurable)
- Each attribute: 0.0 to 1.0
- Independent mutation per attribute

### Variant System

Variants are identified by **rounded genetic values**:

```javascript
// Example with 6 attributes, precision 2
genetics: [0.523, 0.678, 0.445, 0.234, 0.567, 0.789]
variantId: "0.52-0.68-0.45-0.23-0.57-0.79"
```

**Benefits:**
- Groups similar individuals
- Reduces diversity naturally
- Easy to understand and visualize

### Mutation System

**Independent Mutation:**
```javascript
for (let i = 0; i < numberOfAttributes; i++) {
  if (Math.random() < mutationRate) {
    // This attribute mutates
    genetics[i] += (Math.random() - 0.5) * mutationStrength * 2;
    genetics[i] = Math.max(0, Math.min(1, genetics[i]));
  }
}
```

**Key Features:**
- Each attribute mutates independently
- Low mutation rate (default 1%)
- Small mutation strength (default 5%)
- Maintains genetic stability

## Frontend Architecture

### Component Hierarchy

```
App
├── Layout
│   └── Header
│       ├── StatusIndicator
│       ├── GenerationCounter
│       └── ThemeToggle
├── ControlPanel
│   ├── SpeedSlider
│   └── ConfigModal
├── StatsGrid
│   └── StatCard (x6)
├── Charts
│   ├── PopulationChart
│   ├── VariantChart
│   ├── GeneticsChart
│   ├── GeneticBars
│   └── GeneticHeatmap
└── EventLog
```

### State Management

**SimulationContext:**
- Simulation state (running, paused)
- Statistics data
- History for charts
- Control functions

**ThemeContext:**
- Light/dark mode

**ToastContext:**
- Notifications

### Data Flow

```
Backend API → SimulationContext → Components → UI
     ↑                                          ↓
     └──────────── User Actions ────────────────┘
```

## Configuration System

### Config File Structure

```json
{
  "simulation": { /* simulation params */ },
  "genetics": { /* genetics params */ },
  "variants": { /* variant grouping */ }
}
```

### Configurable Attributes

The number of genetic attributes is configurable:

```json
{
  "genetics": {
    "numberOfAttributes": 10
  }
}
```

**Frontend Adaptation:**
- First 6 attributes: Named (replicationRate, attractiveness, etc.)
- Additional attributes: Generic names (Attribute 7, Attribute 8, etc.)

## API Design

### Endpoints

- `POST /api/start` - Start simulation
- `POST /api/pause` - Pause simulation
- `POST /api/reset` - Reset simulation
- `POST /api/speed` - Set speed
- `GET /api/stats` - Get statistics
- `GET /api/status` - Get status

### Statistics Response

```json
{
  "generation": 1234,
  "totalPopulation": 487,
  "uniqueVariants": 23,
  "birthsThisGeneration": 45,
  "deathsThisGeneration": 38,
  "averageResources": 12.5,
  "averageAge": 15.3,
  "averageGenetics": {
    "0": 0.523,
    "1": 0.678,
    ...
  },
  "populationByVariant": {
    "0.52-0.68-0.45-...": 123,
    "0.51-0.67-0.44-...": 98
  }
}
```

## Performance Considerations

### Backend
- Efficient data structures (Map, Set)
- Minimal object creation
- Optimized loops

### Frontend
- React.memo for components
- useMemo for calculations
- useCallback for handlers
- Polling only when running

## Genetic Algorithm

### Selection
- Resource-based survival
- Age-based death
- Reproduction requires resources

### Inheritance
- Child inherits parent genetics
- Independent mutation per attribute
- Rare mutations preserve groups

### Fitness
Implicit fitness based on:
- Resource acquisition
- Survival to reproduction age
- Successful reproduction

## Variant Grouping Algorithm

```javascript
function getVariantId(genetics, precision) {
  return genetics
    .map(value => value.toFixed(precision))
    .join('-');
}
```

**Example:**
```
precision: 2
genetics: [0.523, 0.678, 0.445]
variantId: "0.52-0.68-0.45"
```

## Future Enhancements

- WebSocket for real-time updates
- Configurable fitness functions
- Environmental factors
- Predator-prey dynamics
- Migration between populations

## Additional Documentation

- [Component API Reference](COMPONENTS.md)
- [Frontend Implementation](../../evolution-simulation/frontend/IMPLEMENTATION_SUMMARY.md)
