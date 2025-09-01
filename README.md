# Fresh Bakery Shop - Complete Ordering Website

A modern, full-stack bakery ordering website built with Next.js 15, featuring real-time order management, WhatsApp payment integration, and a comprehensive admin dashboard.

## 🚀 Project Overview

Fresh Bakery Shop is a production-ready ordering platform that allows customers to browse products, place orders, and make advance payments via WhatsApp. The system includes both customer-facing features and a powerful admin dashboard for order and product management.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS
- **UI Components**: ShadCN UI with custom bakery theme
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (email + password)
- **State Management**: React Context API for cart management
- **Data Fetching**: SWR for client-side data fetching
- **Deployment**: Vercel-ready configuration

## ✨ Features

### Customer Features
- **Modern Landing Page**: Animated logo, hero section, and featured categories
- **Product Menu**: Filterable by category with search functionality
- **Shopping Cart**: Real-time cart management with quantity controls
- **Order Placement**: Secure checkout with customer information
- **Order Tracking**: Personal dashboard to track order status
- **WhatsApp Integration**: Payment confirmation via WhatsApp

### Admin Features
- **Kanban Board**: Visual order management across status columns
- **Order Management**: Payment verification and status updates
- **Product Management**: Add, edit, and manage menu items
- **Real-time Updates**: Live order status tracking
- **Role-based Access**: Secure admin-only areas

### Payment Flow
- **Manual Payment System**: No payment gateway required
- **WhatsApp Confirmation**: 20-50% advance payment via WhatsApp
- **Transaction Verification**: Admin manually verifies payments
- **Order Status Tracking**: Real-time status updates

## 🏗 Setup Instructions

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (recommended: Neon)
- Git

### 1. Clone Repository
\`\`\`bash
git clone <repository-url>
cd fresh-bakery-shop
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bakery_db"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER="01622839616"
\`\`\`

### 4. Database Setup
\`\`\`bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed initial data (optional)
npx prisma db seed
\`\`\`

### 5. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## 📊 Database Schema

### Core Models
- **User**: Customer and admin accounts with role-based access
- **Product**: Bakery items with categories and pricing
- **Order**: Customer orders with status tracking
- **OrderItem**: Individual items within orders

### Order Status Flow
1. `PENDING` → Order placed, awaiting payment
2. `ADVANCE_VERIFIED` → Payment confirmed by admin
3. `IN_PROGRESS` → Order being prepared
4. `READY` → Ready for customer pickup
5. `COMPLETED` → Order fulfilled
6. `CANCELLED` → Order cancelled

## 🎨 Design System

### Color Palette
- **Primary**: Emerald green (#059669) - Represents freshness and quality
- **Accent**: Bright emerald (#10b981) - For highlights and CTAs
- **Neutrals**: Warm grays and whites for clean, professional appearance

### Typography
- **Headings**: Geist Sans (bold weights)
- **Body**: Geist Sans (regular weights)
- **Responsive**: Mobile-first design approach

## 📱 WhatsApp Integration

### Features
- **Floating Support Widget**: Quick access to WhatsApp support
- **Order Confirmation**: Automated message templates
- **Payment Instructions**: Clear payment confirmation flow
- **Customer Support**: Direct line to bakery support

### Message Templates
- Order confirmation with payment instructions
- Customer support inquiries
- Order status updates
- Custom order requests

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Setup (Neon)
1. Create a Neon PostgreSQL database
2. Copy connection string to `DATABASE_URL`
3. Run migrations in production

### Environment Variables for Production
\`\`\`env
DATABASE_URL="your-neon-connection-string"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_WHATSAPP_NUMBER="your-whatsapp-number"
\`\`\`

## 🔐 Admin Access

### Default Admin Account
- **Email**: admin@bakery.com
- **Password**: admin123 (⚠️ Change in production!)

### Admin Features
- Order management with kanban board
- Payment verification system
- Product catalog management
- Real-time order tracking

## 📞 WhatsApp Payment Flow

### Customer Journey
1. Customer places order on website
2. Redirected to success page with WhatsApp link
3. Clicks WhatsApp button with pre-filled message
4. Sends advance payment (20-50% of total)
5. Shares transaction ID via WhatsApp
6. Admin verifies payment and updates order status
7. Customer receives pickup notification

### Admin Workflow
1. Receive WhatsApp message with transaction ID
2. Verify payment in banking system
3. Update order status to "ADVANCE_VERIFIED"
4. Prepare order and update to "IN_PROGRESS"
5. Mark as "READY" when complete
6. Complete order after customer pickup

## 🛡 Security Features

- **Role-based Authentication**: Separate customer and admin access
- **Protected Routes**: Admin areas require authentication
- **Input Validation**: Server-side validation for all forms
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Protection**: React's built-in XSS protection

## 🔧 Development

### Available Scripts
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
\`\`\`

### Project Structure
\`\`\`
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── admin/          # Admin dashboard pages
│   ├── auth/           # Authentication pages
│   └── ...             # Other pages
├── components/         # Reusable UI components
├── lib/               # Utility functions and configurations
├── prisma/            # Database schema and migrations
└── public/            # Static assets
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Notes

### Manual Payment System
This system uses a manual payment verification process via WhatsApp instead of automated payment gateways. This approach:
- Reduces transaction fees
- Provides personal customer service
- Allows flexible payment methods
- Maintains direct customer relationships

### Real-time Features
- Order status updates every 5 seconds
- Live kanban board for admins
- Instant cart updates
- Real-time inventory management

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or questions:
- Create an issue on GitHub
- Contact via WhatsApp: +8801622839616
- Email: eity.mehedipathan@gmail.com

---

**Built with ❤️ for fresh food lovers**
