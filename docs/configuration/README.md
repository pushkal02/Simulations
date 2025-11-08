# ⚙️ Configuration Guide

## Configuration File

Edit: `evolution-simulation/config/default.json`

## Basic Configuration

```json
{
  "simulation": {
    "initialPopulation": 100,
    "cyclesPerSecond": 10,
    "maxPopulation": 1000,
    "initialMode": "randomized"
  },
  "resources": {
    "maxTotalResources": 1000,
    "replenishmentRate": 1000,
    "defaultConsumptionRate": 3,
    "consumptionCanMutate": true,
    "utilizationCanMutate": true,
    "ageConsumptionConstant": 300
  },
  "genetics": {
    "numberOfAttributes": 8,
    "mutationRate": 0.01,
    "mutationStrength": 0.05,
    "independentMutation": true
  },
  "variants": {
    "groupingPrecision": 2
  }
}
```

## Parameters Explained

### Simulation Parameters

| Parameter | Description | Default | Range |
|-----------|-------------|---------|-------|
| `initialPopulation` | Starting number of Piros (can be 1) | 100 | 1-10000 |
| `cyclesPerSecond` | Simulation speed | 10 | 1-1000 |
| `maxPopulation` | Maximum population cap | 1000 | 100-100000 |
| `initialMode` | "randomized" or "fixed" genetics | "randomized" | - |

### Resource Parameters

| Parameter | Description | Default | Range |
|-----------|-------------|---------|-------|
| `maxTotalResources` | Maximum resources in system | 1000 | 100-100000 |
| `replenishmentRate` | Resources added per generation | 1000 | 0-10000 |
| `defaultConsumptionRate` | Default consumption per Piro | 3 | 1-10 |
| `consumptionCanMutate` | Allow consumption to mutate | true | true/false |
| `utilizationCanMutate` | Allow utilization to mutate | true | true/false |
| `ageConsumptionConstant` | Age × Consumption = Constant | 300 | 100-1000 |

### Genetics Parameters

| Parameter | Description | Default | Range |
|-----------|-------------|---------|-------|
| `numberOfAttributes` | Number of genetic traits | 8 | 1-20 |
| `mutationRate` | Chance of mutation (per attribute) | 0.01 | 0.0-1.0 |
| `mutationStrength` | How much traits change | 0.05 | 0.0-1.0 |
| `independentMutation` | Each attribute mutates independently | true | true/false |

**Default Attributes:**
1. `replicationRate` (0-1): Reproduction speed
2. `attractiveness` (0-1): Mating appeal
3. `strength` (0-1): Base strength (boosted by consumption)
4. `mutationChance` (0-1): Mutation probability
5. `intelligence` (0-1): Problem solving
6. `resourceEfficiency` (0-1): Resource gathering
7. `consumptionRate` (1-10): Resources consumed per generation
8. `utilizationFactor` (0.1-1.0): Fraction of absorbed resources actually used

### Variant Parameters

| Parameter | Description | Default | Range |
|-----------|-------------|---------|-------|
| `groupingPrecision` | Decimal places for grouping | 2 | 0-4 |

## Resource System

### How It Works

**Global Resource Pool:**
- Total resources are capped at `maxTotalResources` (default: 1000)
- Each generation, `replenishmentRate` resources are added (up to the cap)
- Resources are distributed to Piros based on their effective strength
- All absorbed resources are removed from the pool

**Consumption & Age:**
- Each Piro consumes `consumptionRate` resources per generation
- Maximum age is calculated as: `ageConsumptionConstant / consumptionRate`
- Lower consumption = longer life, but weaker strength
- Higher consumption = shorter life, but stronger

**Example:**
```
ageConsumptionConstant: 300
consumptionRate: 3  → maxAge = 100 generations
consumptionRate: 6  → maxAge = 50 generations
consumptionRate: 1  → maxAge = 300 generations
```

**Utilization Factor:**
- When a Piro absorbs resources, only `utilizationFactor` is actually used
- The rest is wasted (removed from system but not utilized)
- Example: Absorb 10 resources with 0.5 utilization = 5 resources gained, 10 removed from pool

**Strength Calculation:**
- Effective strength = base strength × (0.5 + 0.5 × consumptionRate/10)
- Higher consumption rate = higher effective strength
- Strength determines resource distribution share

## Mutation System

### How It Works

With `independentMutation: true`:
- Each genetic attribute has its own mutation chance
- If an attribute mutates, it changes by ±`mutationStrength`
- Other attributes remain unchanged

**Example:**
```
mutationRate: 0.01 (1% chance per attribute)
mutationStrength: 0.05 (±5% change)

Parent: [0.50, 0.60, 0.70, 0.80, 0.90, 0.40]
Child:  [0.50, 0.65, 0.70, 0.80, 0.90, 0.40]
         ↑     ↑ mutated
```

### Making Mutations Rare

For very rare mutations:
```json
{
  "genetics": {
    "mutationRate": 0.001,
    "mutationStrength": 0.02
  }
}
```

This gives:
- 0.1% chance per attribute per generation
- Small changes when mutations occur

## Variant Grouping

### How Variants Are Identified

Variants are grouped by **rounded attribute values**, not hash.

**Example with `groupingPrecision: 2`:**

```
Piro A: [0.523, 0.678, 0.445, 0.234, 0.567, 0.789]
Piro B: [0.521, 0.679, 0.446, 0.235, 0.568, 0.788]

Both round to: [0.52, 0.68, 0.45, 0.23, 0.57, 0.79]
→ Same variant!
```

### Adjusting Grouping

- **Higher precision** (3-4): More variants, smaller groups
- **Lower precision** (0-1): Fewer variants, larger groups

```json
{
  "variants": {
    "groupingPrecision": 1
  }
}
```

## Number of Attributes

You can configure how many genetic attributes each Piro has:

```json
{
  "genetics": {
    "numberOfAttributes": 10
  }
}
```

**Note:** The frontend currently displays 6 attributes by name. Additional attributes will be shown as "Attribute 7", "Attribute 8", etc.

## Example Configurations

### Start with 1 Piro
```json
{
  "simulation": {
    "initialPopulation": 1
  }
}
```

### Resource-Scarce Environment
```json
{
  "resources": {
    "maxTotalResources": 500,
    "replenishmentRate": 300
  }
}
```

### Long-Lived, Efficient Piros
```json
{
  "resources": {
    "ageConsumptionConstant": 600,
    "defaultConsumptionRate": 2
  },
  "genetics": {
    "properties": {
      "consumptionRate": {
        "min": 1,
        "max": 5,
        "default": 2
      },
      "utilizationFactor": {
        "min": 0.5,
        "max": 1.0,
        "default": 0.8
      }
    }
  }
}
```

### Fast-Paced, High Consumption
```json
{
  "resources": {
    "ageConsumptionConstant": 200,
    "defaultConsumptionRate": 5,
    "maxTotalResources": 2000,
    "replenishmentRate": 2000
  },
  "genetics": {
    "properties": {
      "consumptionRate": {
        "min": 3,
        "max": 10,
        "default": 5
      }
    }
  }
}
```

### Low Diversity (Stable Groups)
```json
{
  "genetics": {
    "numberOfAttributes": 8,
    "mutationRate": 0.001,
    "mutationStrength": 0.02
  },
  "variants": {
    "groupingPrecision": 1
  }
}
```

## Applying Changes

1. Edit `evolution-simulation/config/default.json`
2. Restart the server:
   ```bash
   # Stop with Ctrl+C
   npm run web
   ```
3. Click **Reset** in the dashboard
4. Click **Start** to begin with new settings

## Configuration via Dashboard

You can also adjust some parameters in the dashboard:
1. Click the **⚙️ Settings** icon
2. Modify parameters
3. Click **Apply**

**Note:** Dashboard changes are temporary. Edit the config file for permanent changes.

## Advanced Configuration

See [Design Documentation](../design/README.md) for details on how the simulation engine uses these parameters.
