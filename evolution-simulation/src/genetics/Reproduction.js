/**
 * Reproduction Module
 * 
 * Handles offspring creation and genetic inheritance.
 * Manages reproduction attempts, resource costs, and genetic variation.
 */

import { Piro } from '../core/Piro.js';
import { mutateGenetics } from './Mutation.js';
import { clampProperty, PROPERTY_BOUNDS } from './GeneticProperties.js';

/**
 * Check if parent has sufficient resources to reproduce
 * @param {Piro} parent - Parent Piro attempting reproduction
 * @param {Object} config - Simulation configuration
 * @returns {boolean} - True if parent has enough resources
 */
export function hasReproductionResources(parent, config) {
  const reproductionCost = config.resources?.reproductionCost || 50;
  return parent.resources >= reproductionCost;
}

/**
 * Deduct reproduction cost from parent's resources
 * @param {Piro} parent - Parent Piro that is reproducing
 * @param {Object} config - Simulation configuration
 */
export function deductReproductionCost(parent, config) {
  const reproductionCost = config.resources?.reproductionCost || 50;
  parent.consumeResources(reproductionCost);
}

/**
 * Apply small random variations to inherited properties
 * Adds minor changes beyond mutation to simulate inheritance variation
 * @param {Object} genetics - Genetics object to vary
 * @param {number} variationRange - Maximum variation amount (0-1)
 * @returns {Object} - Genetics with applied variation
 */
export function applyInheritanceVariation(genetics, variationRange) {
  const variedGenetics = { ...genetics };
  
  for (const propertyName in variedGenetics) {
    if (PROPERTY_BOUNDS[propertyName]) {
      // Apply small random change: ± variationRange
      const delta = (Math.random() * 2 - 1) * variationRange;
      const newValue = variedGenetics[propertyName] + delta;
      
      // Clamp to valid bounds
      variedGenetics[propertyName] = clampProperty(propertyName, newValue);
    }
  }
  
  return variedGenetics;
}

/**
 * Create offspring genetics with mutations and inheritance variation
 * @param {Piro} parent - Parent Piro
 * @param {Object} config - Simulation configuration
 * @returns {Object} - Offspring genetics object
 */
export function createOffspringGenetics(parent, config) {
  // Start with parent genetics and apply mutations
  const mutatedGenetics = mutateGenetics(parent.genetics, config);
  
  // Apply inheritance variation for additional genetic diversity
  const inheritanceVariation = config.genetics?.inheritanceVariation || 0.05;
  const offspringGenetics = applyInheritanceVariation(mutatedGenetics, inheritanceVariation);
  
  return offspringGenetics;
}

/**
 * Attempt to create offspring based on parent's attractiveness
 * @param {Piro} parent - Parent Piro attempting reproduction
 * @param {Object} config - Simulation configuration
 * @returns {Piro|null} - New offspring Piro or null if reproduction fails
 */
export function attemptReproduction(parent, config) {
  // Check if parent has sufficient resources
  if (!hasReproductionResources(parent, config)) {
    return null;
  }
  
  // Calculate reproduction success probability based on attractiveness
  const attractivenessWeight = config.reproduction?.attractivenessWeight || 0.7;
  const baseSuccessRate = 0.5; // Base 50% chance
  const attractivenessBonus = parent.genetics.attractiveness * attractivenessWeight;
  const successProbability = baseSuccessRate + attractivenessBonus * 0.5; // Max 85% with perfect attractiveness
  
  // Determine if reproduction succeeds
  if (Math.random() > successProbability) {
    return null; // Reproduction attempt failed
  }
  
  // Deduct reproduction cost from parent
  deductReproductionCost(parent, config);
  
  // Create offspring genetics
  const offspringGenetics = createOffspringGenetics(parent, config);
  
  // Create and return new Piro offspring
  const offspring = new Piro(offspringGenetics, config);
  
  return offspring;
}

