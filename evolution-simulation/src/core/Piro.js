/**
 * Piro Entity Class
 * 
 * Represents a single being in the evolution simulation with genetic properties,
 * resources, and lifecycle management.
 */

export class Piro {
  /**
   * Create a new Piro entity
   * @param {Object} genetics - Genetic properties object
   * @param {Object} config - Simulation configuration
   * @param {string} id - Optional unique identifier (generated if not provided)
   * @throws {Error} If genetics or config are invalid
   */
  constructor(genetics, config, id = null) {
    // Validate inputs
    if (!genetics || typeof genetics !== 'object') {
      throw new Error('Genetics object is required');
    }
    
    if (!config || typeof config !== 'object') {
      throw new Error('Configuration object is required');
    }
    
    this.id = id || `piro_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    this.genetics = { ...genetics };
    this.config = config;
    this.variantId = this.generateVariantId();
    this.age = 0;
    
    const initialAmount = config.resources?.initialAmount;
    if (initialAmount === undefined || initialAmount < 0) {
      throw new Error(`Invalid initial resource amount: ${initialAmount}`);
    }
    this.resources = initialAmount;
    
    if (!Number.isFinite(this.genetics.replicationRate) || this.genetics.replicationRate <= 0) {
      throw new Error(`Invalid replication rate: ${this.genetics.replicationRate}`);
    }
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
   * Creates an ID based on rounded genetic values to group similar individuals
   * @returns {string} - Value-based identifier for this genetic variant
   */
  generateVariantId() {
    try {
      // Get precision from config, default to 2
      const precision = this.config?.variants?.groupingPrecision ?? 2;
      
      // Sort properties to ensure consistent ID generation
      const sortedKeys = Object.keys(this.genetics).sort();
      
      // Round each value and create ID string
      const roundedValues = sortedKeys.map(key => {
        const value = this.genetics[key];
        if (!Number.isFinite(value)) {
          throw new Error(`Invalid genetic value for ${key}: ${value}`);
        }
        return value.toFixed(precision);
      });
      
      return roundedValues.join('-');
    } catch (error) {
      console.error(`Error generating variant ID: ${error.message}`);
      // Return a random ID as fallback
      return `err_${Math.random().toString(36).substring(2, 10)}`;
    }
  }
}
