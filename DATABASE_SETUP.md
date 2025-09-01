# Database Setup Guide for Bakery Shop

This guide will help you connect your Bakery Shop application to a Neon PostgreSQL database.

## 🚀 Quick Setup

### 1. Create Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up/Login to your account
3. Click "Create New Project"
4. Choose a project name (e.g., "bakery-shop")
5. Select a region close to your users
6. Click "Create Project"

### 2. Get Connection String

1. In your Neon project dashboard, click on "Connection Details"
2. Copy the connection string that looks like:
   ```
   postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require
   ```

### 3. Set Environment Variables

Create a `.env.local` file in your project root:

```env
# Database Configuration
DATABASE_URL="your-neon-connection-string-here"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER="01622839616"
```

### 4. Run Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Setup initial data (admin user + sample products)
npm run db:setup
```

## 🔧 Detailed Steps

### Step 1: Install Dependencies

Make sure you have the required dependencies:

```bash
npm install @prisma/client bcryptjs
```

### Step 2: Environment Configuration

The application uses these environment variables:

- `DATABASE_URL`: Your Neon PostgreSQL connection string
- `NEXTAUTH_SECRET`: A random string for NextAuth.js security
- `NEXTAUTH_URL`: Your application URL
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: WhatsApp number for customer support

### Step 3: Database Schema

The application uses Prisma ORM with the following models:

- **User**: Customer and admin accounts
- **Product**: Bakery items with categories
- **Order**: Customer orders with status tracking
- **OrderItem**: Individual items within orders

### Step 4: Database Commands

Available database commands:

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Setup initial data
npm run db:setup

# Open Prisma Studio (database GUI)
npm run db:studio

# Reset database (⚠️ destructive)
npm run db:reset
```

## 🛠 Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check your `DATABASE_URL` format
   - Ensure SSL mode is set to `require`
   - Verify your Neon project is active

2. **Migration Errors**
   - Run `npm run db:reset` to start fresh
   - Check Prisma schema syntax
   - Ensure database has proper permissions

3. **Authentication Issues**
   - Verify `NEXTAUTH_SECRET` is set
   - Check admin credentials in setup script
   - Ensure proper role assignments

### Database Health Check

Test your database connection:

```bash
# Start development server
npm run dev

# Visit health endpoint
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "tables": ["users", "products", "orders", "order_items"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📊 Database Schema Details

### Users Table
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'USER',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Products Table
```sql
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING',
    subtotal DECIMAL(10,2) NOT NULL,
    "customerName" TEXT,
    "customerPhone" TEXT,
    note TEXT,
    "txnId" TEXT,
    "verifiedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES users(id)
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id TEXT PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY ("orderId") REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY ("productId") REFERENCES products(id)
);
```

## 🔐 Default Admin Account

After running the setup script, you'll have a default admin account:

- **Email**: admin@bakery.com
- **Password**: admin123

⚠️ **Important**: Change these credentials in production!

## 🚀 Production Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your Neon connection string
   - `NEXTAUTH_SECRET`: Generate a secure random string
   - `NEXTAUTH_URL`: Your production domain
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your WhatsApp number

3. Deploy automatically on push to main branch

### Environment Variables for Production

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require"
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_WHATSAPP_NUMBER="your-whatsapp-number"
```

## 📞 Support

If you encounter issues:

1. Check the application logs
2. Verify database connection
3. Test with the health endpoint
4. Review Prisma documentation
5. Check Neon status page

## 🔄 Database Backup

Neon provides automatic backups, but you can also:

1. Use Prisma Studio to export data
2. Use Neon's point-in-time recovery
3. Set up automated backups via Neon API

---

**Happy baking! 🍞**
