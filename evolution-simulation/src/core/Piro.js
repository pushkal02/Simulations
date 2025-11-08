/**
 * Piro Entity Class
 * 
 * Represents a single being in the evolution simulation with genetic properties,
 * resources, and lifecycle management.
 */

import crypto from 'crypto';

export class Piro {
  /**
   * Create a new Piro entity
   * @param {Object} genetics - Genetic properties object
   * @param {Object} config - Simulation configuration
   * @param {string} id - Optional unique identifier (generated if not provided)
   */
  constructor(genetics, config, id = null) {
    this.id = id || `piro_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.genetics = { ...genetics };
    this.variantId = this.generateVariantId();
    this.age = 0;
    this.resources = config.resources?.initialAmount || 100;
    this.replicationTimer = this.genetics.replicationRate;
    this.isAlive = true;
  }

  /**
   * Advance one generation cycle
   * Updates age and decrements replication timer
   */
  tick() {
    this.age++;
    this.replicationTimer = Math.max(0, this.replicationTimer - 1);
  }

  /**
   * Check if Piro can reproduce
   * @param {Object} config - Simulation configuration
   * @returns {boolean} - True if ready to reproduce
   */
  canReproduce(config) {
    const reproductionCost = config.resources?.reproductionCost || 50;
    return this.replicationTimer <= 0 && this.resources >= reproductionCost;
  }

  /**
   * Reset replication timer with optional spawn randomness
   * @param {Object} config - Simulation configuration
   */
  resetReplicationTimer(config) {
    const spawnRandomness = config.reproduction?.spawnRandomness || 0;
    const baseTimer = 1 / this.genetics.replicationRate;
    
    // Apply randomness: multiply by (1 ± spawnRandomness)
    const randomFactor = 1 + (Math.random() * 2 - 1) * spawnRandomness;
    this.replicationTimer = baseTimer * randomFactor;
  }

  /**
   * Gather resources based on resourceEfficiency
   * @param {Object} config - Simulation configuration
   */
  gatherResources(config) {
    const gatherRate = config.resources?.gatherRate || 10;
    const gathered = gatherRate * this.genetics.resourceEfficiency;
    this.resources += gathered;
  }

  /**
   * Consume resources for survival or reproduction
   * @param {number} amount - Amount of resources to consume
   */
  consumeResources(amount) {
    this.resources = Math.max(0, this.resources - amount);
  }

  /**
   * Check if Piro should die naturally based on age
   * @param {Object} config - Simulation configuration
   * @returns {boolean} - True if age exceeds lifespan
   */
  shouldDieNaturally(config) {
    const baseLifespan = config.lifespan?.baseLifespan || 100;
    return this.age >= baseLifespan;
  }

  /**
   * Generate a unique variant identifier from genetic properties
   * Creates a hash of the genetics object to identify Piros with identical genetics
   * @returns {string} - Hash identifier for this genetic variant
   */
  generateVariantId() {
    // Sort properties to ensure consistent hashing
    const sortedGenetics = Object.keys(this.genetics)
      .sort()
      .reduce((acc, key) => {
        // Round to 4 decimal places to group similar genetics
        acc[key] = Math.round(this.genetics[key] * 10000) / 10000;
        return acc;
      }, {});
    
    const geneticsString = JSON.stringify(sortedGenetics);
    return crypto.createHash('md5').update(geneticsString).digest('hex').substr(0, 8);
  }
}
