/**
 * GeneticProperties Module
 * 
 * Defines and validates genetic property values for Piros.
 * Handles property bounds, validation, clamping, and random generation.
 */

// Define bounds for each genetic property
export const PROPERTY_BOUNDS = {
  replicationRate: { min: 0, max: 1 },
  attractiveness: { min: 0, max: 1 },
  strength: { min: 0, max: 1 },
  mutationChance: { min: 0, max: 1 },
  intelligence: { min: 0, max: 1 },
  resourceEfficiency: { min: 0, max: 1 },
  consumptionRate: { min: 1, max: 10 },
  utilizationFactor: { min: 0.1, max: 1.0 }
};

// Default values when not configured
export const DEFAULT_VALUES = {
  replicationRate: 0.5,
  attractiveness: 0.5,
  strength: 0.5,
  mutationChance: 0.1,
  intelligence: 0.5,
  resourceEfficiency: 0.5,
  consumptionRate: 3,
  utilizationFactor: 0.5
};

/**
 * Validate that a property value is within acceptable bounds
 * @param {string} name - Property name
 * @param {number} value - Property value to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateProperty(name, value) {
  if (!PROPERTY_BOUNDS[name]) {
    return false;
  }
  
  const bounds = PROPERTY_BOUNDS[name];
  return value >= bounds.min && value <= bounds.max;
}

/**
 * Clamp a property value to valid range
 * @param {string} name - Property name
 * @param {number} value - Property value to clamp
 * @returns {number} - Clamped value within bounds
 */
export function clampProperty(name, value) {
  if (!PROPERTY_BOUNDS[name]) {
    console.warn(`Unknown property: ${name}, returning value unchanged`);
    return value;
  }
  
  // Handle invalid numeric values
  if (!Number.isFinite(value)) {
    console.error(`Invalid value for property ${name}: ${value}, using default`);
    return DEFAULT_VALUES[name] || 0.5;
  }
  
  const bounds = PROPERTY_BOUNDS[name];
  const clamped = Math.max(bounds.min, Math.min(bounds.max, value));
  
  // Warn if clamping occurred
  if (clamped !== value) {
    console.warn(`Property ${name} value ${value} clamped to ${clamped}`);
  }
  
  return clamped;
}

/**
 * Generate a random value within the specified range for a property
 * @param {string} propertyName - Name of the genetic property
 * @param {Object} range - Optional range override { min, max }
 * @returns {number} - Random value within range
 */
export function generateRandom(propertyName, range = null) {
  const bounds = range || PROPERTY_BOUNDS[propertyName];
  
  if (!bounds) {
    console.warn(`No bounds found for property: ${propertyName}, using default`);
    return DEFAULT_VALUES[propertyName] || 0.5;
  }
  
  return bounds.min + Math.random() * (bounds.max - bounds.min);
}

/**
 * Create a complete genetic profile from a base template
 * @param {string} roleType - Optional role type identifier (for future use)
 * @param {Object} config - Configuration object with genetic property settings
 * @returns {Object} - Complete genetics object with all properties
 * @throws {Error} If configuration is invalid
 */
export function createGeneticProfile(roleType = null, config = {}) {
  try {
    const genetics = {};
    const mode = config.simulation?.initialMode || 'randomized';
    const propertyConfigs = config.genetics?.properties || {};
    
    // Generate each genetic property
    for (const propertyName in PROPERTY_BOUNDS) {
      const propertyConfig = propertyConfigs[propertyName];
      
      if (mode === 'fixed') {
        // Use configured default value or system default
        genetics[propertyName] = propertyConfig?.default || DEFAULT_VALUES[propertyName];
      } else {
        // Generate random value within configured or default bounds
        const range = propertyConfig ? 
          { min: propertyConfig.min, max: propertyConfig.max } : 
          PROPERTY_BOUNDS[propertyName];
        
        // Validate range
        if (range.min > range.max) {
          throw new Error(`Invalid range for ${propertyName}: min (${range.min}) > max (${range.max})`);
        }
        
        genetics[propertyName] = generateRandom(propertyName, range);
      }
      
      // Ensure value is within bounds
      genetics[propertyName] = clampProperty(propertyName, genetics[propertyName]);
    }
    
    return genetics;
  } catch (error) {
    throw new Error(`Failed to create genetic profile: ${error.message}`);
  }
}
