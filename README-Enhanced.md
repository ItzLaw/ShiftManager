# 📅 Enhanced Shift Manager Calendar Application

A comprehensive web-based calendar application for managing daily shifts with **star tracking**, **payment calculations**, and **comprehensive overview** features.

## ✨ Enhanced Features

### 🗓️ **Calendar Interface**
- **Monthly Calendar View**: Navigate between months with Previous/Next buttons
- **Day Selection**: Click on any day to assign shifts and track stars
- **Visual Status Indicators**: Color-coded dots show shift status at a glance
- **Star Display**: Shows total stars earned for each day directly on the calendar

### ⭐ **Star Tracking System**
- **Individual Star Tracking**: Track stars for each employee per shift
- **Real-time Updates**: Stars are displayed immediately on the calendar
- **Flexible Input**: Add any number of stars for each employee
- **Visual Feedback**: Star counts shown with ⭐ emoji on calendar days

### 💰 **Payment Calculation System**
- **Automatic Calculations**: Real-time payment calculations based on star rates
- **Bonus Tracking**: Automatic bonus calculations for achievements
- **Leaderboard Prizes**: Monthly leaderboard with prize distribution
- **Comprehensive Overview**: Total payouts and individual earnings

### 📊 **Overview & Analytics Tab**
- **Monthly Summary**: Total shifts, stars, average stars per shift, attendance
- **Payment Overview**: Basic pay, bonus pay, leaderboard prizes, total pay
- **Leaderboard**: Monthly ranking with detailed payment breakdown
- **Payment Rules**: Complete documentation of all payment rules

## 🕐 **Shift Management**

### **Four Shift Types with Correct Timings:**
- **Morning**: 6AM-12PM
- **Afternoon**: 12PM-6PM  
- **Evening**: 6PM-12AM
- **Night**: 12AM-6AM

### **Two Employees Per Shift:**
- Each shift can have up to 2 employees assigned
- Direct assignment without toggles
- Easy employee replacement

### **Pre-defined Employee Lists:**
- **Morning**: Bhargav, Pranav
- **Afternoon**: Guru, Kalyan
- **Evening**: Nawaz, Nithin
- **Night**: Vishrut, Vishnu

## 💡 **Payment Rules & Calculations**

### **Star Value Breakdown (per shift):**
| Star Range | Rate per Star |
|------------|---------------|
| 0 – 20 stars | ₹9 per star |
| 22 – 30 stars | ₹11 per star |
| 32 – 40 stars | ₹13.60 per star |
| 42+ stars | ₹14.60 per star |

### **Bonus Eligibility:**
- **Target Achievement Bonus**: ₹1,000 (800+ stars)
- **Attendance Bonus**: ₹1,000 (20+ working days)
- **Fuel Bonus**: ₹1,000 (20+ working days)

### **Leaderboard Prizes:**
- **1st Place**: ₹5,000
- **2nd Place**: ₹3,000
- **3rd Place**: ₹2,000

**Eligibility**: Must complete more than 600 stars to enter leaderboard

## 🚀 **How to Use**

### **1. Opening the Application**
- Open `shift-calendar-enhanced.html` in any modern web browser
- The application will load with the current month displayed

### **2. Navigating Between Tabs**
- **📅 Calendar Tab**: Main shift assignment and star tracking
- **📊 Overview & Payments Tab**: Analytics, payments, and leaderboard

### **3. Assigning Shifts & Tracking Stars**
1. **Click on any day** in the calendar
2. A modal will open showing all four shifts for that day
3. **Select employees** from the dropdown menus for each shift
4. **Add stars** using the star input fields for each employee
5. **Click "Add Stars"** to save star counts for that employee
6. **Provide reasons** when no employees are assigned
7. **Save changes** to update the calendar

### **4. Star Tracking Process**
1. **Assign employees** to shifts as usual
2. **Enter star count** in the star input field for each employee
3. **Click "Add Stars"** to record the stars for that employee
4. **Stars are displayed** immediately on the calendar day
5. **Payment calculations** update automatically in the Overview tab

### **5. Viewing Analytics & Payments**
1. **Click "📊 Overview & Payments"** tab
2. **View monthly summary** with total shifts, stars, and attendance
3. **Check payment overview** with basic pay, bonuses, and total pay
4. **Review leaderboard** with employee rankings and earnings
5. **Read payment rules** for complete understanding

## 📊 **Visual Status Indicators**

| Color | Status | Description |
|-------|--------|-------------|
| 🟢 Green | Complete | Both positions filled |
| 🟡 Yellow | Partial | One position filled |
| 🔴 Red | No Assignment | No employees assigned but reason provided |
| ⚫ Gray | No Data | No assignments or reason |

## 💰 **Payment Calculation Examples**

### **Example 1: Employee with 45 stars**
- 0-20 stars: 20 × ₹9 = ₹180
- 22-30 stars: 9 × ₹11 = ₹99
- 32-40 stars: 9 × ₹13.60 = ₹122.40
- 42+ stars: 7 × ₹14.60 = ₹102.20
- **Total Basic Pay**: ₹503.60

### **Example 2: Employee with 850 stars and 22 shifts**
- Basic Pay: Calculated using star rates
- Target Achievement Bonus: ₹1,000 (800+ stars)
- Attendance Bonus: ₹1,000 (20+ shifts)
- Fuel Bonus: ₹1,000 (20+ shifts)
- **Total Pay**: Basic Pay + ₹3,000 in bonuses

## 🏆 **Leaderboard System**

### **Eligibility Requirements:**
- Must complete more than 600 stars in the month
- Only weekday shifts count towards leaderboard
- Weekend shifts can compensate for missed weekdays

### **Tie-Break Rules:**
1. Higher attendance gets priority
2. If attendance is tied, prize money is split equally

### **Multiple Shifts Rule:**
- If working two shifts in one day, only 10 stars from second shift count for leaderboard
- Full payment is still received for all stars completed

## 🛠️ **Technical Features**

### **Data Management:**
- All data stored in browser memory
- Data persists during the session
- Refresh page to reset data

### **Browser Compatibility:**
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile and desktop
- No internet connection required (runs locally)

### **Performance:**
- Real-time calculations
- Instant updates across all tabs
- Smooth animations and transitions

## 📱 **Mobile Usage**

The application is fully responsive and works great on mobile devices:
- Touch-friendly interface
- Optimized layout for small screens
- Easy navigation and star input
- Responsive tables and grids

## 🔧 **Customization**

### **Adding New Employees:**
1. Open the shift assignment modal
2. Select "+ Add New Employee" from any dropdown
3. Enter the new employee name
4. The employee will be available for all future assignments

### **Modifying Payment Rules:**
Edit the `starRates` array in the JavaScript code:
```javascript
const starRates = [
    { min: 0, max: 20, rate: 9 },
    { min: 22, max: 30, rate: 11 },
    { min: 32, max: 40, rate: 13.60 },
    { min: 42, max: Infinity, rate: 14.60 }
];
```

### **Changing Default Employees:**
Edit the `defaultEmployees` object in the JavaScript code:
```javascript
const defaultEmployees = {
    morning: ['Bhargav', 'Pranav'],
    afternoon: ['Guru', 'Kalyan'],
    evening: ['Nawaz', 'Nithin'],
    night: ['Vishrut', 'Vishnu']
};
```

## 🆘 **Troubleshooting**

### **Common Issues:**
1. **Calendar not loading**: Refresh the page
2. **Changes not saving**: Make sure to click "Save Changes" before closing the modal
3. **Stars not updating**: Click "Add Stars" button after entering star count
4. **Payment calculations wrong**: Check that star counts are entered correctly

### **Browser Issues:**
- Clear browser cache if experiencing display issues
- Ensure JavaScript is enabled
- Try a different browser if problems persist

## 📞 **Support**

For technical support or feature requests, please refer to the application documentation or contact your system administrator.

---

**Version**: 2.0 Enhanced  
**Last Updated**: 2024  
**Compatibility**: Modern Web Browsers  
**Features**: Star Tracking, Payment Calculations, Leaderboard System
