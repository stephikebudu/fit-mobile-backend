# Server Setup
1. Run `npm install` to install all dependencies
2. Run `npm run dev` to start development server

# Tests
1. For `{{baseUrl}}/api/auth/change-password` route, update Header with the following key-value pairs:
- `client`: `not-browser`
- `authorization`: `Bearer <user token from signin res obj>`

2. For `{{baseUrl}}/api/user-profile/profile` route, update Header with the following key-value pair:
- `authorization`: `Bearer <user token from signin res obj>`