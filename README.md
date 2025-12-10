# Title
## Hospital Appointment Management System
A simple and secure system for managing hospital appointments with user authentication.

## Features
- User Registration & Login
- JWT Authentication
- Role Based Access (Admin / Patient)
- Create, Update, Delete Appointments
- Password Hashing with Bcrypt
- Protected Routes

## API URL = https://hospital-backend-fgmv.onrender.com

## Authentication API Routes
| Method  | Route                        | Description                     | Role  |
|---------|------------------------------|---------------------------------|-------|
| POST    | /api/auth/admin/register      | Register a new admin            | Admin |
| POST    | /api/auth/user/register       | Register a new user             | User  |
| POST    | /api/auth/admin/login         | Login and get JWT token         | Admin |
| POST    | /api/auth/user/login          | Login and get JWT token         | User  |
| GET     | /api/auth/admin/profile/:id   | Get profile                     | Admin |
| GET     | /api/auth/user/profile/:id    | Get profile                     | User  |
| PUT     | /api/auth/admin/profile/:id   | Update details                  | Admin |
| PUT     | /api/auth/user/profile/:id    | Update details                  | User  |
| PATCH   | /api/auth/admin/profile/:id   | Update password                 | Admin |
| PATCH   | /api/auth/user/profile/:id    | Update password                 | User  |
| DELETE  | /api/auth/admin/profile/:id   | Delete account                  | Admin |
| DELETE  | /api/auth/user/profile/:id    | Delete account                  | User  |
| POST    | /api/auth/admin/refresh-token | Refresh JWT token               | Admin|
| POST    | /api/auth//userrefresh-token  | Refresh JWT token               | User |
| POST    | /api/auth/admin/upload-image  | Upload profile image            | Admin|
| POST    | /api/auth/user/upload-image   | Upload profile image            | User |

# 1. Repository clone
git clone https://github.com/MRP-rakib/hospital-backend.git

# 2. Project folder
cd hospital-backend

# 3. Dependencies install
npm install

# 4. Development server
npm run dev
