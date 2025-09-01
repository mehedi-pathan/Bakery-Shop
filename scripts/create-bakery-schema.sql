-- Create the bakery shop database schema
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
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

CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ADVANCE_VERIFIED', 'IN_PROGRESS', 'READY', 'COMPLETED', 'CANCELLED')),
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

CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY ("orderId") REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY ("productId") REFERENCES products(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders("userId");
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items("orderId");
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products("isActive");
