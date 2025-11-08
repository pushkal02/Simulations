# React Frontend Implementation Tasks

## Overview
Replace the vanilla JavaScript frontend with a modern React-based application featuring real-time visualization, interactive controls, and professional UI components.

## Technology Stack
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Recharts**: React charting library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Axios**: HTTP client for API calls

## Task Breakdown

### Phase 1: Project Setup

- [x] 1. Initialize React + Vite project
  - Create new React app with Vite
  - Configure TypeScript (optional) or JavaScript
  - Set up project structure
  - Install core dependencies

- [x] 2. Install and configure dependencies
  - Install Recharts for data visualization
  - Install Tailwind CSS and configure
  - Install Lucide React for icons
  - Install Axios for API calls
  - Set up development environment

- [x] 3. Configure build and development
  - Set up Vite config for proxy to backend
  - Configure Tailwind CSS
  - Set up hot module replacement
  - Configure production build

### Phase 2: Core Components

- [ ] 4. Create layout components
  - Header component with status and generation counter
  - Sidebar/navigation (if needed)
  - Main dashboard layout
  - Footer component

- [ ] 5. Build control panel components
  - Start/Pause/Reset buttons
  - Speed slider component
  - Status indicator component
  - Control panel container

- [ ] 6. Create statistics display components
  - StatCard component for individual metrics
  - StatsGrid component for layout
  - Real-time value updates
  - Color-coded indicators

### Phase 3: Chart Components

- [ ] 7. Population over time chart
  - Line chart with Recharts
  - Dual Y-axis for population and variants
  - Responsive sizing
  - Tooltip with detailed info
  - Legend

- [ ] 8. Variant distribution chart
  - Bar chart for top 10 variants
  - Color-coded bars
  - Responsive layout
  - Animated transitions
  - Tooltip with percentage

- [ ] 9. Genetic traits over time chart
  - Multi-line chart with 6 properties
  - Color-coded lines
  - Legend with toggle
  - Zoom and pan capabilities
  - Responsive design

- [ ] 10. Genetic properties progress bars
  - Custom progress bar component
  - Animated transitions
  - Value labels
  - Color gradients
  - Responsive layout

### Phase 4: State Management & API Integration

- [ ] 11. Set up API service layer
  - Create API client with Axios
  - Define all API endpoints
  - Error handling
  - Request/response interceptors
  - TypeScript types (if using TS)

- [ ] 12. Implement state management
  - React Context for global state
  - Custom hooks for simulation control
  - Custom hooks for data fetching
  - State for charts and statistics
  - Loading and error states

- [ ] 13. Real-time data polling
  - Set up polling mechanism
  - Update interval management
  - Automatic reconnection
  - Pause polling when inactive
  - Optimize re-renders

### Phase 5: Advanced Features

- [ ] 14. Event log component
  - Scrollable event list
  - Color-coded event types
  - Timestamp formatting
  - Auto-scroll to latest
  - Event filtering

- [ ] 15. Responsive design
  - Mobile-first approach
  - Breakpoint management
  - Touch-friendly controls
  - Collapsible sections
  - Adaptive chart sizing

- [ ] 16. Performance optimizations
  - Memoization with React.memo
  - useMemo for expensive calculations
  - useCallback for event handlers
  - Virtual scrolling for event log
  - Debounced updates

### Phase 6: UI/UX Enhancements

- [ ] 17. Loading states and skeletons
  - Loading spinner component
  - Skeleton screens for charts
  - Loading states for all async operations
  - Smooth transitions

- [ ] 18. Error handling and notifications
  - Error boundary component
  - Toast notifications
  - Error messages
  - Retry mechanisms
  - User-friendly error displays

- [ ] 19. Animations and transitions
  - Smooth chart animations
  - Button hover effects
  - Page transitions
  - Loading animations
  - Micro-interactions

- [ ] 20. Dark mode support
  - Theme context
  - Dark mode toggle
  - Color scheme switching
  - Persistent theme preference
  - Smooth theme transitions

### Phase 7: Additional Features

- [ ] 21. Configuration panel
  - Modal or drawer for settings
  - Form for simulation parameters
  - Validation
  - Apply changes without restart
  - Reset to defaults

- [ ] 22. Data export functionality
  - Export statistics to CSV
  - Export chart data
  - Download screenshots
  - Export configuration
  - Share simulation state

- [ ] 23. Keyboard shortcuts
  - Space for start/pause
  - R for reset
  - +/- for speed adjustment
  - Keyboard shortcut help modal
  - Accessibility improvements

- [ ] 24. Advanced visualizations
  - Variant family tree (optional)
  - 3D scatter plot (optional)
  - Heat map for genetic properties
  - Population density visualization
  - Interactive tooltips

### Phase 8: Documentation & Build

- [ ] 25. Documentation
  - Component documentation
  - API documentation
  - User guide
  - Developer guide
  - Deployment guide

### Phase 9: Build & Deployment

- [ ] 26. Production build optimization
  - Code splitting
  - Lazy loading
  - Asset optimization
  - Bundle size analysis
  - Performance profiling

- [ ] 27. Deployment setup
  - Build scripts
  - Environment variables
  - Static file serving
  - Docker configuration (optional)
  - CI/CD pipeline (optional)

- [ ] 28. Final polish
  - Cross-browser testing
  - Mobile device testing
  - Performance optimization
  - Accessibility audit
  - Final bug fixes

## File Structure

```
evolution-simulation/
├── frontend/                    # New React app
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Layout.jsx
│   │   │   ├── controls/
│   │   │   │   ├── ControlPanel.jsx
│   │   │   │   ├── SpeedSlider.jsx
│   │   │   │   └── StatusIndicator.jsx
│   │   │   ├── stats/
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── StatsGrid.jsx
│   │   │   │   └── GeneticBars.jsx
│   │   │   ├── charts/
│   │   │   │   ├── PopulationChart.jsx
│   │   │   │   ├── VariantChart.jsx
│   │   │   │   └── GeneticsChart.jsx
│   │   │   ├── events/
│   │   │   │   ├── EventLog.jsx
│   │   │   │   └── EventItem.jsx
│   │   │   └── common/
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       └── ProgressBar.jsx
│   │   ├── hooks/
│   │   │   ├── useSimulation.js
│   │   │   ├── usePolling.js
│   │   │   └── useChartData.js
│   │   ├── context/
│   │   │   ├── SimulationContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
├── server.js                    # Existing backend (keep as is)
└── src/                         # Existing simulation code (keep as is)
```

## Dependencies to Install

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.0",
    "axios": "^1.6.0",
    "lucide-react": "^0.300.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

## API Endpoints (Already Implemented)

- `GET /api/init` - Initialize simulation
- `POST /api/start` - Start simulation
- `POST /api/pause` - Pause simulation
- `POST /api/reset` - Reset simulation
- `POST /api/speed` - Update speed
- `GET /api/stats` - Get current statistics

## Success Criteria

- [ ] All charts render correctly and update in real-time
- [ ] Controls are responsive and intuitive
- [ ] Mobile-friendly responsive design
- [ ] Performance: 60fps at 100 cycles/second
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Clean, maintainable code with proper component structure
- [ ] Comprehensive documentation

## Timeline Estimate

- **Phase 1-2**: 1-2 days (Setup + Core Components)
- **Phase 3**: 1-2 days (Charts)
- **Phase 4**: 1 day (State Management)
- **Phase 5**: 1 day (Advanced Features)
- **Phase 6**: 1 day (UI/UX)
- **Phase 7**: 1-2 days (Additional Features)
- **Phase 8**: 0.5 day (Documentation)
- **Phase 9**: 1 day (Build & Deploy)

**Total**: 7-11 days for full implementation

**Note**: Testing tasks (unit tests, E2E tests) have been deferred for later implementation.

## Priority Levels

**P0 (Must Have)**:
- Tasks 1-13: Core functionality
- Tasks 14-15: Essential features
- Task 28: Production build

**P1 (Should Have)**:
- Tasks 16-19: Performance and UX
- Task 25: Documentation

**P2 (Nice to Have)**:
- Tasks 20-24: Advanced features
- Task 27-28: Deployment and polish

**Deferred for Later**:
- Component unit testing
- Integration testing
- E2E testing (Playwright/Cypress)
- Test coverage reports

## Notes

- Keep existing backend server.js unchanged
- React app will proxy API calls to backend
- Use Vite for fast development and optimized builds
- Tailwind CSS for rapid UI development
- Recharts for React-native charting
- Focus on component reusability and clean architecture
