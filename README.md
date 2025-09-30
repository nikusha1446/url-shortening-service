# URL Shortening Service

A simple and efficient RESTful API for shortening long URLs built with Node.js, Express, Prisma, and PostgreSQL.

## ✨ Features

- **Create short URLs** from long URLs
- **Retrieve original URLs** from short codes
- **Update existing URLs** 
- **Delete URLs**
- **Track access statistics** (view count)
- **URL validation** and error handling
- **Unique short code generation** using nanoid
- **PostgreSQL database** with Prisma ORM

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Short Code Generation**: nanoid

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikusha1446/url-shortening-service.git
   cd url-shortening-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/urlshortener"
   PORT=3000
   ```

4. **Set up the database**
   ```bash
   # Run database migrations
   npx prisma migrate dev --name init
   
   # Generate Prisma client
   npx prisma generate
   ```

5. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api/v1/shorten`

### 1. Create Short URL
**POST** `/api/v1/shorten`

**Request Body:**
```json
{
  "url": "https://www.example.com/some/long/url"
}
```

**Response (201 Created):**
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2025-09-01T12:00:00Z",
  "updatedAt": "2025-09-01T12:00:00Z"
}
```

### 2. Get Original URL
**GET** `/api/v1/shorten/:shortCode`

**Response (200 OK):**
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2025-09-01T12:00:00Z",
  "updatedAt": "2025-09-01T12:00:00Z"
}
```

*Note: This endpoint increments the access count for statistics.*

### 3. Update URL
**PUT** `/api/v1/shorten/:shortCode`

**Request Body:**
```json
{
  "url": "https://www.example.com/some/updated/url"
}
```

**Response (200 OK):**
```json
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "shortCode": "abc123",
  "createdAt": "2025-09-01T12:00:00Z",
  "updatedAt": "2025-09-01T12:30:00Z"
}
```

### 4. Delete URL
**DELETE** `/api/v1/shorten/:shortCode`

**Response:** `204 No Content`

### 5. Get URL Statistics
**GET** `/api/v1/shorten/:shortCode/stats`

**Response (200 OK):**
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2025-09-01T12:00:00Z",
  "updatedAt": "2025-09-01T12:00:00Z",
  "accessCount": 10
}
```

## 📄 License

This project is licensed under the ISC License.
