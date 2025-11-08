/**
 * SimulationEngine Class
 * 
 * Orchestrates the simulation loop and coordinates all subsystems.
 * Manages generation cycles, population updates, and simulation state.
 */

import { Population } from './Population.js';
import { applyInteractions } from '../genetics/PropertyInteractions.js';
import { attemptReproduction } from '../genetics/Reproduction.js';
import { applySurvivalCheck, applyNaturalDeath } from '../survival/SurvivalCalculator.js';

export class SimulationEngine {
  /**
   * Create a new simulation engine
   * @param {Object} config - Simulation configuration object
   */
  constructor(config) {
    this.config = config;
    this.isRunning = false;
    this.cyclesPerSecond = config.simulation?.cyclesPerSecond || 10;
    this.intervalId = null;
    
    // Initialize population
    const initialSize = config.simulation?.initialPopulation || 100;
    const initialMode = config.simulation?.initialMode || 'randomized';
    
    // Create population with appropriate genetics
    const baseGenetics = initialMode === 'fixed' ? this._getFixedGenetics() : null;
    this.population = new Population(initialSize, baseGenetics, config);
    
    // Track births and deaths for statistics
    this.birthsThisGeneration = 0;
    this.deathsThisGeneration = 0;
  }

  /**
   * Get fixed genetics for initial population (if configured)
   * @private
   * @returns {Object|null} - Fixed genetics object or null for randomized
   */
  _getFixedGenetics() {
    // If fixed mode is specified, use default values from config
    const props = this.config.genetics?.properties || {};
    return {
      replicationRate: props.replicationRate?.default || 0.5,
      attractiveness: props.attractiveness?.default || 0.5,
      strength: props.strength?.default || 0.5,
      mutationChance: props.mutationChance?.default || 0.1,
      intelligence: props.intelligence?.default || 0.5,
      resourceEfficiency: props.resourceEfficiency?.default || 0.5
    };
  }

  /**
   * Start the simulation loop
   */
  start() {
    if (this.isRunning) {
      console.warn('Simulation is already running');
      return;
    }
    
    this.isRunning = true;
    const intervalMs = 1000 / this.cyclesPerSecond;
    
    this.intervalId = setInterval(() => {
      this.processGeneration();
    }, intervalMs);
    
    console.log(`Simulation started at ${this.cyclesPerSecond} cycles per second`);
  }

  /**
   * Pause the simulation without resetting state
   */
  pause() {
    if (!this.isRunning) {
      console.warn('Simulation is not running');
      return;
    }
    
    this.isRunning = false;
    
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    console.log('Simulation paused');
  }

  /**
   * Resume a paused simulation
   */
  resume() {
    if (this.isRunning) {
      console.warn('Simulation is already running');
      return;
    }
    
    this.start();
    console.log('Simulation resumed');
  }

  /**
   * Stop the simulation and cleanup
   */
  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isRunning = false;
    console.log('Simulation stopped');
  }

  /**
   * Adjust simulation speed (cycles per second)
   * @param {number} cyclesPerSecond - New speed value (1-1000)
   */
  setSpeed(cyclesPerSecond) {
    // Clamp to reasonable range
    this.cyclesPerSecond = Math.max(1, Math.min(1000, cyclesPerSecond));
    
    // If running, restart with new speed
    if (this.isRunning) {
      this.pause();
      this.start();
    }
    
    console.log(`Simulation speed set to ${this.cyclesPerSecond} cycles per second`);
  }

  /**
   * Process one complete generation cycle
   * Orchestrates all simulation subsystems in the correct order
   */
  processGeneration() {
    // Reset generation counters
    this.birthsThisGeneration = 0;
    this.deathsThisGeneration = 0;
    
    const allPiros = this.population.getAll();
    
    // Check for extinction
    if (allPiros.length === 0) {
      console.warn('Population extinct! Pausing simulation.');
      this.pause();
      return;
    }
    
    // 1. Apply property interactions to all Piros
    for (const piro of allPiros) {
      applyInteractions(piro, this.config);
    }
    
    // 2. Process resource gathering for all Piros
    for (const piro of allPiros) {
      piro.gatherResources(this.config);
    }
    
    // 3. Consume resources for survival
    const consumptionRate = this.config.resources?.consumptionRate || 5;
    for (const piro of allPiros) {
      piro.consumeResources(consumptionRate);
    }
    
    // 4. Process reproduction attempts
    const maxPopulation = this.config.simulation?.maxPopulation || 1000;
    for (const piro of allPiros) {
      // Check population limit
      if (this.population.size() >= maxPopulation) {
        break;
      }
      
      // Tick the Piro (advance age and timers)
      piro.tick();
      
      // Check if Piro can reproduce
      if (piro.canReproduce(this.config)) {
        const offspring = attemptReproduction(piro, this.config);
        
        if (offspring) {
          this.population.add(offspring);
          this.birthsThisGeneration++;
        }
        
        // Reset replication timer regardless of success
        piro.resetReplicationTimer(this.config);
      }
    }
    
    // 5. Check natural death timers
    const naturalDeaths = applyNaturalDeath(this.population, this.config);
    this.deathsThisGeneration += naturalDeaths;
    
    // 6. Calculate survival and remove dead Piros
    const survivalDeaths = applySurvivalCheck(this.population, this.config);
    this.deathsThisGeneration += survivalDeaths;
    
    // 7. Update statistics and record history
    this.population.generation++;
    this.population.updateStatistics();
    
    // Add birth/death counts to statistics
    this.population.statistics.birthsThisGeneration = this.birthsThisGeneration;
    this.population.statistics.deathsThisGeneration = this.deathsThisGeneration;
    
    this.population.recordHistory();
    
    // Log generation summary (optional, can be controlled by config)
    if (this.config.simulation?.logGenerations) {
      this._logGenerationSummary();
    }
  }

  /**
   * Log a summary of the current generation
   * @private
   */
  _logGenerationSummary() {
    const stats = this.population.statistics;
    console.log(
      `Gen ${stats.generation}: ` +
      `Pop=${stats.totalPopulation} ` +
      `Variants=${stats.uniqueVariants} ` +
      `Births=${this.birthsThisGeneration} ` +
      `Deaths=${this.deathsThisGeneration} ` +
      `AvgRes=${stats.averageResources.toFixed(1)}`
    );
  }

  /**
   * Get current population statistics
   * @returns {Object} - Current statistics object
   */
  getStatistics() {
    return this.population.statistics;
  }

  /**
   * Get historical statistics
   * @param {number} generations - Optional number of recent generations
   * @returns {Array} - Array of historical statistics
   */
  getHistory(generations = null) {
    return this.population.getHistory(generations);
  }

  /**
   * Get current population instance
   * @returns {Population} - Population object
   */
  getPopulation() {
    return this.population;
  }
}
