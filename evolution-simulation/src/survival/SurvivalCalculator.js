/**
 * Survival Calculator Module
 * 
 * Determines which Piros survive each generation based on their genetic properties,
 * resources, and age. Implements natural selection mechanics.
 */

/**
 * Calculate a survivability score for a Piro
 * Combines genetic properties (strength, intelligence) with current resources
 * 
 * @param {Object} piro - The Piro entity to evaluate
 * @param {Object} config - Simulation configuration
 * @returns {number} - Survivability score between 0 and 1
 */
export function calculateSurvivability(piro, config) {
  const weights = {
    strength: config.survival?.strengthWeight || 0.6,
    intelligence: config.survival?.intelligenceWeight || 0.4
  };
  
  return weightedSurvivalScore(piro.genetics, piro.resources, weights, config);
}

/**
 * Combine genetic properties and resources into a weighted survival score
 * 
 * @param {Object} genetics - Genetic properties object
 * @param {number} resources - Current resource amount
 * @param {Object} weights - Weight values for strength and intelligence
 * @param {Object} config - Simulation configuration
 * @returns {number} - Weighted survival score between 0 and 1
 */
export function weightedSurvivalScore(genetics, resources, weights, config) {
  const strength = genetics.strength || 0;
  const intelligence = genetics.intelligence || 0;
  
  // Calculate genetic component (weighted average of strength and intelligence)
  const geneticScore = (strength * weights.strength) + (intelligence * weights.intelligence);
  
  // Calculate resource component (normalized to 0-1 range)
  // Assume resources above initialAmount are capped at 1.0
  const initialAmount = config.resources?.initialAmount || 100;
  const resourceScore = Math.min(1, resources / initialAmount);
  
  // Combine genetic and resource scores (50/50 split)
  const combinedScore = (geneticScore * 0.7) + (resourceScore * 0.3);
  
  return Math.max(0, Math.min(1, combinedScore));
}

/**
 * Make a probabilistic survival decision based on score and threshold
 * 
 * @param {number} score - Survivability score (0-1)
 * @param {number} threshold - Minimum survival threshold (0-1)
 * @param {number} randomFactor - Amount of randomness to apply (0-1)
 * @returns {boolean} - True if the entity survives
 */
export function determineSurvival(score, threshold, randomFactor) {
  // Apply random factor to create probabilistic outcomes
  const randomAdjustment = (Math.random() * 2 - 1) * randomFactor;
  const adjustedScore = score + randomAdjustment;
  
  return adjustedScore >= threshold;
}

/**
 * Apply survival checks to population and remove Piros below threshold
 * Also removes Piros with depleted resources (at or below starvation threshold)
 * 
 * @param {Object} population - Population instance with getAll() and remove() methods
 * @param {Object} config - Simulation configuration
 * @returns {number} - Number of Piros removed due to survival failure
 */
export function applySurvivalCheck(population, config) {
  const threshold = config.survival?.threshold || 0.3;
  const randomFactor = config.survival?.randomFactor || 0.1;
  const starvationThreshold = config.resources?.starvationThreshold || 0;
  
  const allPiros = population.getAll();
  let removedCount = 0;
  
  for (const piro of allPiros) {
    // Check for starvation first
    if (piro.resources <= starvationThreshold) {
      population.remove(piro.id);
      removedCount++;
      continue;
    }
    
    // Calculate survivability and determine if Piro survives
    const score = calculateSurvivability(piro, config);
    const survives = determineSurvival(score, threshold, randomFactor);
    
    if (!survives) {
      population.remove(piro.id);
      removedCount++;
    }
  }
  
  return removedCount;
}

/**
 * Apply natural death to Piros whose age exceeds configured lifespan
 * 
 * @param {Object} population - Population instance with getAll() and remove() methods
 * @param {Object} config - Simulation configuration
 * @returns {number} - Number of Piros removed due to natural death
 */
export function applyNaturalDeath(population, config) {
  const baseLifespan = config.lifespan?.baseLifespan || 100;
  
  const allPiros = population.getAll();
  let removedCount = 0;
  
  for (const piro of allPiros) {
    if (piro.age >= baseLifespan) {
      population.remove(piro.id);
      removedCount++;
    }
  }
  
  return removedCount;
}
