# Asset Manager

A modern web application for managing digital assets with secure authentication and real-time updates.

## Features

- User authentication with JWT
- Asset upload and management
- Asset categorization and tagging
- Search and filter capabilities
- Responsive material design interface
- Secure file storage and retrieval

## Tech Stack

### Frontend

- Angular 17
- Angular Material UI
- RxJS
- TypeScript

### Backend

- Node.js
- Express
- TypeORM
- MySQL
- JWT Authentication

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- Angular CLI

## Setup

### Backend Setup

1. Navigate to the backend directory:

```bash
cd asset-manager-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file with the following variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=asset_manager
JWT_SECRET=your_jwt_secret
API_URL=http://localhost:3000
```

4. Run migrations:

```bash
npm run typeorm migration:run
```

5. Start the server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd asset-manager-client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200`

## Project Structure

```
asset-manager/
├── asset-manager-api/     # Backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── entities/      # Database models
│   │   ├── middleware/    # Custom middleware
│   │   └── routes/        # API routes
│   └── uploads/           # Asset storage
└── asset-manager-client/  # Frontend
    └── src/
        ├── app/
        │   ├── core/      # Core functionality
        │   ├── features/  # Feature modules
        │   └── shared/    # Shared components
        └── assets/        # Static assets
```

## API Documentation

The API provides the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/assets` - List all assets
- `POST /api/assets` - Upload new asset
- `GET /api/assets/:id` - Get asset details
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

## License

MIT
<<<<<<< HEAD
=======

## Project Status
🎉 **Project Completed - September 20, 2024**

This project has been successfully completed with all planned features implemented:
- ✅ User Authentication & Authorization
- ✅ Asset Upload and Management
- ✅ File Storage and Metadata Handling
- ✅ RESTful API Implementation
- ✅ Angular Frontend Integration

The project is now ready for production use and has been thoroughly tested.
>>>>>>> b16c42b (Complete asset management system implementation with file upload functionality)
