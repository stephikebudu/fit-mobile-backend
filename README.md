# Server Setup
1. Run `npm install` to install all dependencies
2. Run `npm run dev` to start development server
3. In Postman, set `{{baseUrl}}` to `http://localhost:5000`

# API Tests in Postman
1. For `{{baseUrl}}/api/auth/change-password` route, update Header with the following key-value pairs:
- `client`: `not-browser`
- `authorization`: `Bearer <user token from signin res obj>`

2. For `{{baseUrl}}/api/user-profile/profile` route, update Header with the following key-value pair:
- `authorization`: `Bearer <user token from signin res obj>`

3. For `{{baseURL}}/api/user-profile/profile/update` route, update Header with the following key-value pair:
- `authorization`: `Bearer <user token from res object>`