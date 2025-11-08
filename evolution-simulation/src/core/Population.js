/**
 * Population Class
 * 
 * Manages the collection of all Piros in the simulation.
 * Handles population tracking, statistics, and historical data.
 */

import { Piro } from './Piro.js';
import { createGeneticProfile } from '../genetics/GeneticProperties.js';
import { registerVariant } from '../genetics/VariantTracker.js';

export class Population {
  /**
   * Create a new population
   * @param {number} initialSize - Number of Piros to create initially
   * @param {Object} baseGenetics - Base genetic properties for initial population
   * @param {Object} config - Simulation configuration
   * @throws {Error} If population creation fails
   */
  constructor(initialSize, baseGenetics, config) {
    // Validate inputs
    if (!Number.isInteger(initialSize) || initialSize < 1) {
      throw new Error(`Invalid initial population size: must be a positive integer, got ${initialSize}`);
    }
    
    if (!config || typeof config !== 'object') {
      throw new Error('Configuration object is required');
    }
    
    this.piros = [];
    this.generation = 0;
    this.statistics = {};
    this.history = [];
    this.config = config;

    // Create initial population with error handling
    let successCount = 0;
    const errors = [];
    
    for (let i = 0; i < initialSize; i++) {
      try {
        const genetics = baseGenetics || createGeneticProfile(null, config);
        const piro = new Piro(genetics, config);
        
        // Register the variant
        registerVariant(piro.variantId, piro.genetics);
        
        this.piros.push(piro);
        successCount++;
      } catch (error) {
        errors.push(`Piro ${i}: ${error.message}`);
      }
    }
    
    // If we couldn't create any Piros, throw an error
    if (successCount === 0) {
      throw new Error(`Failed to create initial population. Errors: ${errors.join('; ')}`);
    }
    
    // Warn if some Piros failed to create
    if (errors.length > 0) {
      console.warn(`Created ${successCount}/${initialSize} Piros. ${errors.length} failed.`);
    }
  }

  /**
   * Add a new Piro to the population
   * @param {Piro} piro - Piro instance to add
   */
  add(piro) {
    if (piro instanceof Piro) {
      this.piros.push(piro);
      // Register the variant if it's new
      registerVariant(piro.variantId, piro.genetics);
    } else {
      console.warn('Attempted to add non-Piro object to population');
    }
  }

  /**
   * Remove a Piro from the population by ID
   * @param {string} piroId - Unique identifier of the Piro to remove
   * @returns {boolean} - True if Piro was found and removed
   */
  remove(piroId) {
    const initialLength = this.piros.length;
    this.piros = this.piros.filter(piro => piro.id !== piroId);
    return this.piros.length < initialLength;
  }

  /**
   * Get all living Piros
   * @returns {Array<Piro>} - Array of all Piro instances
   */
  getAll() {
    return this.piros.filter(piro => piro.isAlive);
  }

  /**
   * Get Piros by genetic variant
   * @param {string} variantId - Variant identifier to filter by
   * @returns {Array<Piro>} - Array of Piros with matching variant
   */
  getByVariant(variantId) {
    return this.piros.filter(piro => piro.isAlive && piro.variantId === variantId);
  }

  /**
   * Get current population size (living Piros only)
   * @returns {number} - Count of living Piros
   */
  size() {
    return this.piros.filter(piro => piro.isAlive).length;
  }

  /**
   * Calculate average genetic properties across all living Piros
   * @returns {Object} - Object with average values for each genetic property
   */
  getAverageStats() {
    const livingPiros = this.getAll();
    
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
   * Count Piros per genetic variant
   * @returns {Object} - Object mapping variantId to population count
   */
  getPopulationByVariant() {
    const livingPiros = this.getAll();
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
   * Update current generation statistics
   * Calculates and stores statistics for the current generation
   */
  updateStatistics() {
    try {
      const livingPiros = this.getAll();
      
      this.statistics = {
        generation: this.generation,
        totalPopulation: livingPiros.length,
        populationByVariant: this.getPopulationByVariant(),
        uniqueVariants: Object.keys(this.getPopulationByVariant()).length,
        averageGenetics: this.getAverageStats(),
        averageResources: livingPiros.length > 0 
          ? livingPiros.reduce((sum, piro) => sum + piro.resources, 0) / livingPiros.length 
          : 0,
        averageAge: livingPiros.length > 0
          ? livingPiros.reduce((sum, piro) => sum + piro.age, 0) / livingPiros.length
          : 0
      };
    } catch (error) {
      console.error(`Error updating statistics: ${error.message}`);
      // Provide minimal statistics on error
      this.statistics = {
        generation: this.generation,
        totalPopulation: 0,
        populationByVariant: {},
        uniqueVariants: 0,
        averageGenetics: {},
        averageResources: 0,
        averageAge: 0
      };
    }
  }

  /**
   * Record current statistics to history
   * Saves a snapshot of current generation statistics for graphing
   */
  recordHistory() {
    this.history.push({
      ...this.statistics,
      timestamp: Date.now()
    });
  }

  /**
   * Get historical statistics
   * @param {number} generations - Optional number of recent generations to retrieve
   * @returns {Array} - Array of historical statistics snapshots
   */
  getHistory(generations = null) {
    if (generations === null) {
      return [...this.history];
    }
    
    return this.history.slice(-generations);
  }
}
