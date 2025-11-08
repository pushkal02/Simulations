/**
 * Mutation Module
 * 
 * Handles genetic mutations during reproduction.
 * Each genetic property is evaluated independently for mutation.
 */

import { PROPERTY_BOUNDS, clampProperty } from './GeneticProperties.js';

/**
 * Clone a genetics object to create an independent copy
 * @param {Object} genetics - Original genetics object
 * @returns {Object} - Deep copy of genetics
 */
export function cloneGenetics(genetics) {
  return { ...genetics };
}

/**
 * Determine if a specific property should mutate
 * @param {string} propertyName - Name of the genetic property
 * @param {number} mutationChance - Base mutation probability (0-1)
 * @returns {boolean} - True if property should mutate
 */
export function shouldPropertyMutate(propertyName, mutationChance) {
  return Math.random() < mutationChance;
}

/**
 * Mutate a single property value by a random amount
 * @param {number} value - Current property value
 * @param {number} mutationStrength - Magnitude of mutation (0-1)
 * @param {Object} bounds - Min/max bounds for the property
 * @returns {number} - Mutated value clamped to bounds
 */
export function mutateProperty(value, mutationStrength, bounds) {
  // Generate random mutation delta between -mutationStrength and +mutationStrength
  const delta = (Math.random() * 2 - 1) * mutationStrength;
  const mutatedValue = value + delta;
  
  // Clamp to bounds
  return Math.max(bounds.min, Math.min(bounds.max, mutatedValue));
}

/**
 * Create offspring genetics by evaluating each property independently for mutation
 * @param {Object} parentGenetics - Parent's genetic properties
 * @param {Object} config - Configuration object with mutation settings
 * @returns {Object} - Offspring genetics with potential mutations
 */
export function mutateGenetics(parentGenetics, config) {
  // Clone parent genetics as base
  const offspringGenetics = cloneGenetics(parentGenetics);
  
  // Get mutation configuration
  const mutationConfig = config.mutation || {};
  const perPropertyProbability = mutationConfig.perPropertyProbability || 0.15;
  const mutationStrength = mutationConfig.mutationStrength || 0.1;
  
  // Evaluate each property independently for mutation
  for (const propertyName in offspringGenetics) {
    if (PROPERTY_BOUNDS[propertyName]) {
      // Check if this property should mutate
      if (shouldPropertyMutate(propertyName, perPropertyProbability)) {
        const bounds = PROPERTY_BOUNDS[propertyName];
        offspringGenetics[propertyName] = mutateProperty(
          offspringGenetics[propertyName],
          mutationStrength,
          bounds
        );
      }
    }
  }
  
  return offspringGenetics;
}
