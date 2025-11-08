/**
 * StatisticsTracker Module
 * 
 * Tracks and aggregates simulation data for analysis and visualization.
 * Provides functions to calculate population statistics, track variants,
 * and format data for graphing.
 */

/**
 * Calculate average genetic properties across entire population
 * @param {Population} population - Population instance
 * @returns {Object} - Object with average values for each genetic property
 */
export function calculateAverageGenetics(population) {
  const livingPiros = population.getAll();
  
  if (livingPiros.length === 0) {
    return {
      replicationRate: 0,
      attractiveness: 0,
      strength: 0,
      mutationChance: 0,
      intelligence: 0,
      resourceEfficiency: 0
    };
  }

  const sums = {
    replicationRate: 0,
    attractiveness: 0,
    strength: 0,
    mutationChance: 0,
    intelligence: 0,
    resourceEfficiency: 0
  };

  // Sum all properties
  livingPiros.forEach(piro => {
    for (const property in sums) {
      sums[property] += piro.genetics[property] || 0;
    }
  });

  // Calculate averages
  const averages = {};
  for (const property in sums) {
    averages[property] = sums[property] / livingPiros.length;
  }

  return averages;
}

/**
 * Count Piros grouped by genetic variant
 * @param {Population} population - Population instance
 * @returns {Object} - Object mapping variantId to population count
 */
export function calculatePopulationByVariant(population) {
  const livingPiros = population.getAll();
  const variantCounts = {};

  livingPiros.forEach(piro => {
    if (!variantCounts[piro.variantId]) {
      variantCounts[piro.variantId] = 0;
    }
    variantCounts[piro.variantId]++;
  });

  return variantCounts;
}

/**
 * Identify and count all unique genetic variants in the population
 * @param {Population} population - Population instance
 * @returns {Object} - Object with variant details including count and genetics
 */
export function trackAllVariants(population) {
  const livingPiros = population.getAll();
  const variants = {};

  livingPiros.forEach(piro => {
    if (!variants[piro.variantId]) {
      variants[piro.variantId] = {
        variantId: piro.variantId,
        count: 0,
        genetics: { ...piro.genetics }
      };
    }
    variants[piro.variantId].count++;
  });

  return variants;
}

/**
 * Generate a complete statistics snapshot for the current generation
 * @param {Population} population - Population instance
 * @param {number} generation - Current generation number
 * @param {number} birthsThisGeneration - Number of births in this generation
 * @param {number} deathsThisGeneration - Number of deaths in this generation
 * @returns {Object} - Complete statistics snapshot
 */
export function generateSnapshot(population, generation, birthsThisGeneration = 0, deathsThisGeneration = 0) {
  const livingPiros = population.getAll();
  const populationByVariant = calculatePopulationByVariant(population);
  const averageGenetics = calculateAverageGenetics(population);

  return {
    generation,
    timestamp: Date.now(),
    totalPopulation: livingPiros.length,
    populationByVariant,
    uniqueVariants: Object.keys(populationByVariant).length,
    averageGenetics,
    averageResources: livingPiros.length > 0 
      ? livingPiros.reduce((sum, piro) => sum + piro.resources, 0) / livingPiros.length 
      : 0,
    averageAge: livingPiros.length > 0
      ? livingPiros.reduce((sum, piro) => sum + piro.age, 0) / livingPiros.length
      : 0,
    birthsThisGeneration,
    deathsThisGeneration
  };
}

/**
 * Format historical data for graphing specific metrics
 * @param {Array} history - Array of historical statistics snapshots
 * @param {string} metric - Metric to extract (e.g., 'totalPopulation', 'averageGenetics.strength')
 * @returns {Array} - Array of {generation, value} objects suitable for graphing
 */
export function exportHistoryForGraph(history, metric) {
  if (!history || history.length === 0) {
    return [];
  }

  return history.map(snapshot => {
    // Handle nested properties (e.g., 'averageGenetics.strength')
    const value = metric.split('.').reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : null;
    }, snapshot);

    return {
      generation: snapshot.generation,
      value: value !== null ? value : 0
    };
  });
}

/**
 * Extract population count trends for a specific variant over time
 * @param {Array} history - Array of historical statistics snapshots
 * @param {string} variantId - Variant identifier to track
 * @returns {Array} - Array of {generation, population} objects for the variant
 */
export function getPopulationTrends(history, variantId) {
  if (!history || history.length === 0) {
    return [];
  }

  return history.map(snapshot => {
    const population = snapshot.populationByVariant && snapshot.populationByVariant[variantId] 
      ? snapshot.populationByVariant[variantId] 
      : 0;

    return {
      generation: snapshot.generation,
      population
    };
  });
}
