# Requirements Document

## Introduction

The Evolution Simulation is a JavaScript-based system that simulates the evolution of beings called Piros. Each Piro has genetic properties that affect their survival, reproduction, and interaction with other Piros. The simulation runs at an accelerated timespan, allowing users to observe evolutionary patterns over many generations. This simulation is part of a larger multi-simulation system where different simulation types (evolution, software dev team, etc.) share a common frontend but have distinct configuration and logic.

## Glossary

- **Piro**: A simulated being entity with genetic properties that determine its behavior and survival
- **Evolution Simulation**: A simulation type that models natural selection and genetic inheritance among Piros
- **Simulation Engine**: The core JavaScript system that processes simulation logic and updates Piro states
- **Genetic Property**: A numerical attribute of a Piro (e.g., strength, intelligence) that affects survival and reproduction
- **Genetic Variant**: A unique combination of genetic property values that defines a distinct Piro type
- **Mutation Probability**: The likelihood that a specific genetic property will change during reproduction
- **Generation**: A complete lifecycle iteration where Piros reproduce, mutate, and die based on their properties
- **Mutation**: A random change in offspring genetic properties during reproduction
- **Survivability**: The likelihood that a Piro will survive to reproduce based on its genetic properties and resources
- **Timespan**: The rate at which simulation time progresses relative to real time
- **Resources**: A numerical value representing the energy or materials a Piro needs to survive and reproduce
- **Death Rate**: The rate at which Piros die naturally due to age or resource depletion
- **Resource Efficiency**: A genetic property that determines how effectively a Piro gathers resources

## Requirements

### Requirement 1

**User Story:** As a user, I want to initialize an evolution simulation with configurable Piro properties, so that I can experiment with different evolutionary parameters

#### Acceptance Criteria

1. THE Simulation Engine SHALL load configuration files that define initial genetic property ranges for Piros
2. WHEN the user starts a new evolution simulation, THE Simulation Engine SHALL create an initial population of Piros with randomized genetic properties within configured ranges
3. THE Simulation Engine SHALL support the following genetic properties: replication rate, attractiveness, strength, mutation chance, intelligence, and resource efficiency
4. WHERE a configuration file specifies custom property ranges, THE Simulation Engine SHALL apply those ranges to the initial population
5. THE Simulation Engine SHALL validate that all genetic property values are within acceptable numerical bounds before creating Piros
6. WHERE a configuration specifies fixed initial values, THE Simulation Engine SHALL create all initial Piros with identical genetic properties
7. WHERE a configuration specifies randomized initial values, THE Simulation Engine SHALL generate genetic properties using random values within configured ranges for each initial Piro

### Requirement 2

**User Story:** As a user, I want Piros to reproduce based on their genetic properties and resource availability, so that I can observe how traits propagate through generations

#### Acceptance Criteria

1. WHEN a Piro's replication rate threshold is met, THE Simulation Engine SHALL attempt to create offspring
2. THE Simulation Engine SHALL calculate reproduction success probability based on the Piro's attractiveness property
3. THE Simulation Engine SHALL require a Piro to have sufficient resources before allowing reproduction
4. WHEN reproduction occurs, THE Simulation Engine SHALL deduct a configured resource cost from the parent Piro
5. WHEN offspring are created, THE Simulation Engine SHALL copy the parent's genetic properties as a base
6. THE Simulation Engine SHALL evaluate each genetic property independently for mutation
7. WHERE a property mutates, THE Simulation Engine SHALL modify that property value by a random percentage
8. THE Simulation Engine SHALL create a unique genetic variant identifier for each distinct combination of genetic properties
9. THE Simulation Engine SHALL track all Piros with identical genetic properties as the same variant type
8. THE Simulation Engine SHALL introduce randomness into the spawn timing by varying the replication rate check interval
9. WHERE configuration specifies spawn rate randomness, THE Simulation Engine SHALL apply a random modifier to each Piro's replication timing

### Requirement 3

**User Story:** As a user, I want Piro survival to depend on their genetic properties and resource availability, so that natural selection occurs in the simulation

#### Acceptance Criteria

1. THE Simulation Engine SHALL calculate a survivability score for each Piro based on strength, intelligence, and available resources
2. WHEN a generation cycle completes, THE Simulation Engine SHALL remove Piros with survivability scores below a threshold
3. THE Simulation Engine SHALL increase survival probability for Piros with higher strength values
4. THE Simulation Engine SHALL increase survival probability for Piros with higher intelligence values
5. THE Simulation Engine SHALL process survival checks for all Piros in each generation cycle
6. WHEN a Piro's resources reach zero, THE Simulation Engine SHALL remove that Piro from the population
7. THE Simulation Engine SHALL apply a natural death rate where Piros die after reaching a configured lifespan
8. THE Simulation Engine SHALL assign identical lifespans to all Piros of the same role type

### Requirement 4

**User Story:** As a user, I want genetic properties to interact with each other, so that the simulation exhibits complex evolutionary dynamics

#### Acceptance Criteria

1. THE Simulation Engine SHALL modify attractiveness based on a weighted combination of strength and intelligence
2. THE Simulation Engine SHALL reduce replication rate when strength falls below a threshold value
3. THE Simulation Engine SHALL increase mutation chance when intelligence exceeds a threshold value
4. THE Simulation Engine SHALL recalculate property interactions after each generation cycle
5. THE Simulation Engine SHALL apply interaction effects before calculating survivability scores

### Requirement 5

**User Story:** As a user, I want the simulation to run at an accelerated timespan, so that I can observe many generations quickly

#### Acceptance Criteria

1. THE Simulation Engine SHALL process generation cycles at a configurable rate measured in cycles per second
2. THE Simulation Engine SHALL support timespan acceleration rates of at least 10 generations per second
3. WHEN the simulation is running, THE Simulation Engine SHALL continuously process generation cycles without user intervention
4. THE Simulation Engine SHALL provide controls to pause, resume, and adjust the timespan acceleration rate
5. THE Simulation Engine SHALL maintain simulation state consistency across all generation cycles regardless of acceleration rate

### Requirement 6

**User Story:** As a user, I want the evolution simulation to be isolated in its own module, so that it can coexist with other simulation types

#### Acceptance Criteria

1. THE Simulation Engine SHALL organize evolution simulation code in a dedicated directory separate from other simulation types
2. THE Simulation Engine SHALL load evolution-specific configuration files from the evolution simulation directory
3. THE Simulation Engine SHALL expose a command interface that allows launching the evolution simulation independently
4. THE Simulation Engine SHALL implement evolution simulation logic without dependencies on other simulation type code
5. WHERE multiple simulation types exist, THE Simulation Engine SHALL allow running each simulation type through distinct commands

### Requirement 7

**User Story:** As a user, I want each genetic attribute to mutate independently during reproduction, so that I can observe complex evolutionary patterns

#### Acceptance Criteria

1. THE Simulation Engine SHALL evaluate mutation probability separately for each genetic property during reproduction
2. WHEN an offspring is created, THE Simulation Engine SHALL check each genetic property against its mutation probability
3. WHERE a property mutation occurs, THE Simulation Engine SHALL modify that property value by a random amount within configured bounds
4. THE Simulation Engine SHALL allow multiple properties to mutate simultaneously in a single offspring
5. THE Simulation Engine SHALL create a unique genetic profile for each mutated offspring
6. THE Simulation Engine SHALL track each unique genetic profile as a distinct variant in the population


### Requirement 8

**User Story:** As a user, I want Piros to gather and consume resources, so that resource management becomes a survival factor

#### Acceptance Criteria

1. THE Simulation Engine SHALL assign each Piro an initial resource amount based on configuration
2. WHEN a generation cycle processes, THE Simulation Engine SHALL allow each Piro to gather resources based on its resource efficiency property
3. THE Simulation Engine SHALL calculate resource gathering amount using the Piro's resource efficiency and a configured gather rate
4. WHEN a generation cycle processes, THE Simulation Engine SHALL deduct a configured consumption rate from each Piro's resources
5. THE Simulation Engine SHALL ensure that Piro resource values cannot fall below zero

### Requirement 9

**User Story:** As a user, I want to track population statistics over time, so that I can analyze evolutionary trends through graphs

#### Acceptance Criteria

1. THE Simulation Engine SHALL record population count for each role type at every generation
2. THE Simulation Engine SHALL calculate and store average genetic property values for the entire population at every generation
3. THE Simulation Engine SHALL maintain a historical record of statistics that can be exported for graphing
4. THE Simulation Engine SHALL provide access to current average statistics at any point during the simulation
5. THE Simulation Engine SHALL track birth and death counts for each generation
6. THE Simulation Engine SHALL format historical data in a structure suitable for time-series graphing
7. THE Simulation Engine SHALL identify and track all unique role types that emerge through mutation
