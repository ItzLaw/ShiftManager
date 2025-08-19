require('dotenv').config();
const { Pool } = require('pg');

class DatabaseService {
    constructor() {
        // Use environment variable for database connection
        const connectionString = process.env.DATABASE_URL;
        
        if (!connectionString) {
            throw new Error('DATABASE_URL environment variable is required');
        }

        this.pool = new Pool({
            connectionString: connectionString,
            ssl: {
                rejectUnauthorized: false
            }
        });

        // Test connection
        this.testConnection();
    }

    async testConnection() {
        try {
            const result = await this.pool.query('SELECT NOW()');
            console.log('✅ Connected to Neon PostgreSQL database:', result.rows[0].now);
        } catch (error) {
            console.error('❌ Database connection error:', error);
        }
    }

    async initializeDatabase() {
        try {
            // Create shifts table
            await this.pool.query(`
                CREATE TABLE IF NOT EXISTS shifts (
                    id SERIAL PRIMARY KEY,
                    date_key VARCHAR(10) NOT NULL,
                    shift_id VARCHAR(20) NOT NULL,
                    employees JSONB DEFAULT '[]',
                    reason TEXT DEFAULT '',
                    stars JSONB DEFAULT '{}',
                    late JSONB DEFAULT '{}',
                    replacements JSONB DEFAULT '{}',
                    management_issue BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(date_key, shift_id)
                )
            `);

            // Create employees table
            await this.pool.query(`
                CREATE TABLE IF NOT EXISTS employees (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Create configuration table
            await this.pool.query(`
                CREATE TABLE IF NOT EXISTS configuration (
                    id SERIAL PRIMARY KEY,
                    key_name VARCHAR(100) UNIQUE NOT NULL,
                    value JSONB NOT NULL,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Insert default employees
            const defaultEmployees = ['Bhargav', 'Pranav', 'Guru', 'Kalyan', 'Nawaz', 'Nithin', 'Vishrut', 'Vishnu'];
            for (const emp of defaultEmployees) {
                await this.pool.query(`
                    INSERT INTO employees (name) 
                    VALUES ($1) 
                    ON CONFLICT (name) DO NOTHING
                `, [emp]);
            }

            // Insert default configuration
            const defaultConfig = {
                defaultEmployees: {
                    morning: ['Bhargav', 'Pranav'],
                    afternoon: ['Guru', 'Kalyan'],
                    evening: ['Nawaz', 'Nithin'],
                    night: ['Vishrut', 'Vishnu']
                },
                starRates: [
                    { min: 0, max: 20, rate: 9 },
                    { min: 22, max: 30, rate: 11 },
                    { min: 32, max: 40, rate: 13.60 },
                    { min: 42, max: 999999, rate: 14.60 }
                ],
                weekendRate: 14.60,
                bonuses: {
                    target800: 1000,
                    attendance20: 1000,
                    fuel: 1000
                },
                prizes: {
                    first: 1250,
                    second: 750,
                    third: 500
                }
            };

            await this.pool.query(`
                INSERT INTO configuration (key_name, value) 
                VALUES ('app_config', $1) 
                ON CONFLICT (key_name) DO UPDATE SET value = $1, updated_at = CURRENT_TIMESTAMP
            `, [JSON.stringify(defaultConfig)]);

            console.log('✅ Database initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing database:', error);
            throw error;
        }
    }

    async getShifts(startDate = null, endDate = null) {
        try {
            let query = 'SELECT * FROM shifts';
            let params = [];

            if (startDate && endDate) {
                query += ' WHERE date_key >= $1 AND date_key <= $2';
                params = [startDate, endDate];
            }

            query += ' ORDER BY date_key, shift_id';

            const result = await this.pool.query(query, params);
            
            // Transform data to match frontend format
            const shifts = {};
            result.rows.forEach(row => {
                if (!shifts[row.date_key]) {
                    shifts[row.date_key] = {};
                }
                shifts[row.date_key][row.shift_id] = {
                    employees: row.employees || [],
                    reason: row.reason || '',
                    stars: row.stars || {},
                    late: row.late || {},
                    replacements: row.replacements || {},
                    managementIssue: row.management_issue || false
                };
            });

            return shifts;
        } catch (error) {
            console.error('Error fetching shifts:', error);
            throw error;
        }
    }

    async saveShifts(date, shifts) {
        try {
            // Delete existing shifts for this date
            await this.pool.query('DELETE FROM shifts WHERE date_key = $1', [date]);

            // Insert new shifts
            for (const [shiftId, shiftData] of Object.entries(shifts)) {
                await this.pool.query(`
                    INSERT INTO shifts (date_key, shift_id, employees, reason, stars, late, replacements, management_issue)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [
                    date,
                    shiftId,
                    JSON.stringify(shiftData.employees || []),
                    shiftData.reason || '',
                    JSON.stringify(shiftData.stars || {}),
                    JSON.stringify(shiftData.late || {}),
                    JSON.stringify(shiftData.replacements || {}),
                    shiftData.managementIssue || false
                ]);
            }

            return { success: true, message: 'Shifts saved successfully' };
        } catch (error) {
            console.error('Error saving shifts:', error);
            throw error;
        }
    }

    async getEmployees() {
        try {
            const result = await this.pool.query('SELECT name FROM employees ORDER BY name');
            return result.rows.map(row => row.name);
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    }

    async addEmployee(name) {
        try {
            if (!name || name.trim() === '') {
                throw new Error('Employee name is required');
            }

            const result = await this.pool.query(
                'INSERT INTO employees (name) VALUES ($1) RETURNING id, name',
                [name.trim()]
            );

            return { success: true, employee: result.rows[0] };
        } catch (error) {
            if (error.code === '23505') { // Unique violation
                throw new Error('Employee already exists');
            }
            throw error;
        }
    }

    async getConfiguration() {
        try {
            const result = await this.pool.query('SELECT value FROM configuration WHERE key_name = $1', ['app_config']);
            if (result.rows.length > 0) {
                return result.rows[0].value;
            } else {
                throw new Error('Configuration not found');
            }
        } catch (error) {
            console.error('Error fetching configuration:', error);
            throw error;
        }
    }

    async saveConfiguration(config) {
        try {
            await this.pool.query(`
                INSERT INTO configuration (key_name, value) 
                VALUES ('app_config', $1) 
                ON CONFLICT (key_name) DO UPDATE SET value = $1, updated_at = CURRENT_TIMESTAMP
            `, [JSON.stringify(config)]);

            return { success: true, message: 'Configuration saved successfully' };
        } catch (error) {
            console.error('Error saving configuration:', error);
            throw error;
        }
    }

    async getWeekendPriority(month, year) {
        try {
            const result = await this.pool.query(
                'SELECT value FROM configuration WHERE key_name = $1',
                [`weekend_priority_${year}_${month}`]
            );
            
            if (result.rows.length > 0) {
                return result.rows[0].value;
            } else {
                return { data: [], month: parseInt(month), year: parseInt(year) };
            }
        } catch (error) {
            console.error('Error fetching weekend priority:', error);
            throw error;
        }
    }

    async saveWeekendPriority(data, month, year) {
        try {
            await this.pool.query(`
                INSERT INTO configuration (key_name, value) 
                VALUES ($1, $2) 
                ON CONFLICT (key_name) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
            `, [`weekend_priority_${year}_${month}`, JSON.stringify({ data, month, year, calculatedAt: new Date().toISOString() })]);

            return { success: true, message: 'Weekend priority data saved successfully' };
        } catch (error) {
            console.error('Error saving weekend priority:', error);
            throw error;
        }
    }

    async close() {
        await this.pool.end();
    }
}

module.exports = DatabaseService;
