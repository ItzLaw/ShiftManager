require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const DatabaseService = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.static('.'));

// Initialize database service with error handling
let db;
try {
    console.log('🔧 Initializing database service...');
    console.log('🌍 Environment:', process.env.NODE_ENV);
    console.log('🗄️ Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    db = new DatabaseService();
    // Initialize database tables
    db.initializeDatabase().catch(console.error);
    console.log('✅ Database service initialized successfully');
} catch (error) {
    console.error('❌ Failed to initialize database service:', error.message);
    console.log('⚠️  Application will continue but database features will not work');
    console.log('💡 Check your DATABASE_URL environment variable');
}

// API Routes

// Helper function to check if database is available
function checkDatabaseAvailable(res) {
    if (!db) {
        return res.status(503).json({
            error: 'Database service unavailable',
            message: 'Please check your database configuration'
        });
    }
    return true;
}

// Get all shifts for a date range
app.get('/api/shifts', async (req, res) => {
    if (!checkDatabaseAvailable(res)) return;

    try {
        const { start_date, end_date } = req.query;
        const shifts = await db.getShifts(start_date, end_date);
        res.json(shifts);
    } catch (error) {
        console.error('Error fetching shifts:', error);
        res.status(500).json({ error: 'Failed to fetch shifts' });
    }
});

// Save shifts for a specific date
app.post('/api/shifts/:date', async (req, res) => {
    if (!checkDatabaseAvailable(res)) return;

    try {
        const { date } = req.params;
        const shifts = req.body;
        const result = await db.saveShifts(date, shifts);
        res.json(result);
    } catch (error) {
        console.error('Error saving shifts:', error);
        res.status(500).json({ error: 'Failed to save shifts' });
    }
});

// Get all employees
app.get('/api/employees', async (req, res) => {
    if (!checkDatabaseAvailable(res)) return;

    try {
        const employees = await db.getEmployees();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// Add new employee
app.post('/api/employees', async (req, res) => {
    if (!checkDatabaseAvailable(res)) return;

    try {
        const { name } = req.body;
        const result = await db.addEmployee(name);
        res.json(result);
    } catch (error) {
        if (error.message === 'Employee already exists') {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Error adding employee:', error);
            res.status(500).json({ error: 'Failed to add employee' });
        }
    }
});

// Get configuration
app.get('/api/config', async (req, res) => {
    if (!checkDatabaseAvailable(res)) return;

    try {
        const config = await db.getConfiguration();
        res.json(config);
    } catch (error) {
        console.error('Error fetching configuration:', error);
        res.status(500).json({ error: 'Failed to fetch configuration' });
    }
});

// Save configuration
app.post('/api/config', async (req, res) => {
    if (!checkDatabaseAvailable(res)) return;

    try {
        const config = req.body;
        const result = await db.saveConfiguration(config);
        res.json(result);
    } catch (error) {
        console.error('Error saving configuration:', error);
        res.status(500).json({ error: 'Failed to save configuration' });
    }
});

// Get weekend priority data
app.get('/api/weekend-priority', async (req, res) => {
    if (!checkDatabaseAvailable(res)) return;

    try {
        const { month, year } = req.query;
        if (!month || !year) {
            return res.status(400).json({ error: 'Month and year are required' });
        }
        const data = await db.getWeekendPriority(month, year);
        res.json(data);
    } catch (error) {
        console.error('Error fetching weekend priority:', error);
        res.status(500).json({ error: 'Failed to fetch weekend priority' });
    }
});

// Save weekend priority data
app.post('/api/weekend-priority', async (req, res) => {
    if (!checkDatabaseAvailable(res)) return;

    try {
        const { data, month, year } = req.body;
        const result = await db.saveWeekendPriority(data, month, year);
        res.json(result);
    } catch (error) {
        console.error('Error saving weekend priority:', error);
        res.status(500).json({ error: 'Failed to save weekend priority' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: db ? 'Connected' : 'Not Available',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Test endpoint for debugging
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'API is working!',
        timestamp: new Date().toISOString(),
        headers: req.headers,
        url: req.url
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('❌ Global error handler caught:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    console.log(`❌ API route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
        error: 'API endpoint not found',
        path: req.originalUrl,
        method: req.method
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🔄 Shutting down gracefully...');
    if (db) {
        await db.close();
    }
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} in your browser`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api/*`);
    if (db) {
        console.log(`🗄️ Database service initialized`);
    } else {
        console.log(`⚠️  Database service not available - check your configuration`);
    }
});
