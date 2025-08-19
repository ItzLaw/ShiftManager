# Shift Manager App

A comprehensive shift management application with PostgreSQL database integration, designed for managing employee shifts, tracking performance metrics, and handling scheduling operations.

## Features

- **Shift Management**: Create, edit, and manage daily shifts
- **Employee Management**: Add, remove, and track employees
- **Performance Tracking**: Star-based rating system with configurable rates
- **Weekend Priority System**: Manage weekend shift assignments
- **Configuration Management**: Customizable rates, bonuses, and prizes
- **Real-time Updates**: Database-driven data persistence with fallback to localStorage
- **Role-based Access**: Admin and viewer roles with different permissions

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Neon serverless)
- **Deployment**: Vercel-ready configuration

## Quick Start

### Prerequisites

- Node.js 16+ 
- PostgreSQL database (Neon recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd shift-manager-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.example .env
   # Edit .env with your database connection string
   ```

4. **Start the application**:
   ```bash
   npm start
   ```

5. **Open your browser**:
   ```
   http://localhost:3000
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=your_postgresql_connection_string
CORS_ORIGIN=*
NODE_ENV=development
PORT=3000
```

## Database Schema

The application uses three main tables:

- **shifts**: Daily shift data with employee assignments
- **employees**: Employee information and metadata
- **configuration**: Application settings and rates

## API Endpoints

- `GET /api/shifts` - Retrieve shift data
- `POST /api/shifts/:date` - Save shift data
- `GET /api/employees` - Get employee list
- `POST /api/employees` - Add new employee
- `GET /api/config` - Get configuration
- `POST /api/config` - Save configuration
- `GET /api/health` - Health check

## Deployment

### Local Development

```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production Deployment

#### Option 1: Traditional Hosting

```bash
npm start
```

#### Option 2: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed Vercel deployment instructions.

## Project Structure

```
shift-manager-app/
├── api/                 # Backend API folder
│   ├── server.js        # Express.js server
│   ├── database.js      # Database service layer
│   └── api-service.js   # Frontend API client
├── index.html           # Main application
├── package.json         # Dependencies
├── package-lock.json    # Lock file
├── vercel.json          # Vercel configuration
├── .env                 # Environment variables (create this)
├── .gitignore           # Git ignore file
└── README files
```

## Development Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (placeholder)

## Database Connection

The app connects to a Neon serverless PostgreSQL database by default. Connection details are managed through environment variables for security.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section in VERCEL_DEPLOYMENT.md
2. Review application logs
3. Verify database connectivity
4. Check environment variable configuration

## Changelog

### v1.0.0
- Initial release with PostgreSQL integration
- Full shift management functionality
- Employee and configuration management
- Vercel deployment support
- Environment variable configuration
- Organized backend structure for Vercel hosting