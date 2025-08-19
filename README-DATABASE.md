# Shift Manager App with PostgreSQL Database

This is a shift management application that has been upgraded from localStorage to use a Neon PostgreSQL database, allowing multiple users to access and share data in real-time.

## 🚀 Features

- **Real-time Data Sharing**: All users can see the same shift data simultaneously
- **PostgreSQL Database**: Robust data storage with Neon serverless PostgreSQL
- **RESTful API**: Clean backend API for data operations
- **User Authentication**: Role-based access control (Manager/Viewer)
- **Auto-sync**: Data automatically syncs across all users
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Neon PostgreSQL database (already configured)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📊 Database Schema

The application automatically creates the following tables:

### `shifts` Table
- Stores all shift assignments and data
- Uses JSONB for flexible employee, stars, and replacement data
- Unique constraint on date + shift combination

### `employees` Table
- Stores all employee names
- Automatically populated with default employees

### `configuration` Table
- Stores app configuration and settings
- Includes default employee assignments, star rates, bonuses, and prizes

## 🔌 API Endpoints

### Shifts
- `GET /api/shifts` - Get all shifts (optionally filtered by date range)
- `POST /api/shifts/:date` - Save shifts for a specific date

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Add new employee

### Configuration
- `GET /api/config` - Get app configuration
- `POST /api/config` - Save app configuration

### Weekend Priority
- `GET /api/weekend-priority` - Get weekend priority data
- `POST /api/weekend-priority` - Save weekend priority data

### Health Check
- `GET /api/health` - Server health status

## 🔐 Authentication

The app supports two user roles:

- **Manager/Admin**: Can edit shifts, add employees, modify configuration
- **Viewer**: Can view data but cannot make changes

Default login credentials:
- Username: `Raghu`, Password: `@tmTPbhb123 shit`
- Username: `Bhargav`, Password: `Ind@0509`

## 📱 Usage

1. **Login**: Use manager credentials to access full features
2. **View Mode**: Access as viewer to see data without editing
3. **Calendar**: Click on any date to assign shifts and track stars
4. **Performance**: View individual performance metrics and calculations
5. **Configuration**: Managers can modify default assignments and rates

## 🌐 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
- `PORT`: Server port (default: 3000)
- Database connection is configured in `database.js`

## 🔄 Data Migration

If you have existing localStorage data:

1. Export your current data using the Export button
2. Start the new database-connected version
3. Import your data using the Import button
4. All data will be automatically saved to the database

## 🐛 Troubleshooting

### Database Connection Issues
- Check your Neon database connection string
- Ensure the database is accessible from your network
- Verify SSL settings in `database.js`

### API Errors
- Check browser console for error messages
- Verify the server is running on the correct port
- Check network connectivity

### Data Not Syncing
- Refresh the page to reload data from database
- Check if other users can see your changes
- Verify the API service is working correctly

## 📈 Performance

- Database queries are optimized with proper indexing
- JSONB fields provide efficient storage for complex data
- Connection pooling ensures optimal database performance
- Real-time updates without page refreshes

## 🔒 Security

- Input validation on all API endpoints
- SQL injection protection through parameterized queries
- Role-based access control for sensitive operations
- Secure database connections with SSL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the browser console for errors
3. Check the server logs for backend issues
4. Create an issue in the repository

---

**Note**: This application is now fully database-connected and will automatically sync data across all users. No more localStorage limitations!
