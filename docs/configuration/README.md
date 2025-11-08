# ⚙️ Configuration Guide

## Configuration File

Edit: `evolution-simulation/config/default.json`

## Basic Configuration

```json
{
  "simulation": {
    "initialPopulation": 100,
    "resourcesPerGeneration": 1000,
    "cyclesPerSecond": 10,
    "maxAge": 100,
    "logGenerations": false
  },
  "genetics": {
    "numberOfAttributes": 6,
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
| `initialPopulation` | Starting number of Piros | 100 | 10-10000 |
| `resourcesPerGeneration` | Resources available each cycle | 1000 | 100-100000 |
| `cyclesPerSecond` | Simulation speed | 10 | 1-1000 |
| `maxAge` | Maximum age before death | 100 | 10-1000 |
| `logGenerations` | Console logging | false | true/false |

### Genetics Parameters

| Parameter | Description | Default | Range |
|-----------|-------------|---------|-------|
| `numberOfAttributes` | Number of genetic traits | 6 | 1-20 |
| `mutationRate` | Chance of mutation (per attribute) | 0.01 | 0.0-1.0 |
| `mutationStrength` | How much traits change | 0.05 | 0.0-1.0 |
| `independentMutation` | Each attribute mutates independently | true | true/false |

### Variant Parameters

| Parameter | Description | Default | Range |
|-----------|-------------|---------|-------|
| `groupingPrecision` | Decimal places for grouping | 2 | 0-4 |

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

### High Diversity (Default)
```json
{
  "genetics": {
    "numberOfAttributes": 6,
    "mutationRate": 0.1,
    "mutationStrength": 0.05
  },
  "variants": {
    "groupingPrecision": 2
  }
}
```

### Low Diversity (Stable Groups)
```json
{
  "genetics": {
    "numberOfAttributes": 6,
    "mutationRate": 0.001,
    "mutationStrength": 0.02
  },
  "variants": {
    "groupingPrecision": 1
  }
}
```

### Many Attributes
```json
{
  "genetics": {
    "numberOfAttributes": 12,
    "mutationRate": 0.005,
    "mutationStrength": 0.03
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
