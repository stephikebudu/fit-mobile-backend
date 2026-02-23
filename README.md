# Server Setup
1. Run `npm install` to install all dependencies
2. Run `npm run dev` to start development server
3. In Postman:
   - Set `{{baseUrl}}` to `http://localhost:5000` for development env
   - Set `{{baseUrl}}` to `https://fit-mobile-backend.vercel.app` for production env

# API Tests in Postman
1. For `{{baseUrl}}/api/auth/change-password` route, update Header with the following key-value pairs:
- `client`: `not-browser`
- `authorization`: `Bearer <user token from signin res obj>`

2. For `{{baseUrl}}/api/user-profile/profile` route, update Header with the following key-value pair:
- `authorization`: `Bearer <user token from signin res obj>`

3. For `{{baseURL}}/api/user-profile/profile/update` route, update Header with the following key-value pairs:
- `authorization`: `Bearer <user token from signin res object>`
- `Content-Type`: `application/json`

4. For `{{baseURL}}/api/user-profile/profile/social-links` route, update Heeader fields with the following key-value pairs:
- `authorization`: `Bearer <user token from signin res object>`
- `Content-Type`: `application/json`

5. For `{{baseURL}}/api/user-profile/profile/address` route, update Heeader fields with the following key-value pairs:
- `authorization`: `Bearer <user token from signin res object>`
- `Content-Type`: `application/json`

6. For `{{baseURL}}/api/activities` route, update Header fields with the following key-value pairs:
- `authorization`: `Bearer <user token from signin res object>`
- `Content-Type`: `application/json`

7. For `{{baseURL}}/api/challenges?tab=Challenges&status=ongoing&page=1&limit=20` route, update:
Header fields with the following key-value pair:
- `authorization`: `Bearer <user token from signin res object>`

Query Parameters fields with the following key-value pairs:
- `tab`: `"Leaderboard"` | `"Challenges"` (default: "Challenges")
- `status`: `"ongoing"` | `"upcoming"` | `"completed"` (default: "ongoing")
- `page`: number (default: 1)
- `limit` number (default: 20)

8. For `{{baseURL}}/api/challenges/:challengeId` route, update Header field with the following key-value pair:
- `authorization`: `Bearer <user token from signin res object>`


9. For `{{baseURL}}/api/challenges/:challengeId/join` route, update Header field with the following key-value pair:
- `authorization`: `Bearer <user token from signin res object>`

10. For `{{baseURL}}/api/products` route, update Header field with the following key-value pair:
- `authorization`: `Bearer <user token from signin res object>`

11. For `{{baseURL}}/api/payment-methods` route, update Header field with the following key-value pair:
- `authorization`: `Bearer <user token from signin res object>`