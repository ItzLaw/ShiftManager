# 🔐 Shift Manager Login System

## Overview
The Shift Manager application now includes a secure login system with role-based access control to protect sensitive shift data and payment information. The app loads directly into viewer mode, with an admin login button for administrators.

## 🚀 Features

### Authentication System
- **Viewer-First Access**: App loads directly into viewer mode (no login required)
- **Admin Login Button**: Small login button in top-right corner for administrators
- **Session Management**: Automatic login persistence using localStorage
- **Logout Functionality**: Secure logout returns to viewer mode

### Role-Based Access Control
- **Administrator Role**: Full access to all features including data modification
- **Viewer Role**: Read-only access to view shift data and performance metrics (default mode)

### Security Features
- **Access Control**: Non-admin users cannot edit, add, or delete shift data
- **Function Protection**: Admin-only functions are hidden from non-admin users
- **Data Sanitization**: Sensitive data is hidden from console logs for non-admin users
- **Developer Tools Protection**: Prevents F12, Ctrl+Shift+I, and Ctrl+U for non-admin users
- **Right-Click Protection**: Disables context menu for non-admin users

### Admin-Only Features
- **Predefined Lists Management**: Configure default employee assignments, star rates, bonuses, and prizes
- **System Configuration**: Modify payment structures and incentive systems
- **Data Management**: Add, edit, delete, and import/export shift data
- **Performance Calculations**: Calculate performance metrics and leaderboards

## 👥 User Accounts

### Default Login Credentials

#### Administrator (Full Access)
- **Username**: `Raghu`
- **Password**: `@tmTPbhb123 shit`
- **Capabilities**: 
  - View all shift data
  - Add/edit/delete shifts
  - Add sample data
  - Clear all data
  - Import/export data
  - Calculate performance metrics
  - Calculate weekend priorities
  - Calculate weekly leaderboards
  - Debug functions
  - **Manage predefined lists and system configuration**

#### Administrator (Full Access)
- **Username**: `Bhargav`
- **Password**: `Ind@0509`
- **Capabilities**: 
  - View all shift data
  - Add/edit/delete shifts
  - Add sample data
  - Clear all data
  - Import/export data
  - Calculate performance metrics
  - Calculate weekend priorities
  - Calculate weekly leaderboards
  - Debug functions
  - **Manage predefined lists and system configuration**

#### Viewer Mode (Default - No Login Required)
- **Access**: Automatic when opening the app
- **Capabilities**:
  - View all shift data
  - View performance metrics
  - View weekend priorities
  - View leaderboards
  - Export data (read-only)

## 🔒 Security Implementation

### Frontend Security
- **Role Validation**: All sensitive functions check user permissions before execution
- **UI Hiding**: Admin-only buttons and controls are hidden from non-admin users
- **Access Denied Alerts**: Clear messages when users attempt unauthorized actions
- **Session Validation**: Automatic session checking on page load

### Data Protection
- **Read-Only Mode**: Non-admin users can view but not modify data
- **Function Blocking**: Admin-only functions return early with access denied messages
- **Console Protection**: Sensitive data logging is blocked for non-admin users

### Browser Security
- **Developer Tools**: Limited access for non-admin users
- **Source View**: Prevented for non-admin users
- **Context Menu**: Disabled for non-admin users

## 📱 User Interface

### Default Viewer Mode
- **Direct Access**: App loads immediately without login
- **Read-Only Interface**: All data visible but no editing capabilities
- **Admin Login Button**: Small blue button in top-right corner

### Admin Login Screen
- Clean, modern design with gradient background
- Username and password fields with proper validation
- Error message display for failed login attempts
- Responsive design for all device sizes

### User Info Display
- Top-right corner user information panel (only visible when logged in as admin)
- Shows current user name and role
- Logout button for easy session termination
- Semi-transparent design that doesn't obstruct content

### Admin Indicators
- Clear visual indicators for admin-only sections
- Lock icons (🔒) on admin-only content
- Explanatory text for why certain features are restricted

### Predefined Lists Management (Admin Only)
- **Default Employee Assignments**: Configure default staff for each shift type
- **Star Rate Configuration**: Set payment rates based on performance tiers
- **Bonus Configuration**: Manage achievement and attendance bonuses
- **Leaderboard Prizes**: Configure weekly prize amounts and distributions
- **Configuration Actions**: Save, reset, and load system settings

## 🛠️ Technical Implementation

### Authentication Flow
1. **Page Load**: App loads directly into viewer mode
2. **Admin Login**: Click admin login button to show login form
3. **Login Success**: Store session and switch to admin mode
4. **Logout**: Clear session and return to viewer mode

### Role-Based Access Control
- **Function Level**: Each sensitive function checks `isAdmin` flag
- **UI Level**: CSS classes control visibility of admin elements
- **Data Level**: Console logging is sanitized based on user role

### Session Management
- **localStorage**: Secure storage of user session data
- **Automatic Validation**: Session validation on every page load
- **Cleanup**: Proper session cleanup on logout

### Configuration Management
- **localStorage**: Save system configuration persistently
- **Real-time Updates**: Live calculation of prize pools and totals
- **Validation**: Input validation and error handling
- **Defaults**: Fallback to standard values if configuration is missing

## 🔧 Customization

### Adding New Users
To add new users, modify the `users` object in the JavaScript code:

```javascript
const users = {
    'newuser': {
        username: 'newuser',
        password: 'newpassword',
        role: 'admin', // or 'viewer'
        displayName: 'New User Name'
    }
};
```

### Modifying Roles
Change the `role` property to control access:
- `'admin'`: Full access to all features
- `'viewer'`: Read-only access (default mode)

### Adding Admin-Only Functions
To make a function admin-only, add this check at the beginning:

```javascript
function yourFunction() {
    if (!isAdmin) {
        alert('🔒 Access Denied: Only administrators can use this function.');
        return;
    }
    // Function logic here
}
```

### System Configuration
The predefined lists management allows admins to configure:
- **Employee Assignments**: Default staff for each shift
- **Payment Rates**: Star-based payment tiers
- **Bonus Structure**: Achievement and attendance rewards
- **Prize Distribution**: Weekly leaderboard incentives

## 🚨 Important Security Notes

### Production Deployment
- **Server-Side Validation**: This is a frontend-only implementation. In production, implement proper server-side authentication
- **Password Hashing**: Current passwords are stored in plain text. Use proper password hashing in production
- **HTTPS**: Always use HTTPS in production to protect login credentials
- **Session Tokens**: Consider implementing JWT or similar session management

### Current Limitations
- **Client-Side Only**: Authentication is handled entirely in the browser
- **Password Storage**: Passwords are stored in plain text in the source code
- **No Encryption**: Data is not encrypted, only access-controlled

## 📋 Usage Instructions

### First Time Setup
1. Open the application
2. App loads directly into viewer mode
3. Click "🔐 Admin Login" button in top-right corner to access admin features
4. Use admin credentials to log in

### Daily Usage
1. **Viewer Mode**: Default access - view all data without login
2. **Admin Mode**: Click login button and use admin credentials
3. **Logout**: Use logout button to return to viewer mode

### Admin Login
- **Raghu**: `Raghu` / `@tmTPbhb123 shit`
- **Bhargav**: `Bhargav` / `Ind@0509`

### Admin Features
- **Data Management**: Edit shifts, add sample data, import/export
- **System Configuration**: Manage predefined lists, payment rates, bonuses
- **Performance Analysis**: Calculate metrics, priorities, and leaderboards
- **Configuration Control**: Save, reset, and load system settings

### Troubleshooting
- **Can't Login**: Verify username and password are correct
- **Missing Features**: Check if you're logged in as an administrator
- **Access Denied**: You may not have permission for that action
- **Configuration Issues**: Use "Load Current Config" to restore saved settings

## 🔄 Updates and Maintenance

### Adding New Security Features
The system is designed to be easily extensible. Add new security measures in the `setupRoleBasedAccess()` function.

### Monitoring Access
Check browser console for access attempts and security events.

### User Management
Regularly review and update user accounts and permissions as needed.

### Configuration Management
- **Backup**: Export configuration data regularly
- **Updates**: Modify payment rates and bonuses as business needs change
- **Validation**: Test configuration changes in a safe environment first

---

**Note**: This is a frontend-only security implementation. For production use, implement proper server-side authentication and security measures.
