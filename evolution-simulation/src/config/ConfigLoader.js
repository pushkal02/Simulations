import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * ConfigLoader Module
 * Handles loading, merging, and validating simulation configuration files
 */

/**
 * Load configuration from a JSON file
 * @param {string} configPath - Path to the configuration file
 * @returns {Object} Parsed configuration object
 * @throws {Error} If file cannot be read or parsed
 */
function loadConfig(configPath) {
  try {
    const absolutePath = path.resolve(configPath);
    const fileContent = fs.readFileSync(absolutePath, 'utf8');
    const config = JSON.parse(fileContent);
    return config;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Configuration file not found: ${configPath}`);
    } else if (error instanceof SyntaxError) {
      throw new Error(`Malformed JSON in configuration file ${configPath}: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Deep merge two objects, with userConfig taking precedence
 * @param {Object} defaults - Default configuration object
 * @param {Object} userConfig - User-provided configuration object
 * @returns {Object} Merged configuration object
 */
function mergeWithDefaults(defaults, userConfig) {
  const merged = {};
  
  // Start with all default keys
  for (const key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      if (typeof defaults[key] === 'object' && defaults[key] !== null && !Array.isArray(defaults[key])) {
        // Recursively merge nested objects
        merged[key] = mergeWithDefaults(
          defaults[key],
          userConfig && userConfig[key] ? userConfig[key] : {}
        );
      } else {
        // Use user value if provided, otherwise use default
        merged[key] = userConfig && userConfig.hasOwnProperty(key) 
          ? userConfig[key] 
          : defaults[key];
      }
    }
  }
  
  // Add any additional keys from userConfig that aren't in defaults
  if (userConfig) {
    for (const key in userConfig) {
      if (userConfig.hasOwnProperty(key) && !merged.hasOwnProperty(key)) {
        merged[key] = userConfig[key];
      }
    }
  }
  
  return merged;
}

/**
 * Validate that required configuration parameters exist and have valid values
 * @param {Object} config - Configuration object to validate
 * @returns {boolean} True if valid
 * @throws {Error} If required parameters are missing or invalid
 */
function validateConfig(config) {
  const requiredPaths = [
    'simulation.initialPopulation',
    'simulation.cyclesPerSecond',
    'genetics.properties',
    'resources.maxTotalResources',
    'resources.replenishmentRate',
    'resources.ageConsumptionConstant'
  ];
  
  // Check for missing required parameters
  for (const pathStr of requiredPaths) {
    const value = getConfigValue(config, pathStr);
    if (value === undefined || value === null) {
      throw new Error(`Missing required configuration parameter: ${pathStr}`);
    }
  }
  
  // Validate numeric ranges and constraints
  const initialPop = config.simulation.initialPopulation;
  if (typeof initialPop !== 'number' || initialPop < 1 || !Number.isInteger(initialPop)) {
    throw new Error(`Invalid initialPopulation: must be a positive integer, got ${initialPop}`);
  }
  
  const cyclesPerSecond = config.simulation.cyclesPerSecond;
  if (typeof cyclesPerSecond !== 'number' || cyclesPerSecond < 1 || cyclesPerSecond > 1000) {
    throw new Error(`Invalid cyclesPerSecond: must be between 1 and 1000, got ${cyclesPerSecond}`);
  }
  
  const maxPopulation = config.simulation.maxPopulation;
  if (maxPopulation !== undefined && (typeof maxPopulation !== 'number' || maxPopulation < initialPop)) {
    throw new Error(`Invalid maxPopulation: must be >= initialPopulation (${initialPop}), got ${maxPopulation}`);
  }
  
  // Validate genetic property bounds
  const properties = config.genetics.properties;
  for (const propName in properties) {
    const prop = properties[propName];
    if (prop.min === undefined || prop.max === undefined) {
      throw new Error(`Genetic property ${propName} missing min or max bounds`);
    }
    if (typeof prop.min !== 'number' || typeof prop.max !== 'number') {
      throw new Error(`Genetic property ${propName} bounds must be numbers`);
    }
    if (prop.min > prop.max) {
      throw new Error(`Genetic property ${propName} has invalid bounds: min (${prop.min}) > max (${prop.max})`);
    }
    if (prop.default !== undefined) {
      if (typeof prop.default !== 'number') {
        throw new Error(`Genetic property ${propName} default must be a number`);
      }
      if (prop.default < prop.min || prop.default > prop.max) {
        throw new Error(`Genetic property ${propName} default (${prop.default}) outside bounds [${prop.min}, ${prop.max}]`);
      }
    }
  }
  
  // Validate resource values
  if (config.resources.maxTotalResources < 1) {
    throw new Error(`Invalid maxTotalResources: must be at least 1, got ${config.resources.maxTotalResources}`);
  }
  if (config.resources.replenishmentRate < 0) {
    throw new Error(`Invalid replenishmentRate: must be non-negative, got ${config.resources.replenishmentRate}`);
  }
  if (config.resources.ageConsumptionConstant < 1) {
    throw new Error(`Invalid ageConsumptionConstant: must be at least 1, got ${config.resources.ageConsumptionConstant}`);
  }
  
  return true;
}

/**
 * Safely access nested configuration values
 * @param {Object} config - Configuration object
 * @param {string} path - Dot-separated path to the value (e.g., 'simulation.initialPopulation')
 * @param {*} defaultValue - Default value to return if path doesn't exist
 * @returns {*} The value at the path, or defaultValue if not found
 */
function getConfigValue(config, path, defaultValue = undefined) {
  const keys = path.split('.');
  let current = config;
  
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current !== undefined ? current : defaultValue;
}

export {
  loadConfig,
  mergeWithDefaults,
  validateConfig,
  getConfigValue
};
