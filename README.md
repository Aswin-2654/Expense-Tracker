# Expense Tracker

A full-stack web application for managing and tracking daily expenses with categorization, filtering, and CRUD operations.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## 🎯 Project Overview

The Expense Tracker is a comprehensive solution for personal finance management. It allows users to record, categorize, filter, and manage their daily expenses through an intuitive web interface. The application features a robust REST API backend and a modern, responsive frontend built with React.

### Key Capabilities:
- Create, read, update, and delete expenses
- Filter expenses by category
- Track expense details (amount, date, category, description)
- Soft delete functionality (data preservation)
- Real-time data synchronization

---

## ✨ Features

### Core Functionality
- **Create Expenses**: Add new expense records with title, amount, category, and date
- **View Expenses**: Display all recorded expenses with detailed information
- **Filter by Category**: Quick filtering to view expenses by specific categories
- **Update Expenses**: Edit existing expense records
- **Delete Expenses**: Remove expenses with soft-delete (preserves data integrity)
- **Responsive UI**: Clean, modern interface optimized for various screen sizes

### Technical Features
- RESTful API architecture
- CORS-enabled for cross-origin requests
- Database persistence with SQLAlchemy ORM
- Input validation using Pydantic schemas
- Error handling and HTTP status codes

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.103+
- **Server**: Uvicorn (ASGI)
- **Database**: SQLAlchemy ORM with SQLite (default)
- **Validation**: Pydantic 2.0+
- **Environment**: Python 3.8+

### Frontend
- **Library**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **HTTP Client**: Axios 1.13.2
- **Styling**: CSS3
- **Linting**: ESLint

### Development Tools
- Python virtual environment
- npm/yarn for package management
- Git version control

---

## 📁 Folder Structure

```
Expense tracker/
│
├── backend/                          # FastAPI Backend
│   ├── main.py                       # Application entry point
│   ├── database.py                   # Database configuration
│   ├── models.py                     # SQLAlchemy ORM models
│   ├── schemas.py                    # Pydantic validation schemas
│   ├── requirements.txt              # Python dependencies
│   ├── __pycache__/                  # Python cache
│   └── routers/                      # API route handlers
│       ├── create_expense.py         # POST /expenses endpoint
│       ├── get_expense.py            # GET /expenses endpoint
│       ├── update_expense.py         # PUT /expenses/{id} endpoint
│       ├── delete_expense.py         # DELETE /expenses/{id} endpoint
│       └── __pycache__/
│
├── expense-tracker-frontend/         # React Frontend
│   ├── src/
│   │   ├── main.jsx                  # React app entry point
│   │   ├── App.jsx                   # Main application component
│   │   ├── api/
│   │   │   └── axios.js              # Axios API client configuration
│   │   ├── components/               # Reusable React components
│   │   │   ├── ExpenseForm.jsx       # Form for adding/editing expenses
│   │   │   ├── ExpenseList.jsx       # Component for displaying expenses
│   │   │   └── CategoryFilter.jsx    # Category filter component
│   │   ├── styles/                   # CSS stylesheets
│   │   │   ├── App.css
│   │   │   ├── ExpenseForm.css
│   │   │   ├── ExpenseList.css
│   │   │   └── categoryFilter.css
│   │   └── assets/                   # Static assets
│   ├── public/                       # Public static files
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # npm dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # ESLint configuration
│   └── README.md                     # Frontend-specific documentation
│
├── myvenv/                           # Python virtual environment
│   ├── Lib/
│   ├── Scripts/
│   └── Include/
│
└── README.md                         # This file
```

---

## 📦 Prerequisites

### System Requirements
- **Python**: 3.8 or higher
- **Node.js**: 14.0 or higher
- **npm**: 6.0 or higher (or yarn)
- **Git**: For version control

### Check Installation
```bash
# Check Python version
python --version

# Check Node.js version
node --version

# Check npm version
npm --version
```

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Expense tracker"
```

### 2. Backend Setup

#### Create Virtual Environment
```bash
# Windows
python -m venv myvenv
myvenv\Scripts\activate

# macOS/Linux
python3 -m venv myvenv
source myvenv/bin/activate
```

#### Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Environment Configuration
Create a `.env` file in the backend directory (optional):
```
DATABASE_URL=sqlite:///./expense_tracker.db
API_PORT=8000
```

### 3. Frontend Setup

```bash
cd expense-tracker-frontend

# Install dependencies
npm install

# (Optional) Setup environment variables
# Create .env file if needed for API endpoints
echo VITE_API_URL=http://localhost:8000 > .env
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment (if not already activated)
# Windows:
# myvenv\Scripts\activate
# macOS/Linux:
# source ../myvenv/bin/activate

# Start FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Backend will be available at**: `http://localhost:8000`
**API Documentation (Swagger UI)**: `http://localhost:8000/docs`
**API Documentation (ReDoc)**: `http://localhost:8000/redoc`

### Start Frontend Server

```bash
# Navigate to frontend directory
cd expense-tracker-frontend

# Start development server
npm run dev
```

**Frontend will be available at**: `http://localhost:5173` (or as shown in terminal)

### Build for Production

#### Frontend Build
```bash
cd expense-tracker-frontend
npm run build
npm run preview
```

#### Run Backend in Production
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### 1. **Create Expense**
- **Method**: `POST`
- **Endpoint**: `/expenses`
- **Tags**: `create`
- **Request Body**:
```json
{
  "title": "Grocery Shopping",
  "amount": 45.50,
  "category": "Food",
  "date": "2026-01-17"
}
```
- **Response**: `201 Created`
```json
{
  "id": 1,
  "title": "Grocery Shopping",
  "amount": 45.50,
  "category": "Food",
  "date": "2026-01-17",
  "is_deleted": false
}
```

#### 2. **Get All Expenses**
- **Method**: `GET`
- **Endpoint**: `/expenses`
- **Tags**: `Get`
- **Query Parameters**:
  - `category` (optional): Filter by category
- **Example**: `/expenses?category=Food`
- **Response**: `200 OK`
```json
[
  {
    "id": 1,
    "title": "Grocery Shopping",
    "amount": 45.50,
    "category": "Food",
    "date": "2026-01-17",
    "is_deleted": false
  },
  {
    "id": 2,
    "title": "Gas",
    "amount": 50.00,
    "category": "Transportation",
    "date": "2026-01-17",
    "is_deleted": false
  }
]
```

#### 3. **Update Expense**
- **Method**: `PUT`
- **Endpoint**: `/expenses/{expense_id}`
- **Tags**: `Update`
- **Path Parameters**:
  - `expense_id` (integer): ID of the expense to update
- **Request Body**:
```json
{
  "title": "Updated Title",
  "amount": 55.00,
  "category": "Food",
  "date": "2026-01-18"
}
```
- **Response**: `200 OK`
```json
{
  "id": 1,
  "title": "Updated Title",
  "amount": 55.00,
  "category": "Food",
  "date": "2026-01-18",
  "is_deleted": false
}
```

#### 4. **Delete Expense**
- **Method**: `DELETE`
- **Endpoint**: `/expenses/{expense_id}`
- **Tags**: `Delete`
- **Path Parameters**:
  - `expense_id` (integer): ID of the expense to delete
- **Response**: `200 OK`
```json
{
  "message": "Expense deleted successfully",
  "id": 1
}
```

### Error Responses
- `404 Not Found`: Expense not found
```json
{
  "detail": "Expense not found"
}
```

- `400 Bad Request`: Invalid request data
```json
{
  "detail": [
    {
      "loc": ["body", "amount"],
      "msg": "ensure this value is greater than 0",
      "type": "value_error"
    }
  ]
}
```

---

## 🗄️ Database Schema

### Expense Model
```python
class Expense(Base):
    __tablename__ = "expenses"
    
    id: int              # Primary key, auto-increment
    title: str           # Expense description (max 100 chars)
    amount: float        # Expense amount
    category: str        # Expense category (max 50 chars)
    date: date           # Date of expense (default: today)
    is_deleted: bool     # Soft delete flag (default: False)
```

---

## 🔒 Security Considerations

- **CORS Configuration**: Currently set to allow all origins. Update before production:
  ```python
  allow_origins=["http://localhost:3000"]  # Specify frontend URL
  ```

- **Database**: Uses SQLite for development. Use PostgreSQL/MySQL for production.

- **Environment Variables**: Store sensitive data in `.env` files (never commit to git).

- **Soft Delete**: Uses `is_deleted` flag to preserve data integrity.

---

## 📝 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend
```bash
# Development
uvicorn main:app --reload

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🐛 Troubleshooting

### Backend Issues
- **Port already in use**: Change port in uvicorn command: `--port 8001`
- **Module not found**: Ensure virtual environment is activated
- **Database locked**: Delete `expense_tracker.db` and restart

### Frontend Issues
- **API connection failed**: Ensure backend is running on `localhost:8000`
- **Port 5173 in use**: Vite will automatically use next available port
- **Module not found**: Run `npm install` to install dependencies

---

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

---


## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Support

For issues, questions, or feedback, please create an issue in the repository or contact the development team.

---

**Last Updated**: January 2026
**Current Version**: 1.0.0
