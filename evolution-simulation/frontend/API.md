# API Documentation

## Overview

The frontend communicates with the backend API running on `http://localhost:3001` (configurable via `VITE_API_URL`).

## API Client

The API client is implemented in `src/services/api.js` using Axios.

### Configuration

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

### Interceptors

**Request Interceptor**:
- Can add authentication tokens
- Logs requests in development

**Response Interceptor**:
- Handles common errors
- Logs errors to console
- Provides user-friendly error messages

## Endpoints

### Initialize Simulation

Initialize a new simulation with default parameters.

**Endpoint**: `POST /init`

**Request**: No body

**Response**:
```json
{
  "success": true
}
```

**Usage**:
```javascript
const result = await api.init();
```

### Start Simulation

Start or resume the simulation.

**Endpoint**: `POST /start`

**Request**: No body

**Response**:
```json
{
  "success": true
}
```

**Usage**:
```javascript
const result = await api.start();
```

### Pause Simulation

Pause the simulation without losing state.

**Endpoint**: `POST /pause`

**Request**: No body

**Response**:
```json
{
  "success": true
}
```

**Usage**:
```javascript
const result = await api.pause();
```

### Reset Simulation

Reset the simulation to initial state.

**Endpoint**: `POST /reset`

**Request**: No body

**Response**:
```json
{
  "success": true
}
```

**Usage**:
```javascript
const result = await api.reset();
```

### Set Speed

Set the simulation speed (cycles per second).

**Endpoint**: `POST /speed`

**Request**:
```json
{
  "speed": 10
}
```

**Parameters**:
- `speed` (number) - Cycles per second (1-100)

**Response**:
```json
{
  "success": true
}
```

**Usage**:
```javascript
const result = await api.setSpeed(50);
```

### Get Statistics

Get current simulation statistics.

**Endpoint**: `GET /stats`

**Request**: No parameters

**Response**:
```json
{
  "generation": 1234,
  "totalPopulation": 487,
  "uniqueVariants": 23,
  "birthsThisGeneration": 45,
  "deathsThisGeneration": 38,
  "averageResources": 12.5,
  "averageAge": 15.3,
  "averageGenetics": {
    "replicationRate": 0.523,
    "attractiveness": 0.678,
    "strength": 0.445,
    "mutationChance": 0.234,
    "intelligence": 0.567,
    "resourceEfficiency": 0.789
  },
  "populationByVariant": {
    "variant-abc": 123,
    "variant-def": 98,
    "variant-ghi": 87
  }
}
```

**Usage**:
```javascript
const stats = await api.getStats();
```

### Get Status

Get simulation status.

**Endpoint**: `GET /status`

**Request**: No parameters

**Response**:
```json
{
  "isRunning": true,
  "speed": 10,
  "generation": 1234
}
```

**Usage**:
```javascript
const status = await api.getStatus();
```

## Error Handling

### Error Types

**Connection Refused (ECONNREFUSED)**:
- Backend server is not running
- Wrong API URL

**HTTP Errors**:
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

### Error Handling in Components

```javascript
try {
  const result = await api.start();
  if (result.success) {
    // Handle success
  }
} catch (error) {
  if (error.code === 'ECONNREFUSED') {
    console.error('Backend server not running');
  } else if (error.response) {
    console.error('API Error:', error.response.status);
  } else {
    console.error('Network Error:', error.message);
  }
}
```

## Polling Strategy

The frontend polls the `/stats` endpoint at regular intervals when the simulation is running.

**Default Interval**: 100ms

**Implementation**:
```javascript
usePolling(fetchStats, 100, isRunning);
```

**Optimization**:
- Only polls when simulation is running
- Errors don't trigger toast notifications (to avoid spam)
- Failed requests are logged to console

## Data Transformation

### Variant Data

The API returns `populationByVariant` as an object. The frontend transforms it for charts:

```javascript
const variantData = Object.entries(statistics.populationByVariant)
  .map(([variantId, count]) => ({ variantId, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);
```

### History Data

The frontend maintains a rolling history of statistics for charts:

```javascript
setHistory(prev => {
  const newHistory = [...prev, {
    generation: stats.generation,
    population: stats.totalPopulation,
    variants: stats.uniqueVariants,
    ...stats.averageGenetics,
  }];
  return newHistory.slice(-100); // Keep last 100 points
});
```

## Environment Variables

Configure the API URL using environment variables:

**.env**:
```
VITE_API_URL=http://localhost:3001
```

**Access in code**:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL;
```

## CORS Configuration

The backend must allow CORS requests from the frontend origin.

**Backend CORS Setup** (example):
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Testing API Endpoints

You can test endpoints using curl:

```bash
# Initialize
curl -X POST http://localhost:3001/init

# Start
curl -X POST http://localhost:3001/start

# Get stats
curl http://localhost:3001/stats

# Set speed
curl -X POST http://localhost:3001/speed \
  -H "Content-Type: application/json" \
  -d '{"speed": 50}'
```

## Future Enhancements

Potential API improvements:

1. **Authentication**: Add JWT tokens for secure access
2. **WebSockets**: Real-time updates instead of polling
3. **Batch Operations**: Multiple commands in one request
4. **Configuration Endpoint**: Save/load simulation configs
5. **Export Endpoint**: Export data as CSV/JSON
6. **History Endpoint**: Get historical data for specific ranges
