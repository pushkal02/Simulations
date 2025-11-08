# Evolution Simulation

A JavaScript-based evolution simulation system that models natural selection and genetic inheritance among beings called "Piros". Watch as populations evolve over generations through reproduction, mutation, and survival pressures.

## Features

- **Genetic Inheritance**: Piros pass traits to offspring with variation and mutation
- **Natural Selection**: Survival based on genetic properties and resource management
- **Property Interactions**: Genetic traits influence each other dynamically
- **Real-time Statistics**: Track population metrics, variants, and evolutionary trends
- **Configurable Parameters**: Customize every aspect of the simulation
- **Interactive Controls**: Pause, resume, and adjust speed during runtime
- **Robust Error Handling**: Graceful handling of edge cases and invalid states

## Quick Start

### Prerequisites

- Node.js 14.0.0 or higher

### Installation

```bash
# Clone or download the project
cd evolution-simulation

# No dependencies to install - uses Node.js built-ins only!
```

### Running the Simulation

```bash
# Run with default configuration
node src/index.js

# Run with custom configuration
node src/index.js --config config/custom.json

# Using npm scripts
npm start
```

### Interactive Controls

Once the simulation is running, use these commands:

- **`p`** - Pause/Resume the simulation
- **`s <number>`** - Set speed (1-1000 cycles per second)
  - Example: `s 50` sets speed to 50 cycles/second
- **`i`** - Show current statistics (population, variants, genetics)
- **`h`** - Show history of last 10 generations
- **`q`** - Quit the simulation

## Understanding the Simulation

### What are Piros?

Piros are simulated beings with genetic properties that determine their survival and reproduction:

- **Replication Rate**: How quickly they can reproduce
- **Attractiveness**: Influences reproduction success
- **Strength**: Affects survival chances
- **Intelligence**: Contributes to survival
- **Mutation Chance**: Likelihood of genetic changes in offspring
- **Resource Efficiency**: How well they gather resources

### How Evolution Works

1. **Resource Gathering**: Each Piro collects resources based on efficiency
2. **Resource Consumption**: Piros consume resources to survive
3. **Reproduction**: Piros with sufficient resources reproduce
4. **Genetic Inheritance**: Offspring inherit parent genetics with variation
5. **Mutation**: Random genetic changes occur based on mutation chance
6. **Survival Check**: Piros with low survival scores may die
7. **Natural Death**: Piros die when reaching maximum age

Over generations, successful traits become more common while unsuccessful ones fade away.

## Configuration

### Default Configuration

The simulation comes with a balanced default configuration in `config/default.json`. You can create custom configurations by copying and modifying this file.

### Configuration Structure

```json
{
  "simulation": {
    "initialPopulation": 100,
    "cyclesPerSecond": 10,
    "maxPopulation": 1000,
    "initialMode": "randomized"
  },
  "genetics": {
    "properties": {
      "replicationRate": { "min": 0, "max": 1, "default": 0.5 },
      "attractiveness": { "min": 0, "max": 1, "default": 0.5 },
      "strength": { "min": 0, "max": 1, "default": 0.5 },
      "mutationChance": { "min": 0, "max": 1, "default": 0.1 },
      "intelligence": { "min": 0, "max": 1, "default": 0.5 },
      "resourceEfficiency": { "min": 0, "max": 1, "default": 0.5 }
    },
    "mutationStrength": 0.1,
    "inheritanceVariation": 0.05
  },
  "resources": {
    "initialAmount": 100,
    "gatherRate": 10,
    "consumptionRate": 5,
    "reproductionCost": 50,
    "starvationThreshold": 0
  },
  "lifespan": {
    "baseLifespan": 100,
    "lifespanVariation": 20
  },
  "reproduction": {
    "spawnRandomness": 0.2,
    "attractivenessWeight": 0.7
  },
  "survival": {
    "threshold": 0.3,
    "strengthWeight": 0.6,
    "intelligenceWeight": 0.4,
    "randomFactor": 0.1
  },
  "interactions": {
    "attractivenessFromStrength": 0.4,
    "attractivenessFromIntelligence": 0.3,
    "replicationPenaltyThreshold": 0.3,
    "mutationBonusThreshold": 0.7
  },
  "mutation": {
    "perPropertyProbability": 0.15,
    "mutationStrength": 0.1
  }
}
```

### Key Parameters to Experiment With

- **`initialPopulation`**: Starting number of Piros (1-10000)
- **`cyclesPerSecond`**: Simulation speed (1-1000)
- **`mutationStrength`**: How much mutations change properties (0-1)
- **`consumptionRate`**: Resource drain per generation (affects difficulty)
- **`gatherRate`**: Resource gain per generation (affects abundance)
- **`reproductionCost`**: Resources needed to reproduce (affects population growth)

## Example Usage Scenarios

### Fast Evolution Experiment

```bash
# Create config/fast-evolution.json with:
# - High mutation rate (0.3)
# - High mutation strength (0.2)
# - Fast cycles (100/second)

node src/index.js --config config/fast-evolution.json
```

### Harsh Environment

```bash
# Create config/harsh.json with:
# - High consumption rate (15)
# - Low gather rate (5)
# - High reproduction cost (80)

node src/index.js --config config/harsh.json
```

### Stable Population

```bash
# Create config/stable.json with:
# - Low mutation rate (0.05)
# - Balanced resources
# - Moderate population cap (500)

node src/index.js --config config/stable.json
```

## Understanding Statistics

When you press `i` during simulation, you'll see:

```
=== Current Statistics ===
Generation: 150
Total Population: 487
Unique Variants: 234
Births: 23
Deaths: 18
Average Resources: 67.45
Average Age: 34.21

Average Genetics:
  Replication Rate: 0.623
  Attractiveness: 0.712
  Strength: 0.589
  Mutation Chance: 0.134
  Intelligence: 0.556
  Resource Efficiency: 0.678

Top Variants:
  a3f2b1c4: 45 (9.2%)
  d7e8f9a0: 38 (7.8%)
  ...
```

### What to Look For

- **Unique Variants**: Decreasing = convergent evolution, Increasing = diversification
- **Average Genetics**: Shows which traits are being selected for
- **Top Variants**: Dominant genetic lineages
- **Births vs Deaths**: Population growth or decline

## Testing

### Run Full Test Suite

```bash
node test-engine.js
```

Tests cover:
- Configuration validation
- Error handling
- Runtime behavior
- Statistics tracking
- Variant emergence

### Quick Validation

```bash
node quick-test.js
```

Runs a fast sanity check of core functionality.

## Troubleshooting

### Population Goes Extinct

**Cause**: Resources too scarce or survival too difficult

**Solutions**:
- Increase `gatherRate`
- Decrease `consumptionRate`
- Lower `reproductionCost`
- Increase `initialPopulation`

### No Genetic Diversity

**Cause**: Mutation rate too low or strong selection pressure

**Solutions**:
- Increase `mutationChance` default value
- Increase `mutationStrength`
- Increase `perPropertyProbability`
- Lower survival threshold

### Simulation Too Slow/Fast

**Cause**: Speed setting not optimal

**Solutions**:
- Press `s 10` for slower (10 cycles/second)
- Press `s 100` for faster (100 cycles/second)
- Adjust `cyclesPerSecond` in config

### Configuration Errors

The simulation validates all configuration and provides clear error messages:

```
Configuration validation error: Invalid initialPopulation: must be a positive integer, got -10
```

See `ERROR_HANDLING.md` for complete error documentation.

## Project Structure

```
evolution-simulation/
├── src/
│   ├── index.js                 # CLI entry point
│   ├── core/
│   │   ├── SimulationEngine.js  # Main simulation orchestrator
│   │   ├── Piro.js              # Individual being entity
│   │   └── Population.js        # Population management
│   ├── genetics/
│   │   ├── GeneticProperties.js # Property definitions and validation
│   │   ├── PropertyInteractions.js # Trait interactions
│   │   ├── Reproduction.js      # Reproduction logic
│   │   ├── Mutation.js          # Mutation system
│   │   └── VariantTracker.js    # Variant tracking
│   ├── survival/
│   │   └── SurvivalCalculator.js # Survival and death logic
│   └── config/
│       └── ConfigLoader.js      # Configuration management
├── config/
│   └── default.json             # Default configuration
├── test-engine.js               # Comprehensive tests
├── quick-test.js                # Quick validation
├── README.md                    # This file
├── ERROR_HANDLING.md            # Error handling documentation
└── IMPLEMENTATION_COMPLETE.md   # Implementation details
```

## Advanced Usage

### Programmatic Usage

```javascript
import { SimulationEngine } from './src/core/SimulationEngine.js';
import { loadConfig } from './src/config/ConfigLoader.js';

// Load configuration
const config = loadConfig('./config/default.json');

// Create engine
const engine = new SimulationEngine(config);

// Run generations
for (let i = 0; i < 100; i++) {
  engine.processGeneration();
  
  // Access statistics
  const stats = engine.getStatistics();
  console.log(`Gen ${stats.generation}: Pop ${stats.totalPopulation}`);
}

// Get history
const history = engine.getHistory();
```

### Custom Event Handling

```javascript
// Monitor extinction
engine.processGeneration();
if (engine.hasExtinctionOccurred) {
  console.log('Population went extinct!');
}

// Track specific variants
const stats = engine.getStatistics();
const dominantVariant = Object.entries(stats.populationByVariant)
  .sort((a, b) => b[1] - a[1])[0];
console.log(`Dominant variant: ${dominantVariant[0]}`);
```

## Performance

- **Typical Performance**: 10-100 cycles/second with 100-1000 Piros
- **Memory Usage**: ~1-10 MB depending on population size
- **CPU Usage**: Single-threaded, scales with population size

## Contributing

This is a complete, self-contained simulation. To extend it:

1. Add new genetic properties in `GeneticProperties.js`
2. Implement new interactions in `PropertyInteractions.js`
3. Add survival factors in `SurvivalCalculator.js`
4. Create new reproduction rules in `Reproduction.js`

## License

MIT License - See project root for details

## Support

For issues or questions:
1. Check `ERROR_HANDLING.md` for error documentation
2. Review `IMPLEMENTATION_COMPLETE.md` for implementation details
3. Run tests to verify installation: `node test-engine.js`

## Acknowledgments

Built with Node.js using only built-in modules for maximum portability and minimal dependencies.

---

**Happy Evolving!** 🧬
