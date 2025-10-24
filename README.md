# FastServices Frontend Application

This is a queue management system built with React, TypeScript, and Vite. It is now integrated with a Java/Spring Boot backend with role-based access control.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

4. Preview the production build:
   ```
   npm run preview
   ```

## Project Structure

The application follows a role-based structure with separate dashboards for customers, organizations, staff, and administrators.

## Overview

FastServices is a queue management system built with React, TypeScript, and Vite. It provides a platform for customers to book appointments with various organizations, and for organizations to manage their offerings and appointments.

## Role-Based Access Control

The application implements a role-based access control system with the following roles:

1. **SUPER_ADMIN** - Full system access
   - Access to admin dashboard
   - Manage all users, organizations, and appointments

2. **ORG_ADMIN** - Organization management
   - Access to organization dashboard
   - Manage organization offerings, appointments, and billing

3. **STAFF** - Service staff
   - Access to staff dashboard
   - Manage queues and serve customers

4. **CUSTOMER** - Public users
   - Access to customer dashboard
   - Book appointments and view history

## Registration Restriction

- Only CUSTOMER registration is available through the public registration page at `/register`
- ORG_ADMIN, STAFF, and SUPER_ADMIN roles are created internally through protected dashboards
- For development/testing purposes, admin registration is available at `/admin-register` (should be disabled in production)

## API Integration

The frontend is now integrated with a backend API running on `http://localhost:8080`. The integration includes:

1. Authentication (login/register) with JWT tokens
2. User management
3. Organization management
4. Service offerings management
5. Queue management
6. Appointment booking and management

All API calls are handled through service modules in the `services/` directory.

## Authentication Flow

1. User navigates to the login page
2. User enters credentials and submits the form
3. On successful authentication:
   - JWT token is stored in session storage
   - User data is stored in session storage
   - User is redirected to their role-specific dashboard
4. On logout:
   - Token and user data are removed from session storage
   - User is redirected to the home page

## Development

To start the development server:

```bash
npm run dev
```

The application expects the backend API to be running on `http://localhost:8080`. Make sure to start the backend server before testing authentication features.