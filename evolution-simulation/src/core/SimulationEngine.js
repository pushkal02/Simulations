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
   * @throws {Error} If configuration is invalid or population initialization fails
   */
  constructor(config) {
    // Validate config exists
    if (!config || typeof config !== 'object') {
      throw new Error('Configuration object is required');
    }
    
    this.config = config;
    this.isRunning = false;
    this.isPaused = false;
    this.intervalId = null;
    this.hasExtinctionOccurred = false;
    
    // Validate and set cycles per second
    const cyclesPerSecond = config.simulation?.cyclesPerSecond || 10;
    if (cyclesPerSecond < 1 || cyclesPerSecond > 1000) {
      throw new Error(`Invalid cyclesPerSecond: must be between 1 and 1000, got ${cyclesPerSecond}`);
    }
    this.cyclesPerSecond = cyclesPerSecond;
    
    // Initialize population with error handling
    try {
      const initialSize = config.simulation?.initialPopulation || 100;
      const initialMode = config.simulation?.initialMode || 'randomized';
      
      // Validate initial population size
      if (initialSize < 1 || !Number.isInteger(initialSize)) {
        throw new Error(`Invalid initial population size: must be a positive integer, got ${initialSize}`);
      }
      
      // Create population with appropriate genetics
      const baseGenetics = initialMode === 'fixed' ? this._getFixedGenetics() : null;
      this.population = new Population(initialSize, baseGenetics, config);
      
      // Verify population was created successfully
      if (this.population.size() === 0) {
        throw new Error('Failed to create initial population: population is empty');
      }
    } catch (error) {
      throw new Error(`Population initialization failed: ${error.message}`);
    }
    
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
    if (!this.isRunning && this.intervalId === null) {
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
   * @throws {Error} If speed value is invalid
   */
  setSpeed(cyclesPerSecond) {
    // Validate input
    if (typeof cyclesPerSecond !== 'number' || isNaN(cyclesPerSecond)) {
      throw new Error(`Invalid speed value: must be a number, got ${typeof cyclesPerSecond}`);
    }
    
    // Clamp to reasonable range and warn if clamping occurred
    const originalSpeed = cyclesPerSecond;
    this.cyclesPerSecond = Math.max(1, Math.min(1000, cyclesPerSecond));
    
    if (this.cyclesPerSecond !== originalSpeed) {
      console.warn(`Speed value ${originalSpeed} clamped to valid range: ${this.cyclesPerSecond}`);
    }
    
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
    try {
      // Reset generation counters
      this.birthsThisGeneration = 0;
      this.deathsThisGeneration = 0;
      
      const allPiros = this.population.getAll();
      
      // Check for extinction
      if (allPiros.length === 0) {
        if (!this.hasExtinctionOccurred) {
          console.error('EXTINCTION EVENT: Population has died out completely!');
          this.hasExtinctionOccurred = true;
        }
        this.pause();
        return;
      }
      
      // 1. Apply property interactions to all Piros
      for (const piro of allPiros) {
        try {
          applyInteractions(piro, this.config);
          
          // Validate Piro state after interactions
          this._validatePiroState(piro);
        } catch (error) {
          console.error(`Error applying interactions to Piro ${piro.id}: ${error.message}`);
          // Mark Piro as dead to remove it safely
          piro.isAlive = false;
        }
      }
      
      // 2. Process resource gathering for all Piros
      for (const piro of allPiros) {
        try {
          if (piro.isAlive) {
            piro.gatherResources(this.config);
            
            // Prevent resource overflow
            const maxResources = 10000; // Reasonable upper limit
            if (piro.resources > maxResources) {
              console.warn(`Piro ${piro.id} resources capped at ${maxResources}`);
              piro.resources = maxResources;
            }
          }
        } catch (error) {
          console.error(`Error gathering resources for Piro ${piro.id}: ${error.message}`);
          piro.isAlive = false;
        }
      }
      
      // 3. Consume resources for survival
      const consumptionRate = this.config.resources?.consumptionRate || 5;
      for (const piro of allPiros) {
        try {
          if (piro.isAlive) {
            piro.consumeResources(consumptionRate);
          }
        } catch (error) {
          console.error(`Error consuming resources for Piro ${piro.id}: ${error.message}`);
          piro.isAlive = false;
        }
      }
      
      // 4. Process reproduction attempts
      const maxPopulation = this.config.simulation?.maxPopulation || 1000;
      for (const piro of allPiros) {
        try {
          // Check population limit
          if (this.population.size() >= maxPopulation) {
            break;
          }
          
          if (!piro.isAlive) {
            continue;
          }
          
          // Tick the Piro (advance age and timers)
          piro.tick();
          
          // Check if Piro can reproduce
          if (piro.canReproduce(this.config)) {
            const offspring = attemptReproduction(piro, this.config);
            
            if (offspring) {
              // Validate offspring before adding
              this._validatePiroState(offspring);
              this.population.add(offspring);
              this.birthsThisGeneration++;
            }
            
            // Reset replication timer regardless of success
            piro.resetReplicationTimer(this.config);
          }
        } catch (error) {
          console.error(`Error during reproduction for Piro ${piro.id}: ${error.message}`);
          // Don't kill the parent, just skip reproduction
        }
      }
      
      // 5. Check natural death timers
      try {
        const naturalDeaths = applyNaturalDeath(this.population, this.config);
        this.deathsThisGeneration += naturalDeaths;
      } catch (error) {
        console.error(`Error applying natural death: ${error.message}`);
      }
      
      // 6. Calculate survival and remove dead Piros
      try {
        const survivalDeaths = applySurvivalCheck(this.population, this.config);
        this.deathsThisGeneration += survivalDeaths;
      } catch (error) {
        console.error(`Error applying survival check: ${error.message}`);
      }
      
      // 7. Update statistics and record history
      try {
        this.population.generation++;
        this.population.updateStatistics();
        
        // Add birth/death counts to statistics
        this.population.statistics.birthsThisGeneration = this.birthsThisGeneration;
        this.population.statistics.deathsThisGeneration = this.deathsThisGeneration;
        
        this.population.recordHistory();
      } catch (error) {
        console.error(`Error updating statistics: ${error.message}`);
      }
      
      // Log generation summary (optional, can be controlled by config)
      if (this.config.simulation?.logGenerations) {
        this._logGenerationSummary();
      }
    } catch (error) {
      console.error(`Critical error in generation processing: ${error.message}`);
      console.error(error.stack);
      this.pause();
      throw error;
    }
  }
  
  /**
   * Validate Piro state to prevent invalid values
   * @private
   * @param {Piro} piro - Piro to validate
   * @throws {Error} If Piro state is invalid
   */
  _validatePiroState(piro) {
    // Check for NaN or Infinity in critical properties
    if (!Number.isFinite(piro.resources)) {
      throw new Error(`Invalid resources value: ${piro.resources}`);
    }
    
    if (!Number.isFinite(piro.age) || piro.age < 0) {
      throw new Error(`Invalid age value: ${piro.age}`);
    }
    
    if (!Number.isFinite(piro.replicationTimer)) {
      throw new Error(`Invalid replicationTimer value: ${piro.replicationTimer}`);
    }
    
    // Validate genetics
    for (const prop in piro.genetics) {
      const value = piro.genetics[prop];
      if (!Number.isFinite(value)) {
        throw new Error(`Invalid genetic property ${prop}: ${value}`);
      }
      if (value < 0 || value > 1) {
        console.warn(`Genetic property ${prop} out of bounds (${value}), clamping to [0, 1]`);
        piro.genetics[prop] = Math.max(0, Math.min(1, value));
      }
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
