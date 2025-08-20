// API Service for Shift Manager App
class ApiService {
    constructor() {
        // Handle both development and production environments
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.baseUrl = window.location.origin; // Local development
        } else {
            // Production - use the current domain
            this.baseUrl = window.location.origin;
        }
        this.apiUrl = `${this.baseUrl}/api`;
        console.log('🔧 ApiService initialized with:', { baseUrl: this.baseUrl, apiUrl: this.apiUrl });
    }

    // Generic API call method
    async apiCall(endpoint, options = {}) {
        try {
            const url = `${this.apiUrl}${endpoint}`;
            console.log(`🌐 Making API call to: ${url}`);
            
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            console.log(`📡 Response status: ${response.status} for ${endpoint}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error(`❌ API error for ${endpoint}:`, { status: response.status, error: errorData });
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`✅ API call successful for ${endpoint}:`, data);
            return data;
        } catch (error) {
            console.error(`❌ API call failed for ${endpoint}:`, error);
            throw error;
        }
    }

    // Shifts API
    async getShifts(startDate = null, endDate = null) {
        let endpoint = '/shifts';
        if (startDate && endDate) {
            endpoint += `?start_date=${startDate}&end_date=${endDate}`;
        }
        return await this.apiCall(endpoint);
    }

    async saveShifts(date, shifts) {
        return await this.apiCall(`/shifts/${date}`, {
            method: 'POST',
            body: JSON.stringify(shifts)
        });
    }

    // Employees API
    async getEmployees() {
        return await this.apiCall('/employees');
    }

    async addEmployee(name) {
        return await this.apiCall('/employees', {
            method: 'POST',
            body: JSON.stringify({ name })
        });
    }

    // Configuration API
    async getConfiguration() {
        return await this.apiCall('/config');
    }

    async saveConfiguration(config) {
        return await this.apiCall('/config', {
            method: 'POST',
            body: JSON.stringify(config)
        });
    }

    // Weekend Priority API
    async getWeekendPriority(month, year) {
        return await this.apiCall(`/weekend-priority?month=${month}&year=${year}`);
    }

    async saveWeekendPriority(data, month, year) {
        return await this.apiCall('/weekend-priority', {
            method: 'POST',
            body: JSON.stringify({ data, month, year })
        });
    }

    // Health check
    async healthCheck() {
        return await this.apiCall('/health');
    }

    // Test connection
    async testConnection() {
        try {
            const result = await this.healthCheck();
            console.log('✅ API connection successful:', result);
            return true;
        } catch (error) {
            console.error('❌ API connection failed:', error);
            return false;
        }
    }
}

// Create global instance
window.apiService = new ApiService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiService;
}
