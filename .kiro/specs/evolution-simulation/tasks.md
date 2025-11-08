# Implementation Plan

- [x] 1. Set up project structure and configuration system





  - Create directory structure: evolution-simulation/src with subdirectories (core, genetics, survival, config)
  - Initialize package.json with project metadata
  - Create default.json configuration file with all simulation parameters
  - _Requirements: 1.1, 1.4, 6.1, 6.2_

- [x] 2. Implement genetic properties and validation system





  - Create GeneticProperties module with property bounds and validation functions
  - Implement property validation, clamping, and random generation functions
  - Create function to generate complete genetic profile from base template
  - _Requirements: 1.3, 1.5, 1.6, 1.7_

- [x] 3. Implement Piro entity class





  - Create Piro class with properties (id, variantId, age, resources, genetics, replicationTimer, isAlive)
  - Implement constructor to initialize Piro with genetic properties
  - Add tick() method to advance generation cycle and update timers
  - Implement resource gathering based on resourceEfficiency
  - Implement resource consumption method
  - Add canReproduce() check for timer and resource availability
  - Implement resetReplicationTimer() with spawn randomness
  - Add shouldDieNaturally() check based on age and lifespan
  - Implement generateVariantId() to create hash from genetics
  - _Requirements: 1.2, 2.1, 2.6, 2.7, 3.6, 3.7, 8.1, 8.2, 8.3_

- [x] 4. Implement mutation system





  - Create Mutation module with mutation logic
  - Implement mutateGenetics() to evaluate each property independently
  - Add shouldPropertyMutate() to check mutation probability per property
  - Implement mutateProperty() to modify single property value
  - Add cloneGenetics() helper function
  - _Requirements: 2.4, 2.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 5. Implement reproduction system





  - Create Reproduction module for offspring creation
  - Implement attemptReproduction() with attractiveness-based success probability
  - Add hasReproductionResources() check
  - Implement deductReproductionCost() to remove resources from parent
  - Create createOffspringGenetics() that calls mutation system
  - Add applyInheritanceVariation() for small random changes
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.8, 2.9_

- [x] 6. Implement property interactions system





  - Create PropertyInteractions module
  - Implement applyInteractions() to update Piro properties
  - Add calculateAttractivenessModifier() based on strength and intelligence
  - Implement calculateReplicationPenalty() for weak Piros
  - Add calculateMutationBonus() for intelligent Piros
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. Implement survival calculation system





  - Create SurvivalCalculator module
  - Implement calculateSurvivability() combining genetics and resources
  - Add weightedSurvivalScore() to combine strength, intelligence, and resources
  - Implement determineSurvival() with probabilistic decision
  - Add applySurvivalCheck() to remove Piros below threshold
  - Implement applyNaturalDeath() to remove Piros exceeding lifespan
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 8. Implement variant tracking system





  - Create VariantTracker module
  - Implement generateVariantId() hash function from genetics
  - Add registerVariant() to store unique genetic profiles
  - Implement getVariantGenetics() lookup
  - Add getVariantCount() and getAllVariants()
  - Implement getVariantPopulation() to count Piros per variant
  - _Requirements: 7.6, 9.7_

- [ ] 9. Implement population management
  - Create Population class
  - Implement constructor to create initial population with base genetics
  - Add methods: add(), remove(), getAll(), getByVariant(), size()
  - Implement getAverageStats() to calculate mean genetic properties
  - Add getPopulationByVariant() to count Piros per variant
  - _Requirements: 1.2, 9.4_

- [ ] 10. Implement statistics tracking system
  - Create StatisticsTracker module
  - Implement calculateAverageGenetics() for entire population
  - Add calculatePopulationByVariant() grouping function
  - Implement trackAllVariants() to identify unique variants
  - Create generateSnapshot() for complete generation statistics
  - Add exportHistoryForGraph() to format data for graphing
  - Implement getPopulationTrends() for variant-specific trends
  - _Requirements: 9.1, 9.2, 9.3, 9.5, 9.6, 9.7_

- [ ] 11. Integrate statistics into Population class
  - Add statistics and history properties to Population
  - Implement updateStatistics() to calculate generation stats
  - Add recordHistory() to save snapshots
  - Implement getHistory() to retrieve historical data
  - _Requirements: 9.2, 9.3_

- [ ] 12. Implement configuration loader
  - Create ConfigLoader module
  - Implement loadConfig() to read and parse JSON
  - Add mergeWithDefaults() to combine user config with defaults
  - Implement validateConfig() to ensure required parameters exist
  - Add getConfigValue() for safe nested access
  - _Requirements: 1.1, 1.4_

- [ ] 13. Implement simulation engine core
  - Create SimulationEngine class
  - Implement constructor to initialize with configuration
  - Add start(), pause(), resume(), stop() control methods
  - Implement setSpeed() to adjust cycles per second
  - Create processGeneration() method that orchestrates:
    - Apply property interactions to all Piros
    - Process resource gathering for all Piros
    - Consume resources for survival
    - Process reproduction attempts
    - Check natural death timers
    - Calculate survival and remove dead Piros
    - Update statistics and record history
  - _Requirements: 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 8.4, 8.5_

- [ ] 14. Implement CLI interface and entry point
  - Create index.js entry point
  - Implement command-line interface to launch simulation
  - Add command to specify custom configuration file
  - Implement console logging for generation statistics
  - Add controls for pause/resume/speed adjustment
  - _Requirements: 6.3, 6.4, 6.5_

- [ ] 15. Wire everything together and add error handling
  - Integrate all modules into SimulationEngine
  - Add error handling for configuration errors (invalid bounds, missing files, malformed JSON)
  - Implement runtime error handling (population extinction, property overflow, invalid state)
  - Add validation error handling (out-of-bounds values, negative population, invalid speed)
  - Test simulation with default configuration
  - Verify statistics tracking and variant emergence
  - _Requirements: All requirements_
