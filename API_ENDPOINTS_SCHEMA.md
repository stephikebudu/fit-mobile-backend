# FitApp API Endpoints Schema

## Base Configuration

**Base URL:** `https://api.fitapp.com/v1` (or your backend URL)
**Authentication:** Bearer Token (JWT)
**Content-Type:** `application/json`

All authenticated endpoints require the `Authorization` header:
```
Authorization: Bearer <access_token>
```

---

## 1. Authentication & Authorization

### 1.1 Sign Up
**POST** `/api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123!",
  "role": "user" | "creator" | "vendor",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "phone": "+1234567890",
      "role": "user",
      "firstName": "John",
      "lastName": "Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  }
}
```

### 1.2 Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```
OR
```json
{
  "phone": "+1234567890",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "role": "user",
      "firstName": "John",
      "lastName": "Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  }
}
```

### 1.3 Forgot Password
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```
OR
```json
{
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset code sent to your email/phone"
}
```

### 1.4 Verify Reset Code
**POST** `/api/auth/verify-reset-code`

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "resetToken": "reset_token_here"
  }
}
```

### 1.5 Reset Password
**POST** `/api/auth/reset-password`

**Request Body:**
```json
{
  "resetToken": "reset_token_here",
  "newPassword": "NewSecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

### 1.6 Refresh Token
**POST** `/api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token_here"
  }
}
```

### 1.7 Logout
**POST** `/api/auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 2. User Profile

### 2.1 Get User Profile
**GET** `/api/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "user@example.com",
    "phone": "+1234567890",
    "bio": "Fitness enthusiast",
    "birthdate": "1990-05-15",
    "gender": "Man" | "Woman" | "Rather not say",
    "role": "user" | "creator" | "vendor",
    "profileImage": "https://cdn.fitapp.com/profiles/user_123.jpg",
    "coverImage": "https://cdn.fitapp.com/covers/user_123.jpg",
    "socialLinks": {
      "tiktok": "@johndoe",
      "instagram": "@johndoe",
      "facebook": "johndoe",
      "snapchat": "johndoe"
    },
    "address": {
      "country": "Nigeria",
      "state": "Lagos",
      "city": "Lagos",
      "shopAddress": "123 Main St",
      "landmark": "Near Mall"
    },
    "bankDetails": {
      "accountType": "Savings",
      "bankName": "First Bank",
      "accountNumber": "1234567890",
      "accountName": "John Doe"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:22:00Z"
  }
}
```

### 2.2 Update User Profile
**PUT** `/api/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated bio",
  "birthdate": "1990-05-15",
  "gender": "Man",
  "profileImage": "base64_encoded_image_or_url",
  "coverImage": "base64_encoded_image_or_url"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "bio": "Updated bio",
    ...
  }
}
```

### 2.3 Update Social Links
**PUT** `/api/profile/social-links`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "tiktok": "@johndoe",
  "instagram": "@johndoe",
  "facebook": "johndoe",
  "snapchat": "johndoe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "socialLinks": {
      "tiktok": "@johndoe",
      "instagram": "@johndoe",
      "facebook": "johndoe",
      "snapchat": "johndoe"
    }
  }
}
```

### 2.4 Update Address
**PUT** `/api/profile/address`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "country": "Nigeria",
  "state": "Lagos",
  "city": "Lagos",
  "shopAddress": "123 Main St",
  "landmark": "Near Mall"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": {
      "country": "Nigeria",
      "state": "Lagos",
      "city": "Lagos",
      "shopAddress": "123 Main St",
      "landmark": "Near Mall"
    }
  }
}
```

### 2.5 Update Bank Details (Creator/Vendor)
**PUT** `/api/profile/bank-details`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "accountType": "Savings",
  "bankName": "First Bank",
  "accountNumber": "1234567890",
  "accountName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bankDetails": {
      "accountType": "Savings",
      "bankName": "First Bank",
      "accountNumber": "1234567890",
      "accountName": "John Doe"
    }
  }
}
```

---

## 3. Onboarding

### 3.1 Get Activities List
**GET** `/api/activities`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "activity_1",
      "name": "Walk",
      "icon": "walk_icon_url"
    },
    {
      "id": "activity_2",
      "name": "Run",
      "icon": "run_icon_url"
    },
    {
      "id": "activity_3",
      "name": "Ride",
      "icon": "ride_icon_url"
    },
    {
      "id": "activity_4",
      "name": "Hike",
      "icon": "hike_icon_url"
    },
    {
      "id": "activity_5",
      "name": "Swim",
      "icon": "swim_icon_url"
    },
    {
      "id": "activity_6",
      "name": "Crossfit",
      "icon": "crossfit_icon_url"
    },
    {
      "id": "activity_7",
      "name": "Rock Climb",
      "icon": "rockclimb_icon_url"
    }
  ]
}
```

### 3.2 Save User Activities
**POST** `/api/profile/activities`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "activityIds": ["activity_1", "activity_2", "activity_3"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Activities saved successfully"
}
```

---

## 4. Community & Posts

### 4.1 Get Community Feed
**GET** `/api/community/feed`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `tab`: `"Popular"` | `"My Post"` | `"Following"` | `"Challenges"` (default: "Popular")
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_123",
        "userId": "user_456",
        "userName": "John Doe",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
        "content": "Happy to be rated No1. on the World Top 100 Lifters. Thank you for your support!!",
        "image": "https://cdn.fitapp.com/posts/post_123.jpg",
        "video": null,
        "activityTag": "Challenges",
        "isSponsored": false,
        "isFollowing": false,
        "likesCount": 12,
        "commentsCount": 3,
        "isLiked": false,
        "isSaved": false,
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

### 4.2 Get Post Details
**GET** `/api/community/posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "post_123",
    "userId": "user_456",
    "userName": "John Doe",
    "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
    "content": "Post content here",
    "image": "https://cdn.fitapp.com/posts/post_123.jpg",
    "video": null,
    "activityTag": "Challenges",
    "isSponsored": false,
    "isFollowing": false,
    "likesCount": 12,
    "commentsCount": 3,
    "isLiked": false,
    "isSaved": false,
    "comments": [
      {
        "id": "comment_1",
        "userId": "user_789",
        "userName": "Jane Smith",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_789.jpg",
        "content": "Great post!",
        "createdAt": "2024-01-20T11:00:00Z"
      }
    ],
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

### 4.3 Create Post
**POST** `/api/community/posts`

**Headers:** `Authorization: Bearer <token>`

**Request Body (FormData for file upload):**
```json
{
  "content": "Post content text",
  "image": "base64_encoded_image_or_file",
  "video": "base64_encoded_video_or_file",
  "activityTag": "Challenges"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "post_123",
    "userId": "user_456",
    "content": "Post content text",
    "image": "https://cdn.fitapp.com/posts/post_123.jpg",
    "activityTag": "Challenges",
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

### 4.4 Like/Unlike Post
**POST** `/api/community/posts/:postId/like`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "postId": "post_123",
    "isLiked": true,
    "likesCount": 13
  }
}
```

### 4.5 Comment on Post
**POST** `/api/community/posts/:postId/comments`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "This is a comment"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "comment_1",
    "postId": "post_123",
    "userId": "user_456",
    "userName": "John Doe",
    "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
    "content": "This is a comment",
    "createdAt": "2024-01-20T11:00:00Z"
  }
}
```

### 4.6 Get Post Comments
**GET** `/api/community/posts/:postId/comments`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "comment_1",
        "userId": "user_789",
        "userName": "Jane Smith",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_789.jpg",
        "content": "Great post!",
        "createdAt": "2024-01-20T11:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

### 4.7 Share Post
**POST** `/api/community/posts/:postId/share`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "postId": "post_123",
    "shareUrl": "https://fitapp.com/posts/post_123",
    "sharesCount": 5
  }
}
```

### 4.8 Follow/Unfollow User
**POST** `/api/community/users/:userId/follow`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_456",
    "isFollowing": true,
    "followersCount": 1250
  }
}
```

---

## 5. Challenges

### 5.1 Get Challenges
**GET** `/api/challenges`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `tab`: `"Leaderboard"` | `"Challenges"` (default: "Challenges")
- `status`: `"ongoing"` | `"upcoming"` | `"completed"` (default: "ongoing")
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "challenges": [
      {
        "id": "challenge_1",
        "title": "July Weekly Challenge",
        "description": "Run 15km this week",
        "targetDistance": 15.0,
        "currentDistance": 0.0,
        "unit": "km",
        "daysLeft": 4,
        "participantsCount": 20234,
        "icon": "flash_icon_url",
        "startDate": "2024-07-01T00:00:00Z",
        "endDate": "2024-07-07T23:59:59Z",
        "isJoined": false,
        "sponsor": {
          "name": "Jetter",
          "logo": "https://cdn.fitapp.com/sponsors/jetter.jpg",
          "reward": "1000 Lorem Coin"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

### 5.2 Get Challenge Details
**GET** `/api/challenges/:challengeId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "challenge_1",
    "title": "July Weekly Challenge",
    "description": "Run 15km this week",
    "targetDistance": 15.0,
    "currentDistance": 5.2,
    "unit": "km",
    "daysLeft": 4,
    "participantsCount": 20234,
    "icon": "flash_icon_url",
    "startDate": "2024-07-01T00:00:00Z",
    "endDate": "2024-07-07T23:59:59Z",
    "isJoined": true,
    "sponsor": {
      "name": "Jetter",
      "logo": "https://cdn.fitapp.com/sponsors/jetter.jpg",
      "reward": "1000 Lorem Coin"
    },
    "leaderboard": [
      {
        "rank": 1,
        "userId": "user_123",
        "userName": "John Doe",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_123.jpg",
        "distance": 14.8,
        "unit": "km"
      }
    ]
  }
}
```

### 5.3 Join Challenge
**POST** `/api/challenges/:challengeId/join`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "challengeId": "challenge_1",
    "isJoined": true,
    "message": "Successfully joined challenge"
  }
}
```

### 5.4 Get Challenge Leaderboard
**GET** `/api/challenges/:challengeId/leaderboard`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "user_123",
        "userName": "John Doe",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_123.jpg",
        "distance": 14.8,
        "unit": "km"
      },
      {
        "rank": 2,
        "userId": "user_456",
        "userName": "Jane Smith",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
        "distance": 14.5,
        "unit": "km"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 20234,
      "totalPages": 405
    }
  }
}
```

---

## 6. Products & Shop

### 6.1 Get Products
**GET** `/api/products`

**Query Parameters:**
- `category`: `"GEARS"` | `"SUPPLEMENTS"` | `"PLANS"` (optional)
- `vendorId`: string (optional, for vendor-specific products)
- `search`: string (optional, search query)
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `sortBy`: `"price_asc"` | `"price_desc"` | `"newest"` | `"popular"` (default: "newest")

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product_123",
        "vendorId": "vendor_456",
        "vendorName": "Fitness Store",
        "name": "Premium Protein Powder",
        "description": "High-quality protein powder for muscle recovery",
        "price": "₦15,000",
        "discount": "₦2,000",
        "finalPrice": "₦13,000",
        "category": "SUPPLEMENTS",
        "images": [
          "https://cdn.fitapp.com/products/product_123_1.jpg"
        ],
        "availableSizes": ["500g", "1kg", "2kg"],
        "availableColors": ["Chocolate", "Vanilla", "Strawberry"],
        "stock": 50,
        "rating": 4.5,
        "reviewsCount": 120,
        "isSaved": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 500,
      "totalPages": 25
    }
  }
}
```

### 6.2 Get Product Details
**GET** `/api/products/:productId`

**Headers:** `Authorization: Bearer <token>` (optional, for saved status)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "product_123",
    "vendorId": "vendor_456",
    "vendorName": "Fitness Store",
    "vendorAvatar": "https://cdn.fitapp.com/vendors/vendor_456.jpg",
    "name": "Premium Protein Powder",
    "description": "High-quality protein powder for muscle recovery. Contains 25g of protein per serving.",
    "price": "₦15,000",
    "discount": "₦2,000",
    "finalPrice": "₦13,000",
    "category": "SUPPLEMENTS",
    "images": [
      "https://cdn.fitapp.com/products/product_123_1.jpg",
      "https://cdn.fitapp.com/products/product_123_2.jpg"
    ],
    "availableSizes": ["500g", "1kg", "2kg"],
    "availableColors": ["Chocolate", "Vanilla", "Strawberry"],
    "stock": 50,
    "rating": 4.5,
    "reviewsCount": 120,
    "isSaved": false,
    "specifications": {
      "protein": "25g per serving",
      "calories": "120 per serving",
      "flavors": "3"
    },
    "reviews": [
      {
        "id": "review_1",
        "userId": "user_789",
        "userName": "Jane Smith",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_789.jpg",
        "rating": 5,
        "comment": "Great product!",
        "createdAt": "2024-01-18T14:30:00Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 6.3 Create Product (Vendor)
**POST** `/api/vendor/products`

**Headers:** `Authorization: Bearer <token>`

**Request Body (FormData for images):**
```json
{
  "name": "Premium Protein Powder",
  "description": "High-quality protein powder",
  "price": "15000",
  "discount": "2000",
  "category": "SUPPLEMENTS",
  "images": ["base64_encoded_image_1", "base64_encoded_image_2"],
  "availableSizes": ["500g", "1kg", "2kg"],
  "availableColors": ["Chocolate", "Vanilla", "Strawberry"],
  "stock": 50,
  "shippingDetails": {
    "weight": "1kg",
    "dimensions": "20x15x10cm",
    "shippingCost": "₦500"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "product_123",
    "name": "Premium Protein Powder",
    ...
  }
}
```

### 6.4 Update Product (Vendor)
**PUT** `/api/vendor/products/:productId`

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (Same as Create Product)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "product_123",
    ...
  }
}
```

### 6.5 Delete Product (Vendor)
**DELETE** `/api/vendor/products/:productId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### 6.6 Get Vendor Products
**GET** `/api/vendor/products`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `category`: `"GEARS"` | `"SUPPLEMENTS"` | `"PLANS"` (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {...}
  }
}
```

---

## 7. Shopping Cart

### 7.1 Get Cart
**GET** `/api/cart`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "cart_item_1",
        "productId": "product_123",
        "name": "Premium Protein Powder",
        "price": "₦13,000",
        "discount": "₦2,000",
        "size": "1kg",
        "color": "Chocolate",
        "quantity": 2,
        "image": "https://cdn.fitapp.com/products/product_123_1.jpg",
        "availableSizes": ["500g", "1kg", "2kg"],
        "availableColors": ["Chocolate", "Vanilla", "Strawberry"]
      }
    ],
    "subtotal": "₦26,000",
    "shipping": "₦500",
    "total": "₦26,500"
  }
}
```

### 7.2 Add to Cart
**POST** `/api/cart`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "product_123",
  "size": "1kg",
  "color": "Chocolate",
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart_item_1",
    "productId": "product_123",
    "quantity": 2,
    ...
  }
}
```

### 7.3 Update Cart Item
**PUT** `/api/cart/:cartItemId`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "quantity": 3,
  "size": "2kg",
  "color": "Vanilla"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart_item_1",
    "quantity": 3,
    ...
  }
}
```

### 7.4 Remove from Cart
**DELETE** `/api/cart/:cartItemId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

### 7.5 Clear Cart
**DELETE** `/api/cart`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## 8. Orders

### 8.1 Create Order
**POST** `/api/orders`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_123",
      "quantity": 2,
      "size": "1kg",
      "color": "Chocolate",
      "price": "₦13,000"
    }
  ],
  "shippingAddress": {
    "country": "Nigeria",
    "state": "Lagos",
    "city": "Lagos",
    "address": "123 Main St",
    "landmark": "Near Mall"
  },
  "paymentMethodId": "payment_method_123",
  "shippingCost": "₦500"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "status": "pending",
    "total": "₦26,500",
    "items": [...],
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

### 8.2 Get User Orders
**GET** `/api/orders`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status`: `"pending"` | `"processing"` | `"shipped"` | `"delivered"` | `"cancelled"` (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_123",
        "status": "delivered",
        "total": "₦26,500",
        "itemsCount": 2,
        "createdAt": "2024-01-20T10:30:00Z",
        "deliveredAt": "2024-01-22T14:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 8.3 Get Order Details
**GET** `/api/orders/:orderId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "status": "delivered",
    "total": "₦26,500",
    "subtotal": "₦26,000",
    "shipping": "₦500",
    "items": [
      {
        "productId": "product_123",
        "name": "Premium Protein Powder",
        "quantity": 2,
        "size": "1kg",
        "color": "Chocolate",
        "price": "₦13,000",
        "image": "https://cdn.fitapp.com/products/product_123_1.jpg"
      }
    ],
    "shippingAddress": {...},
    "paymentMethod": {...},
    "createdAt": "2024-01-20T10:30:00Z",
    "deliveredAt": "2024-01-22T14:30:00Z"
  }
}
```

### 8.4 Get Vendor Orders
**GET** `/api/vendor/orders`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status`: string (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_123",
        "customerName": "John Doe",
        "status": "pending",
        "total": "₦26,500",
        "itemsCount": 2,
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 8.5 Update Order Status (Vendor)
**PUT** `/api/vendor/orders/:orderId/status`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "shipped",
  "trackingNumber": "TRACK123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "status": "shipped",
    "trackingNumber": "TRACK123456"
  }
}
```

---

## 9. Saved Items

### 9.1 Get Saved Posts
**GET** `/api/saved/posts`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_123",
        "title": "Daily Exercise",
        "activityTag": "Challenges",
        "isSponsored": false,
        "image": "https://cdn.fitapp.com/posts/post_123.jpg",
        "savedAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 9.2 Save Post
**POST** `/api/saved/posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "postId": "post_123",
    "isSaved": true
  }
}
```

### 9.3 Unsave Post
**DELETE** `/api/saved/posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "postId": "post_123",
    "isSaved": false
  }
}
```

### 9.4 Get Saved Products
**GET** `/api/saved/products`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product_123",
        "name": "Premium Protein Powder",
        "price": "₦13,000",
        "image": "https://cdn.fitapp.com/products/product_123_1.jpg",
        "savedAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 9.5 Save Product
**POST** `/api/saved/products/:productId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": "product_123",
    "isSaved": true
  }
}
```

### 9.6 Unsave Product
**DELETE** `/api/saved/products/:productId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": "product_123",
    "isSaved": false
  }
}
```

---

## 10. Payment Methods

### 10.1 Get Payment Methods
**GET** `/api/payment-methods`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentMethods": [
      {
        "id": "payment_method_123",
        "type": "card",
        "cardNumber": "**** **** **** 1234",
        "cardHolder": "John Doe",
        "expiryMonth": 12,
        "expiryYear": 2025,
        "isDefault": true
      },
      {
        "id": "payment_method_456",
        "type": "bank_transfer",
        "bankName": "First Bank",
        "accountNumber": "****7890",
        "accountName": "John Doe",
        "isDefault": false
      }
    ]
  }
}
```

### 10.2 Add Payment Method
**POST** `/api/payment-methods`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "card",
  "cardNumber": "1234567890123456",
  "cardHolder": "John Doe",
  "expiryMonth": 12,
  "expiryYear": 2025,
  "cvv": "123",
  "isDefault": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "payment_method_123",
    "type": "card",
    "cardNumber": "**** **** **** 3456",
    "cardHolder": "John Doe",
    "expiryMonth": 12,
    "expiryYear": 2025,
    "isDefault": false
  }
}
```

### 10.3 Delete Payment Method
**DELETE** `/api/payment-methods/:paymentMethodId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Payment method deleted"
}
```

### 10.4 Set Default Payment Method
**PUT** `/api/payment-methods/:paymentMethodId/default`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "payment_method_123",
    "isDefault": true
  }
}
```

---

## 11. Notifications

### 11.1 Get Notifications
**GET** `/api/notifications`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `unreadOnly`: boolean (default: false)

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notification_123",
        "type": "like",
        "title": "John Doe liked your post",
        "message": "John Doe liked your post about fitness",
        "userId": "user_456",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
        "relatedId": "post_123",
        "relatedType": "post",
        "isRead": false,
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": {...}
  }
}
```

### 11.2 Mark Notification as Read
**PUT** `/api/notifications/:notificationId/read`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "notification_123",
    "isRead": true
  }
}
```

### 11.3 Mark All Notifications as Read
**PUT** `/api/notifications/read-all`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## 12. Search

### 12.1 Search
**GET** `/api/search`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `q`: string (search query)
- `type`: `"all"` | `"posts"` | `"products"` | `"users"` (default: "all")
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [...],
    "products": [...],
    "users": [...],
    "pagination": {...}
  }
}
```

### 12.2 Get Search History
**GET** `/api/search/history`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "history": [
      "protein powder",
      "running shoes",
      "fitness challenge"
    ]
  }
}
```

### 12.3 Clear Search History
**DELETE** `/api/search/history`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Search history cleared"
}
```

---

## 13. Creator Dashboard & Analytics

### 13.1 Get Creator Dashboard
**GET** `/api/creator/dashboard`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "id": "views",
        "title": "Total Video views",
        "value": "125,430",
        "icon": "eye_icon"
      },
      {
        "id": "earnings",
        "title": "Amount Accepted here",
        "value": "₦45,000",
        "icon": "money_icon"
      }
    ],
    "recentVideos": [...],
    "earningsChart": {
      "labels": ["Jan", "Feb", "Mar", "Apr"],
      "data": [10000, 15000, 12000, 18000]
    }
  }
}
```

### 13.2 Get Creator Videos
**GET** `/api/creator/videos`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "videos": [
      {
        "id": "video_123",
        "title": "Morning Workout Routine",
        "thumbnail": "https://cdn.fitapp.com/videos/video_123_thumb.jpg",
        "views": 1250,
        "likes": 45,
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 13.3 Get Creator Earnings
**GET** `/api/creator/earnings`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate`: string (ISO date, optional)
- `endDate`: string (ISO date, optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEarnings": "₦125,000",
    "pendingEarnings": "₦25,000",
    "paidEarnings": "₦100,000",
    "transactions": [
      {
        "id": "transaction_123",
        "amount": "₦15,000",
        "type": "video_views",
        "status": "paid",
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 13.4 Request Payout (Creator)
**POST** `/api/creator/payouts/request`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": "25000"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "payout_123",
    "amount": "₦25,000",
    "status": "pending",
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

---

## 14. Vendor Dashboard & Analytics

### 14.1 Get Vendor Dashboard
**GET** `/api/vendor/dashboard`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": {
      "totalSales": "₦500,000",
      "totalOrders": 125,
      "pendingOrders": 5,
      "totalProducts": 45
    },
    "recentOrders": [...],
    "salesChart": {
      "labels": ["Jan", "Feb", "Mar", "Apr"],
      "data": [100000, 150000, 120000, 180000]
    }
  }
}
```

### 14.2 Get Vendor Earnings
**GET** `/api/vendor/earnings`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate`: string (ISO date, optional)
- `endDate`: string (ISO date, optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEarnings": "₦500,000",
    "pendingEarnings": "₦50,000",
    "paidEarnings": "₦450,000",
    "transactions": [...],
    "pagination": {...}
  }
}
```

### 14.3 Request Payout (Vendor)
**POST** `/api/vendor/payouts/request`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": "50000"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "payout_123",
    "amount": "₦50,000",
    "status": "pending",
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

---

## 15. Workouts

### 15.1 Get Workouts
**GET** `/api/workouts`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `category`: string (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "workouts": [
      {
        "id": "workout_123",
        "title": "Morning Cardio",
        "description": "30-minute cardio workout",
        "duration": 30,
        "difficulty": "beginner",
        "category": "Cardio",
        "thumbnail": "https://cdn.fitapp.com/workouts/workout_123.jpg",
        "video": "https://cdn.fitapp.com/workouts/workout_123.mp4",
        "isSaved": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 15.2 Get Workout Details
**GET** `/api/workouts/:workoutId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "workout_123",
    "title": "Morning Cardio",
    "description": "30-minute cardio workout",
    "duration": 30,
    "difficulty": "beginner",
    "category": "Cardio",
    "thumbnail": "https://cdn.fitapp.com/workouts/workout_123.jpg",
    "video": "https://cdn.fitapp.com/workouts/workout_123.mp4",
    "exercises": [
      {
        "name": "Jumping Jacks",
        "duration": 60,
        "reps": null
      }
    ],
    "isSaved": false
  }
}
```

### 15.3 Save Workout
**POST** `/api/workouts/:workoutId/save`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "workoutId": "workout_123",
    "isSaved": true
  }
}
```

---

## 16. Global Leaderboard

### 16.1 Get Global Leaderboard
**GET** `/api/leaderboard`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `period`: `"daily"` | `"weekly"` | `"monthly"` | `"all-time"` (default: "all-time")
- `page`: number (default: 1)
- `limit`: number (default: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "user_123",
        "userName": "Debbie Annie",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_123.jpg",
        "points": 1500,
        "isCurrentUser": false
      },
      {
        "rank": 2,
        "userId": "user_456",
        "userName": "Dawson Smith",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
        "points": 1400,
        "isCurrentUser": false
      },
      {
        "rank": 3,
        "userId": "user_789",
        "userName": "Funny C",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_789.jpg",
        "points": 1300,
        "isCurrentUser": false
      },
      {
        "rank": 4,
        "userId": "user_current",
        "userName": "Esther Howard",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_current.jpg",
        "points": 1245,
        "isCurrentUser": true
      }
    ],
    "currentUser": {
      "rank": 4,
      "userId": "user_current",
      "userName": "Esther Howard",
      "userAvatar": "https://cdn.fitapp.com/avatars/user_current.jpg",
      "points": 1245
    },
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 50000,
      "totalPages": 1000
    }
  }
}
```

### 16.2 Get User Rank
**GET** `/api/leaderboard/me`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `period`: `"daily"` | `"weekly"` | `"monthly"` | `"all-time"` (default: "all-time")

**Response:**
```json
{
  "success": true,
  "data": {
    "rank": 4,
    "userId": "user_current",
    "userName": "Esther Howard",
    "userAvatar": "https://cdn.fitapp.com/avatars/user_current.jpg",
    "points": 1245,
    "pointsToNextRank": 55,
    "nextRankUser": {
      "rank": 3,
      "userName": "Funny C",
      "points": 1300
    }
  }
}
```

---

## 17. Home Screen Features

### 17.1 Get Tip of the Day
**GET** `/api/home/tip-of-the-day`

**Headers:** `Authorization: Bearer <token>` (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "tip_123",
    "title": "Daily Fitness Tip",
    "content": "Lorem ipsum dolor sit amet consectetur. Et neque id mauris diam facilisis turpis nibh malesuada. At amet.",
    "date": "2024-01-20",
    "category": "general",
    "image": "https://cdn.fitapp.com/tips/tip_123.jpg"
  }
}
```

### 17.2 Get Daily Goal
**GET** `/api/home/daily-goal`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "daily_goal_123",
    "title": "Simple Dumbbell Handless for Thighs, Buttock & Ankle",
    "description": "Complete this workout to achieve your daily goal",
    "videoUrl": "https://cdn.fitapp.com/workouts/daily_goal_123.mp4",
    "thumbnail": "https://cdn.fitapp.com/workouts/daily_goal_123_thumb.jpg",
    "duration": 30,
    "difficulty": "beginner",
    "sponsor": {
      "name": "Nike Free Metcon 6",
      "discount": "60% Discount",
      "logo": "https://cdn.fitapp.com/sponsors/nike.jpg"
    },
    "isCompleted": false,
    "progress": 0,
    "createdAt": "2024-01-20T00:00:00Z"
  }
}
```

### 17.3 Join Daily Goal
**POST** `/api/home/daily-goal/join`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "dailyGoalId": "daily_goal_123",
    "isJoined": true,
    "message": "Successfully joined daily goal"
  }
}
```

### 17.4 Complete Daily Goal
**POST** `/api/home/daily-goal/:dailyGoalId/complete`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "completedAt": "2024-01-20T14:30:00Z",
  "duration": 30,
  "caloriesBurned": 250
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dailyGoalId": "daily_goal_123",
    "isCompleted": true,
    "pointsEarned": 100,
    "completedAt": "2024-01-20T14:30:00Z"
  }
}
```

### 17.5 Get Ongoing Challenges (Home Screen)
**GET** `/api/home/ongoing-challenges`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit`: number (default: 2)

**Response:**
```json
{
  "success": true,
  "data": {
    "challenges": [
      {
        "id": "challenge_1",
        "title": "July Weekly Challenge",
        "description": "Run 15km this week",
        "thumbnail": "https://cdn.fitapp.com/challenges/challenge_1.jpg",
        "participantsCount": 20234,
        "daysLeft": 4,
        "isJoined": false,
        "sponsor": {
          "name": "Jetter",
          "logo": "https://cdn.fitapp.com/sponsors/jetter.jpg"
        }
      }
    ]
  }
}
```

---

## 18. App Preferences

### 18.1 Get App Preferences
**GET** `/api/preferences`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "darkMode": false,
    "notifications": true,
    "notificationSettings": {
      "pushNotifications": true,
      "emailNotifications": false,
      "smsNotifications": false,
      "challengeReminders": true,
      "dailyGoalReminders": true,
      "socialNotifications": true,
      "productUpdates": false
    },
    "language": "en",
    "units": {
      "distance": "km",
      "weight": "kg",
      "temperature": "celsius"
    }
  }
}
```

### 18.2 Update Dark Mode Preference
**PUT** `/api/preferences/dark-mode`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "darkMode": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "darkMode": true,
    "message": "Dark mode preference updated"
  }
}
```

### 18.3 Update Notifications Preference
**PUT** `/api/preferences/notifications`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "notifications": true,
  "notificationSettings": {
    "pushNotifications": true,
    "emailNotifications": false,
    "smsNotifications": false,
    "challengeReminders": true,
    "dailyGoalReminders": true,
    "socialNotifications": true,
    "productUpdates": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": true,
    "notificationSettings": {
      "pushNotifications": true,
      "emailNotifications": false,
      "smsNotifications": false,
      "challengeReminders": true,
      "dailyGoalReminders": true,
      "socialNotifications": true,
      "productUpdates": false
    },
    "message": "Notification preferences updated"
  }
}
```

### 18.4 Update Language Preference
**PUT** `/api/preferences/language`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "language": "en",
    "message": "Language preference updated"
  }
}
```

### 18.5 Update Units Preference
**PUT** `/api/preferences/units`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "distance": "km",
  "weight": "kg",
  "temperature": "celsius"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "units": {
      "distance": "km",
      "weight": "kg",
      "temperature": "celsius"
    },
    "message": "Units preference updated"
  }
}
```

---

## 19. Device Connections

### 19.1 Get Connected Devices
**GET** `/api/devices`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "devices": [
      {
        "id": "device_123",
        "type": "apple_watch",
        "name": "Apple Watch Series 9",
        "model": "Series 9",
        "isConnected": true,
        "lastSyncedAt": "2024-01-20T10:30:00Z",
        "batteryLevel": 85,
        "capabilities": ["heart_rate", "steps", "workouts", "sleep"]
      },
      {
        "id": "device_456",
        "type": "fitbit",
        "name": "Fitbit Charge 5",
        "model": "Charge 5",
        "isConnected": false,
        "lastSyncedAt": "2024-01-19T14:20:00Z",
        "batteryLevel": null,
        "capabilities": ["heart_rate", "steps", "workouts", "sleep", "calories"]
      }
    ]
  }
}
```

### 19.2 Connect Device
**POST** `/api/devices/connect`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "apple_watch" | "fitbit" | "garmin" | "samsung_health" | "google_fit",
  "deviceId": "device_unique_id",
  "name": "Apple Watch Series 9",
  "model": "Series 9",
  "authToken": "oauth_token_from_device"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "device_123",
    "type": "apple_watch",
    "name": "Apple Watch Series 9",
    "model": "Series 9",
    "isConnected": true,
    "connectedAt": "2024-01-20T10:30:00Z",
    "capabilities": ["heart_rate", "steps", "workouts", "sleep"]
  }
}
```

### 19.3 Disconnect Device
**DELETE** `/api/devices/:deviceId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Device disconnected successfully"
}
```

### 19.4 Sync Device Data
**POST** `/api/devices/:deviceId/sync`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "deviceId": "device_123",
    "syncedAt": "2024-01-20T10:35:00Z",
    "dataSynced": {
      "steps": 8500,
      "calories": 450,
      "heartRate": 72,
      "workouts": 1,
      "sleepHours": 7.5
    }
  }
}
```

### 19.5 Get Device Data
**GET** `/api/devices/:deviceId/data`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate`: string (ISO date, optional)
- `endDate`: string (ISO date, optional)
- `type`: `"steps"` | `"heart_rate"` | `"workouts"` | `"sleep"` | `"calories"` (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "deviceId": "device_123",
    "deviceName": "Apple Watch Series 9",
    "data": [
      {
        "date": "2024-01-20",
        "steps": 8500,
        "calories": 450,
        "heartRate": {
          "average": 72,
          "max": 145,
          "min": 58
        },
        "workouts": [
          {
            "id": "workout_123",
            "type": "running",
            "duration": 30,
            "calories": 250,
            "distance": 5.2,
            "startTime": "2024-01-20T07:00:00Z"
          }
        ],
        "sleep": {
          "hours": 7.5,
          "quality": "good"
        }
      }
    ]
  }
}
```

---

## 20. Subscription & Billing

### 20.1 Get Subscription Status
**GET** `/api/subscription`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "subscription_123",
    "plan": {
      "id": "plan_premium",
      "name": "Premium Plan",
      "price": "₦25,000",
      "billingCycle": "monthly",
      "features": [
        "Unlimited workouts",
        "Advanced analytics",
        "Priority support",
        "Ad-free experience"
      ]
    },
    "status": "active" | "cancelled" | "expired" | "trial",
    "currentPeriodStart": "2024-01-01T00:00:00Z",
    "currentPeriodEnd": "2024-02-01T00:00:00Z",
    "trialEndsAt": null,
    "autoRenew": true,
    "paymentMethod": {
      "id": "payment_method_123",
      "type": "card",
      "last4": "1234"
    }
  }
}
```

### 20.2 Get Available Plans
**GET** `/api/subscription/plans`

**Headers:** `Authorization: Bearer <token>` (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "plan_basic",
        "name": "Basic Plan",
        "price": "₦10,000",
        "billingCycle": "monthly",
        "features": [
          "Limited workouts",
          "Basic analytics",
          "Standard support"
        ],
        "popular": false
      },
      {
        "id": "plan_premium",
        "name": "Premium Plan",
        "price": "₦25,000",
        "billingCycle": "monthly",
        "features": [
          "Unlimited workouts",
          "Advanced analytics",
          "Priority support",
          "Ad-free experience"
        ],
        "popular": true
      },
      {
        "id": "plan_annual",
        "name": "Annual Plan",
        "price": "₦200,000",
        "billingCycle": "yearly",
        "discount": "33% off",
        "features": [
          "Unlimited workouts",
          "Advanced analytics",
          "Priority support",
          "Ad-free experience",
          "Annual discount"
        ],
        "popular": false
      }
    ]
  }
}
```

### 20.3 Subscribe to Plan
**POST** `/api/subscription/subscribe`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "planId": "plan_premium",
  "paymentMethodId": "payment_method_123",
  "couponCode": "DISCOUNT10" (optional)
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "subscription_123",
    "plan": {
      "id": "plan_premium",
      "name": "Premium Plan",
      "price": "₦25,000"
    },
    "status": "active",
    "currentPeriodStart": "2024-01-20T10:30:00Z",
    "currentPeriodEnd": "2024-02-20T10:30:00Z",
    "autoRenew": true
  }
}
```

### 20.4 Cancel Subscription
**POST** `/api/subscription/cancel`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "reason": "Too expensive" (optional),
  "feedback": "Would like a cheaper option" (optional)
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "subscription_123",
    "status": "cancelled",
    "cancelledAt": "2024-01-20T10:30:00Z",
    "currentPeriodEnd": "2024-02-20T10:30:00Z",
    "message": "Subscription will remain active until the end of the current billing period"
  }
}
```

### 20.5 Reactivate Subscription
**POST** `/api/subscription/reactivate`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "subscription_123",
    "status": "active",
    "autoRenew": true,
    "message": "Subscription reactivated successfully"
  }
}
```

### 20.6 Update Subscription Plan
**PUT** `/api/subscription/plan`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "planId": "plan_annual"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "subscription_123",
    "plan": {
      "id": "plan_annual",
      "name": "Annual Plan",
      "price": "₦200,000"
    },
    "status": "active",
    "message": "Subscription plan updated. Changes will take effect at the start of the next billing cycle."
  }
}
```

### 20.7 Get Billing History
**GET** `/api/subscription/billing-history`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "invoices": [
      {
        "id": "invoice_123",
        "subscriptionId": "subscription_123",
        "planName": "Premium Plan",
        "amount": "₦25,000",
        "status": "paid",
        "paidAt": "2024-01-01T10:30:00Z",
        "periodStart": "2024-01-01T00:00:00Z",
        "periodEnd": "2024-02-01T00:00:00Z",
        "invoiceUrl": "https://cdn.fitapp.com/invoices/invoice_123.pdf"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 12,
      "totalPages": 1
    }
  }
}
```

### 20.8 Download Invoice
**GET** `/api/subscription/invoices/:invoiceId/download`

**Headers:** `Authorization: Bearer <token>`

**Response:** PDF file download

---

## 21. Daily Goals Management

### 21.1 Get All Daily Goals
**GET** `/api/daily-goals`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status`: `"active"` | `"completed"` | `"upcoming"` (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "dailyGoals": [
      {
        "id": "daily_goal_123",
        "title": "Simple Dumbbell Handless for Thighs, Buttock & Ankle",
        "description": "Complete this workout to achieve your daily goal",
        "videoUrl": "https://cdn.fitapp.com/workouts/daily_goal_123.mp4",
        "thumbnail": "https://cdn.fitapp.com/workouts/daily_goal_123_thumb.jpg",
        "duration": 30,
        "difficulty": "beginner",
        "category": "strength",
        "sponsor": {
          "name": "Nike Free Metcon 6",
          "discount": "60% Discount",
          "logo": "https://cdn.fitapp.com/sponsors/nike.jpg"
        },
        "date": "2024-01-20",
        "isCompleted": false,
        "progress": 0,
        "pointsReward": 100,
        "createdAt": "2024-01-20T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

### 21.2 Get Daily Goal Details
**GET** `/api/daily-goals/:dailyGoalId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "daily_goal_123",
    "title": "Simple Dumbbell Handless for Thighs, Buttock & Ankle",
    "description": "Complete this workout to achieve your daily goal",
    "videoUrl": "https://cdn.fitapp.com/workouts/daily_goal_123.mp4",
    "thumbnail": "https://cdn.fitapp.com/workouts/daily_goal_123_thumb.jpg",
    "duration": 30,
    "difficulty": "beginner",
    "category": "strength",
    "exercises": [
      {
        "name": "Dumbbell Squats",
        "sets": 3,
        "reps": 12,
        "duration": null
      },
      {
        "name": "Lunges",
        "sets": 3,
        "reps": 10,
        "duration": null
      }
    ],
    "sponsor": {
      "name": "Nike Free Metcon 6",
      "discount": "60% Discount",
      "logo": "https://cdn.fitapp.com/sponsors/nike.jpg",
      "productUrl": "https://fitapp.com/products/nike-metcon-6"
    },
    "date": "2024-01-20",
    "isCompleted": false,
    "progress": 0,
    "pointsReward": 100,
    "completedAt": null,
    "createdAt": "2024-01-20T00:00:00Z"
  }
}
```

### 21.3 Get User Daily Goals Progress
**GET** `/api/daily-goals/progress`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate`: string (ISO date, optional)
- `endDate`: string (ISO date, optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalGoals": 30,
    "completedGoals": 25,
    "completionRate": 83.33,
    "totalPointsEarned": 2500,
    "currentStreak": 7,
    "longestStreak": 15,
    "progress": [
      {
        "date": "2024-01-20",
        "isCompleted": true,
        "pointsEarned": 100,
        "completedAt": "2024-01-20T14:30:00Z"
      },
      {
        "date": "2024-01-19",
        "isCompleted": true,
        "pointsEarned": 100,
        "completedAt": "2024-01-19T16:20:00Z"
      }
    ]
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "message": "Email is required"
    }
  }
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to access this resource"
  }
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## Notes for Backend Developer

1. **Pagination**: All list endpoints should support pagination with `page` and `limit` query parameters. Default `limit` is 20.

2. **File Uploads**: For image/video uploads, use `multipart/form-data` with FormData. Accept base64 strings or file uploads.

3. **Authentication**: All endpoints except signup, login, and forgot password require Bearer token authentication.

4. **Role-Based Access**: 
   - Creator endpoints (`/api/creator/*`) should only be accessible to users with `role: "creator"`
   - Vendor endpoints (`/api/vendor/*`) should only be accessible to users with `role: "vendor"`
   - User endpoints are accessible to all authenticated users

5. **Currency**: All prices are in Nigerian Naira (₦). Store prices as strings to preserve formatting.

6. **Date Format**: Use ISO 8601 format for all dates (e.g., `2024-01-20T10:30:00Z`).

7. **Image URLs**: Return full CDN URLs for all images. Support multiple image sizes if needed.

8. **Real-time Updates**: Consider implementing WebSocket or Server-Sent Events for:
   - Real-time notifications
   - Live challenge leaderboard updates
   - Order status updates

9. **Rate Limiting**: Implement rate limiting for:
   - Authentication endpoints
   - Post creation
   - Search endpoints

10. **Caching**: Consider caching for:
    - Product listings
    - Activity lists
    - Challenge lists

