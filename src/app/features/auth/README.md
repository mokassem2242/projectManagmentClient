# Authentication Feature

This feature provides complete authentication functionality with login and signup pages in Arabic.

## Structure

```
auth/
├── components/
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   └── login.component.css
│   └── signup/
│       ├── signup.component.ts
│       ├── signup.component.html
│       └── signup.component.css
├── models/
│   └── auth.models.ts
├── services/
│   └── auth.service.ts
├── guards/
│   └── auth.guard.ts
├── auth.routes.ts
└── README.md
```

## Features

### Login Component
- Email and password validation
- Arabic UI with RTL support
- Form validation with error messages
- Loading states
- Success/error notifications

### Signup Component
- Comprehensive form with all required fields
- Password confirmation validation
- Role selection dropdown
- Phone number validation
- Arabic UI with RTL support

### Auth Service
- Login and signup API calls
- Token management with localStorage
- Reactive state management using Angular Signals
- Automatic token restoration on app startup

### Auth Guard
- Protects routes requiring authentication
- Redirects to login if not authenticated

## API Endpoints

### Login
```
POST /api/auth/login
{
  "email": "string",
  "password": "string"
}
```

### Signup
```
POST /api/auth/signup
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "password": "string",
  "confirmPassword": "string",
  "role": "string"
}
```

## Routes

- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/dashboard` - Protected dashboard (requires authentication)

## Usage

1. Navigate to `/auth/login` or `/auth/signup`
2. Fill in the required information
3. Submit the form
4. Upon successful authentication, you'll be redirected to `/dashboard`

## Styling

- Uses Tailwind CSS for responsive design
- PrimeNG components for form elements
- Arabic font (Cairo) for proper text rendering
- RTL support throughout the application
- Modern gradient backgrounds and card designs 