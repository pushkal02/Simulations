/**
 * VariantTracker Module
 * 
 * Tracks unique genetic variants in the population.
 * A variant is a unique combination of genetic properties identified by rounded values.
 */

/**
 * Storage for all registered genetic variants
 * Key: variantId (hash string)
 * Value: genetics object
 */
const variants = new Map();

/**
 * Generate a unique variant identifier from genetic properties
 * Creates an ID based on rounded genetic values to group similar individuals
 * 
 * @param {Object} genetics - Genetic properties object
 * @param {number} precision - Decimal places for rounding (default: 2)
 * @returns {string} - Value-based identifier for this genetic variant
 */
export function generateVariantId(genetics, precision = 2) {
  // Sort properties to ensure consistent ID generation
  const sortedKeys = Object.keys(genetics).sort();
  
  // Round each value and create ID string
  const roundedValues = sortedKeys.map(key => {
    const value = genetics[key];
    return value.toFixed(precision);
  });
  
  return roundedValues.join('-');
}

/**
 * Register a new genetic variant
 * Stores the genetic properties associated with a variant ID
 * 
 * @param {string} variantId - Unique variant identifier
 * @param {Object} genetics - Genetic properties object
 */
export function registerVariant(variantId, genetics) {
  if (!variants.has(variantId)) {
    variants.set(variantId, { ...genetics });
  }
}

/**
 * Retrieve genetic properties for a specific variant
 * 
 * @param {string} variantId - Unique variant identifier
 * @returns {Object|null} - Genetic properties object or null if not found
 */
export function getVariantGenetics(variantId) {
  return variants.has(variantId) ? { ...variants.get(variantId) } : null;
}

/**
 * Get the total number of unique genetic variants
 * 
 * @returns {number} - Count of unique variants
 */
export function getVariantCount() {
  return variants.size;
}

/**
 * Get all registered genetic variants
 * 
 * @returns {Array} - Array of objects with variantId and genetics
 */
export function getAllVariants() {
  return Array.from(variants.entries()).map(([variantId, genetics]) => ({
    variantId,
    genetics: { ...genetics }
  }));
}

/**
 * Count Piros of a specific variant in the population
 * 
 * @param {string} variantId - Unique variant identifier
 * @param {Array} population - Array of Piro instances
 * @returns {number} - Count of Piros with this variant
 */
export function getVariantPopulation(variantId, population) {
  return population.filter(piro => piro.variantId === variantId).length;
}

/**
 * Clear all registered variants (useful for testing or resetting simulation)
 */
export function clearVariants() {
  variants.clear();
}
