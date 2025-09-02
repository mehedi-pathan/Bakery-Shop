const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@bakery.com' },
      update: {},
      create: {
        email: 'admin@bakery.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
        phone: '01622839616'
      }
    });

    console.log('✅ Admin user created:', adminUser.email);

    // Seed products
    const products = [
      {
        name: 'Fresh Croissantsssss',
        description: 'Buttery, flaky croissant baked fresh daily',
        price: 3.50,
        category: 'Bakery',
        image: '/placeholder.svg?height=200&width=200',
        isActive: true
      },
      {
        name: 'Sourdough Bread',
        description: 'Artisan sourdough with perfect crust',
        price: 8.00,
        category: 'Bakery',
        image: '/placeholder.svg?height=200&width=200',
        isActive: true
      },
      {
        name: 'Chocolate Muffin',
        description: 'Rich chocolate muffin with chocolate chips',
        price: 4.25,
        category: 'Bakery',
        image: '/placeholder.svg?height=200&width=200',
        isActive: true
      },
      {
        name: 'Apple Danish',
        description: 'Flaky pastry with sweet apple filling',
        price: 4.75,
        category: 'Pastry',
        image: '/placeholder.svg?height=200&width=200',
        isActive: true
      },
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato, mozzarella, and basil',
        price: 14.99,
        category: 'Pizza',
        image: '/placeholder.svg?height=200&width=200',
        isActive: true
      },
      {
        name: 'Classic Beef Burger',
        description: 'Juicy beef patty with lettuce, tomato, and cheese',
        price: 12.99,
        category: 'Burger',
        image: '/placeholder.svg?height=200&width=200',
        isActive: true
      },
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 4.50,
        category: 'Drinks',
        image: '/placeholder.svg?height=200&width=200',
        isActive: true
      }
    ];

    for (const product of products) {
      try {
        await prisma.product.upsert({
          where: { name: product.name },
          update: product,
          create: product
        });
        console.log(`✅ Product "${product.name}" created/updated`);
      } catch (error) {
        console.log(`⚠️ Product "${product.name}" already exists, skipping...`);
      }
    }

    console.log('✅ Products seeded successfully');

    console.log('🎉 Database setup completed!');
    console.log('📧 Admin login: admin@bakery.com');
    console.log('🔑 Admin password: admin123');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
