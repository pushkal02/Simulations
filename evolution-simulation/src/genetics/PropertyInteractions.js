/**
 * PropertyInteractions Module
 * 
 * Calculates how genetic properties affect each other.
 * Implements complex evolutionary dynamics through property interactions.
 */

import { clampProperty } from './GeneticProperties.js';

/**
 * Calculate attractiveness modifier based on strength and intelligence
 * @param {number} strength - Piro's strength value (0-1)
 * @param {number} intelligence - Piro's intelligence value (0-1)
 * @param {Object} config - Simulation configuration
 * @returns {number} - Attractiveness modifier value
 */
export function calculateAttractivenessModifier(strength, intelligence, config) {
  const strengthWeight = config.interactions?.attractivenessFromStrength || 0.4;
  const intelligenceWeight = config.interactions?.attractivenessFromIntelligence || 0.3;
  
  // Calculate weighted contribution from strength and intelligence
  const modifier = (strength * strengthWeight) + (intelligence * intelligenceWeight);
  
  return modifier;
}

/**
 * Calculate replication penalty for weak Piros
 * @param {number} strength - Piro's strength value (0-1)
 * @param {number} currentReplicationRate - Current replication rate
 * @param {Object} config - Simulation configuration
 * @returns {number} - Modified replication rate
 */
export function calculateReplicationPenalty(strength, currentReplicationRate, config) {
  const threshold = config.interactions?.replicationPenaltyThreshold || 0.3;
  
  // If strength is below threshold, reduce replication rate
  if (strength < threshold) {
    // Calculate penalty proportional to how far below threshold
    const penaltyFactor = strength / threshold; // 0 to 1 range
    return currentReplicationRate * penaltyFactor;
  }
  
  return currentReplicationRate;
}

/**
 * Calculate mutation bonus for intelligent Piros
 * @param {number} intelligence - Piro's intelligence value (0-1)
 * @param {number} currentMutationChance - Current mutation chance
 * @param {Object} config - Simulation configuration
 * @returns {number} - Modified mutation chance
 */
export function calculateMutationBonus(intelligence, currentMutationChance, config) {
  const threshold = config.interactions?.mutationBonusThreshold || 0.7;
  
  // If intelligence exceeds threshold, increase mutation chance
  if (intelligence > threshold) {
    // Calculate bonus proportional to how far above threshold
    const excessIntelligence = intelligence - threshold;
    const maxExcess = 1 - threshold;
    const bonusFactor = excessIntelligence / maxExcess; // 0 to 1 range
    
    // Add up to 20% bonus to mutation chance
    const bonus = bonusFactor * 0.2;
    return currentMutationChance + bonus;
  }
  
  return currentMutationChance;
}

/**
 * Apply all property interactions to a Piro
 * Modifies the Piro's genetics based on interaction rules
 * @param {Object} piro - Piro instance to modify
 * @param {Object} config - Simulation configuration
 */
export function applyInteractions(piro, config) {
  const genetics = piro.genetics;
  
  // Calculate attractiveness modifier from strength and intelligence
  const attractivenessModifier = calculateAttractivenessModifier(
    genetics.strength,
    genetics.intelligence,
    config
  );
  
  // Apply attractiveness modifier (additive)
  genetics.attractiveness = clampProperty(
    'attractiveness',
    genetics.attractiveness + attractivenessModifier
  );
  
  // Apply replication penalty for weak Piros
  genetics.replicationRate = clampProperty(
    'replicationRate',
    calculateReplicationPenalty(genetics.strength, genetics.replicationRate, config)
  );
  
  // Apply mutation bonus for intelligent Piros
  genetics.mutationChance = clampProperty(
    'mutationChance',
    calculateMutationBonus(genetics.intelligence, genetics.mutationChance, config)
  );
}
