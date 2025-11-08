# React Frontend Requirements

## Introduction

Build a modern, responsive React-based dashboard for the Evolution Simulation that provides real-time visualization and interactive controls.

## Glossary

- **Dashboard**: The main web interface for the simulation
- **React**: JavaScript library for building user interfaces
- **Recharts**: React charting library for data visualization
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

## Requirements

### Requirement 1: Real-time Data Visualization

**User Story:** As a user, I want to see live charts and statistics, so that I can observe evolution happening in real-time.

#### Acceptance Criteria

1. WHEN the simulation is running, THE Dashboard SHALL update all visualizations every 100 milliseconds
2. THE Dashboard SHALL display a line chart showing population and variant count over time
3. THE Dashboard SHALL display a bar chart showing the top 10 genetic variants
4. THE Dashboard SHALL display a multi-line chart tracking all six genetic properties
5. THE Dashboard SHALL display progress bars for average genetic properties

### Requirement 2: Interactive Controls

**User Story:** As a user, I want to control the simulation through the UI, so that I can start, pause, and adjust parameters easily.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a Start button to begin the simulation
2. THE Dashboard SHALL provide a Pause button to pause without losing state
3. THE Dashboard SHALL provide a Reset button to restart with a new population
4. THE Dashboard SHALL provide a speed slider to adjust cycles per second from 1 to 100
5. WHEN a control is activated, THE Dashboard SHALL provide visual feedback within 100 milliseconds

### Requirement 3: Statistics Display

**User Story:** As a user, I want to see key statistics at a glance, so that I can quickly understand the population state.

#### Acceptance Criteria

1. THE Dashboard SHALL display total population count
2. THE Dashboard SHALL display unique variant count
3. THE Dashboard SHALL display births and deaths per generation
4. THE Dashboard SHALL display average resources and age
5. THE Dashboard SHALL update all statistics in real-time during simulation

### Requirement 4: Responsive Design

**User Story:** As a user, I want to use the dashboard on any device, so that I can monitor simulations from desktop or mobile.

#### Acceptance Criteria

1. THE Dashboard SHALL adapt layout for screen widths from 320px to 2560px
2. THE Dashboard SHALL maintain usability on touch devices
3. THE Dashboard SHALL display all critical information without horizontal scrolling
4. WHEN screen size changes, THE Dashboard SHALL reorganize components within 300 milliseconds

### Requirement 5: Performance

**User Story:** As a user, I want smooth performance, so that I can run simulations at high speeds without lag.

#### Acceptance Criteria

1. THE Dashboard SHALL maintain 60 frames per second during chart updates
2. THE Dashboard SHALL handle populations up to 1000 Piros without performance degradation
3. THE Dashboard SHALL use memoization to prevent unnecessary re-renders
4. THE Dashboard SHALL debounce user inputs to optimize performance

### Requirement 6: Error Handling

**User Story:** As a user, I want clear error messages, so that I can understand and resolve issues quickly.

#### Acceptance Criteria

1. WHEN an API error occurs, THE Dashboard SHALL display a user-friendly error message
2. WHEN the backend is unavailable, THE Dashboard SHALL show a connection error with retry option
3. WHEN population goes extinct, THE Dashboard SHALL display an extinction notification
4. THE Dashboard SHALL log errors to the console for debugging

### Requirement 7: Accessibility

**User Story:** As a user with accessibility needs, I want keyboard navigation and screen reader support, so that I can use the dashboard effectively.

#### Acceptance Criteria

1. THE Dashboard SHALL support keyboard navigation for all interactive elements
2. THE Dashboard SHALL provide ARIA labels for screen readers
3. THE Dashboard SHALL maintain color contrast ratios of at least 4.5:1
4. THE Dashboard SHALL support keyboard shortcuts for common actions

### Requirement 8: Data Export

**User Story:** As a user, I want to export simulation data, so that I can analyze results offline.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a button to export statistics as CSV
2. THE Dashboard SHALL provide a button to export chart data as JSON
3. WHEN export is triggered, THE Dashboard SHALL download the file within 1 second
4. THE Dashboard SHALL include timestamps in exported data

### Requirement 9: Theme Support

**User Story:** As a user, I want to choose between light and dark themes, so that I can use the dashboard comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a theme toggle button
2. THE Dashboard SHALL persist theme preference in local storage
3. WHEN theme changes, THE Dashboard SHALL update all components within 200 milliseconds
4. THE Dashboard SHALL maintain readability in both light and dark modes
