const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifySetup() {
  try {
    console.log('🔍 Verifying database setup...\n');

    // Check admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@bakery.com' }
    });

    if (adminUser) {
      console.log('✅ Admin user found:');
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Role: ${adminUser.role}`);
      console.log(`   Created: ${adminUser.createdAt}\n`);
    } else {
      console.log('❌ Admin user not found\n');
    }

    // Check products
    const products = await prisma.product.findMany({
      orderBy: { category: 'asc' }
    });

    console.log(`✅ Found ${products.length} products:\n`);

    const categories = {};
    products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });

    Object.keys(categories).forEach(category => {
      console.log(`📦 ${category} (${categories[category].length} items):`);
      categories[category].forEach(product => {
        console.log(`   • ${product.name} - $${product.price} (${product.isActive ? 'Active' : 'Inactive'})`);
      });
      console.log('');
    });

    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection is working');

    console.log('\n🎉 Database setup verification completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Visit http://localhost:3000/admin');
    console.log('2. Login with admin@bakery.com / admin123');
    console.log('3. Go to Products to manage your menu items');

  } catch (error) {
    console.error('❌ Verification failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifySetup();
