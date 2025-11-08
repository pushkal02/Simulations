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
 * Validate that required configuration parameters exist
 * @param {Object} config - Configuration object to validate
 * @returns {boolean} True if valid
 * @throws {Error} If required parameters are missing
 */
function validateConfig(config) {
  const requiredPaths = [
    'simulation.initialPopulation',
    'simulation.cyclesPerSecond',
    'genetics.properties',
    'resources.initialAmount',
    'resources.gatherRate',
    'resources.consumptionRate',
    'resources.reproductionCost',
    'lifespan.baseLifespan',
    'survival.threshold'
  ];
  
  for (const pathStr of requiredPaths) {
    const value = getConfigValue(config, pathStr);
    if (value === undefined || value === null) {
      throw new Error(`Missing required configuration parameter: ${pathStr}`);
    }
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
