/**
 * ResourceManager Class
 * 
 * Manages the global resource pool for the simulation.
 * Resources are limited, capped, and replenished each generation.
 */

export class ResourceManager {
  /**
   * Create a new resource manager
   * @param {Object} config - Simulation configuration
   */
  constructor(config) {
    this.config = config;
    const resourceConfig = config.resources || {};
    
    this.maxTotalResources = resourceConfig.maxTotalResources || 1000;
    this.replenishmentRate = resourceConfig.replenishmentRate || 1000;
    this.currentResources = this.maxTotalResources; // Start at max
  }
  
  /**
   * Replenish resources at the start of each generation
   * Resources are capped at maxTotalResources
   */
  replenish() {
    this.currentResources = Math.min(
      this.maxTotalResources,
      this.currentResources + this.replenishmentRate
    );
  }
  
  /**
   * Get current available resources
   * @returns {number} - Current resource amount
   */
  getAvailable() {
    return this.currentResources;
  }
  
  /**
   * Distribute resources to a population of Piros
   * Resources are distributed based on strength and other factors
   * @param {Array} population - Array of Piro instances
   * @returns {Object} - Distribution statistics
   */
  distributeResources(population) {
    if (population.length === 0) {
      return { distributed: 0, remaining: this.currentResources };
    }
    
    // Calculate total strength (effective strength based on consumption)
    const totalStrength = population.reduce((sum, piro) => {
      return sum + piro.getEffectiveStrength();
    }, 0);
    
    if (totalStrength === 0) {
      return { distributed: 0, remaining: this.currentResources };
    }
    
    let totalDistributed = 0;
    let totalAbsorbed = 0;
    
    // Distribute resources proportionally to strength
    for (const piro of population) {
      if (this.currentResources <= 0) break;
      
      const strength = piro.getEffectiveStrength();
      const share = (strength / totalStrength) * this.currentResources;
      const amount = Math.min(share, this.currentResources);
      
      // Piro absorbs resources (all removed from system, only fraction utilized)
      const absorbed = piro.absorbResources(amount);
      this.currentResources -= absorbed;
      totalAbsorbed += absorbed;
      totalDistributed += amount;
    }
    
    return {
      distributed: totalDistributed,
      absorbed: totalAbsorbed,
      remaining: this.currentResources
    };
  }
  
  /**
   * Reset resources to maximum
   */
  reset() {
    this.currentResources = this.maxTotalResources;
  }
  
  /**
   * Get resource statistics
   * @returns {Object} - Resource stats
   */
  getStats() {
    return {
      current: this.currentResources,
      max: this.maxTotalResources,
      replenishmentRate: this.replenishmentRate,
      utilization: 1 - (this.currentResources / this.maxTotalResources)
    };
  }
}
