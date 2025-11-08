# Error Handling Documentation

This document describes the comprehensive error handling implemented in the Evolution Simulation.

## Configuration Errors

### Invalid Bounds
- **Detection**: Configuration validation checks that min <= max for all genetic properties
- **Handling**: Throws descriptive error during config validation
- **Example**: `Genetic property strength has invalid bounds: min (0.8) > max (0.2)`

### Missing Files
- **Detection**: File system checks when loading configuration
- **Handling**: Throws error with file path, falls back to defaults in CLI
- **Example**: `Configuration file not found: config/custom.json`

### Malformed JSON
- **Detection**: JSON parsing errors during config load
- **Handling**: Throws error with file path and parse error details
- **Example**: `Malformed JSON in configuration file config/test.json: Unexpected token`

### Invalid Parameter Values
- **Detection**: Range validation for numeric parameters
- **Handling**: Throws descriptive error with expected range
- **Examples**:
  - `Invalid initialPopulation: must be a positive integer, got -10`
  - `Invalid cyclesPerSecond: must be between 1 and 1000, got 5000`
  - `Invalid survival threshold: must be between 0 and 1, got 1.5`

## Runtime Errors

### Population Extinction
- **Detection**: Population size reaches zero during generation processing
- **Handling**: 
  - Logs extinction event to console
  - Sets `hasExtinctionOccurred` flag
  - Pauses simulation automatically
  - Prevents further processing
- **Recovery**: User can restart with new configuration

### Property Overflow
- **Detection**: Genetic properties exceed valid range [0, 1] during interactions/mutations
- **Handling**:
  - Automatically clamps values to valid range
  - Logs warning with property name and clamped value
  - Continues simulation with corrected values
- **Example**: `Property attractiveness value 1.5 clamped to 1`

### Invalid Piro State
- **Detection**: NaN, Infinity, or invalid values in Piro properties
- **Handling**:
  - Validates Piro state after critical operations
  - Marks corrupted Piros as dead for safe removal
  - Logs error with Piro ID and issue
  - Continues simulation with remaining population
- **Example**: `Error applying interactions to Piro piro_123: Invalid resources value: NaN`

### Resource Overflow
- **Detection**: Piro resources exceed reasonable limits
- **Handling**:
  - Caps resources at maximum value (10,000)
  - Logs warning
  - Continues simulation
- **Example**: `Piro piro_456 resources capped at 10000`

## Validation Errors

### Out-of-Bounds Values
- **Detection**: Property values outside configured ranges
- **Handling**:
  - Clamps to valid range automatically
  - Logs warning with details
  - Uses clamped value for simulation
- **Applied to**: All genetic properties, resources, ages

### Negative Population
- **Detection**: Initial population size validation
- **Handling**: Throws error during engine construction
- **Example**: `Invalid initial population size: must be a positive integer, got -5`

### Invalid Speed
- **Detection**: Speed value validation in setSpeed()
- **Handling**:
  - Clamps to valid range [1, 1000]
  - Logs warning if clamping occurred
  - Uses clamped value
- **Example**: `Speed value 2000 clamped to valid range: 1000`

## Error Recovery Strategies

### Graceful Degradation
- Individual Piro errors don't crash the simulation
- Corrupted Piros are removed, simulation continues
- Statistics calculation errors result in minimal stats, not crash

### Automatic Correction
- Out-of-bounds values are automatically clamped
- Invalid numeric values replaced with defaults
- Property overflow handled transparently

### User Notification
- All errors logged to console with context
- Critical errors pause simulation
- Warnings for non-critical issues

### Fail-Fast for Configuration
- Invalid configuration detected before simulation starts
- Clear error messages guide user to fix issues
- No partial initialization that could cause later crashes

## Testing Error Handling

Run the test suite to verify error handling:

```bash
node test-engine.js
```

Tests cover:
- Configuration validation (missing files, invalid values, malformed JSON)
- Runtime error handling (extinction, property overflow, invalid state)
- Validation error handling (out-of-bounds values, negative population, invalid speed)
- Recovery from errors (graceful degradation, automatic correction)

## Best Practices

1. **Always validate configuration** before starting simulation
2. **Monitor console output** for warnings about clamped values
3. **Handle extinction events** by checking population size
4. **Use try-catch** when integrating with external systems
5. **Check hasExtinctionOccurred flag** to detect population collapse
