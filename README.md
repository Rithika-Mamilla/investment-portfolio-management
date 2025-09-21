# Investment Portfolio Management System

A comprehensive Vue.js application for wealth management firms to digitize their investment portfolio tracking, eliminate data loss, avoid miscommunication, and improve client engagement.

## 🚀 Features

### User Management
- **UserList.vue** - Display all clients in a comprehensive table with ID column, search and filtering
- **UserForm.vue** - Create and edit client information with validation and risk profile selection

### Portfolio Management
- **PortfolioList.vue** - Display all portfolios with advanced filtering (UPCOMING, ACTIVE, CLOSED)
- **PortfolioDetail.vue** - Show detailed portfolio information including returns, risk level, and client info
- **PortfolioForm.vue** - Create and update portfolios with streamlined interface

### Additional Features
- **Dashboard** - Overview with key statistics and quick actions
- **Responsive Design** - Mobile-friendly interface using Tailwind CSS
- **Real-time Data** - Vuex store for state management
- **Comprehensive Testing** - Unit tests with Jest for all major components

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite
- **State Management**: Vuex 
- **Routing**: Vue Router 
- **Styling**: Tailwind CSS
- **Testing**: Jest with Vue Test Utils and jsdom
- **Package Manager**: npm

## 📁 Project Structure

```
investment-portfolio-management/
│
├── public/                
│   └── favicon.ico
│
├── src/
│   ├── assets/            
│   │   └── logo.png
│   │
│   ├── components/        # Reusable UI components
│   │   ├── NavigationBar.vue
│   │   └── Footer.vue
│   │
│   ├── views/             # Page-level components (for routing)
│   │   ├── users/
│   │   │   ├── UserList.vue
│   │   │   └── UserForm.vue
│   │   │
│   │   ├── portfolios/
│   │   │   ├── PortfolioList.vue
│   │   │   ├── PortfolioDetail.vue
│   │   │   └── PortfolioForm.vue
│   │   │
│   │   └── Home.vue
│   │
│   ├── store/             # Vuex store
│   │   ├── index.js          # Root store
│   │   ├── user.js           # User module
│   │   └── portfolio.js      # Portfolio module
│   │
│   ├── router/            # Vue Router
│   │   └── index.js
│   │
│   ├── App.vue               # Root Vue component
│   ├── main.js               # App entry (createApp)
│   └── style.css             # Tailwind + custom global styles
│
├── tests/
│   ├── UserForm.spec.js
│   ├── PortfolioList.spec.js
│   └── PortfolioDetail.spec.js
├── package.json              
├── tailwind.config.js        
├── postcss.config.js         
├── vite.config.js            
├── jest.config.cjs           
├── babel.config.cjs          
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd investment-portfolio-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 📱 Application Features

### Dashboard
- Overview of key metrics (total clients, active portfolios, total value, returns)
- Recent portfolios display
- Quick action buttons for common tasks

### Client Management
- **Client List**: View all clients with ID column, search and filtering capabilities
- **Client Form**: Add new clients or edit existing ones with comprehensive validation
- **Client Information**: Personal details, contact information, and risk profile selection

### Portfolio Management
- **Portfolio List**: View all portfolios with status-based filtering and risk level display
- **Portfolio Detail**: Comprehensive view of portfolio performance, risk level, and client information
- **Portfolio Form**: Create new portfolios or edit existing ones with streamlined interface
- **Portfolio Overview**: Key metrics including total value, returns, and risk assessment

### Data Management
- **Vuex Store**: Centralized state management for users and portfolios
- **Mock Data**: Pre-populated with sample data for demonstration

## 🎨 UI/UX Features

### Design System
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **Responsive Design**: Mobile-first approach with breakpoints
- **Color Scheme**: Professional color palette with primary, secondary, and status colors
- **Typography**: Clean, readable fonts with proper hierarchy

### User Experience
- **Intuitive Navigation**: Clear navigation with sidebar and top navbar
- **Search & Filter**: Advanced filtering capabilities across all views
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback during data operations
- **Empty States**: Helpful messages when no data is available

## 🧪 Testing

The application includes comprehensive unit tests using Jest for all major components:

### Test Coverage
- **UserForm.test.js**: Tests form validation, submission, and data loading
- **PortfolioList.test.js**: Tests filtering, search, and display functionality
- **PortfolioDetail.test.js**: Tests data display and navigation

### Test Configuration
- **Jest**: Modern testing framework with jsdom environment
- **Vue Test Utils**: Official Vue.js testing utilities
- **Babel**: ES6+ support for test files
- **Coverage Reports**: Detailed test coverage analysis

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 🔧 Configuration

### Tailwind CSS
The application uses Tailwind CSS with a custom configuration:
- Custom color palette with primary colors
- Extended theme for consistent design
- Responsive breakpoints

### Vite Configuration
- Vue.js plugin for SFC support
- Development server settings
- Production build optimization

### Jest Configuration
- jsdom environment for DOM testing
- Vue 3 component support
- Babel transformation for ES6+ features
- Module name mapping for path aliases

## 📊 Data Structure

### User Model
```javascript
{
  id: Number,
  name: String,
  email: String,
  phone: String,
  address: String,
  dateOfBirth: String,
  riskProfile: String, // 'Conservative', 'Moderate', 'Aggressive'
  createdAt: String
}
```

### Portfolio Model
```javascript
{
  id: Number,
  clientId: Number,
  clientName: String,
  name: String,
  status: String, // 'UPCOMING', 'ACTIVE', 'CLOSED'
  totalValue: Number,
  initialInvestment: Number,
  returns: Number,
  returnPercentage: Number,
  riskLevel: String, // 'Conservative', 'Moderate', 'Aggressive'
  createdAt: String,
  closedAt: String // Optional
}
```


---

Built with ❤️ using Vue.js and modern web technologies.

