const { execSync } = require('child_process');

async function migrateDatabase() {
  try {
    console.log('🔄 Running database migrations...');
    
    // Run Prisma migrations
    execSync('npx prisma migrate dev --name init', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('✅ Database migrations completed successfully!');
    
  } catch (error) {
    console.error('❌ Database migration failed:', error.message);
    console.log('💡 Make sure your DATABASE_URL is correctly set in .env.local');
  }
}

migrateDatabase();
