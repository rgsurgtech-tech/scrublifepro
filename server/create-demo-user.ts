import bcrypt from "bcryptjs";
import { storage } from "./storage";

async function createDemoUser() {
  try {
    console.log('🎭 Creating demo user...');
    
    const demoEmail = 'demo@scrublifepro.com';
    const demoPassword = 'Demo2025!';
    
    // Check if demo user already exists
    const existingUser = await storage.getUserByEmail(demoEmail);
    
    if (existingUser) {
      console.log('Demo user already exists. Updating to premium tier...');
      // Update existing user to premium
      await storage.updateUser(existingUser.id, {
        subscriptionTier: 'premium',
        subscriptionStatus: 'active'
      });
      console.log('✅ Demo user updated to premium tier');
    } else {
      // Create new demo user
      const hashedPassword = await bcrypt.hash(demoPassword, 10);
      
      const demoUser = await storage.createUser({
        email: demoEmail,
        password: hashedPassword,
        firstName: 'Demo',
        lastName: 'User',
        certifications: ['CST'],
        yearsOfExperience: 5,
        subscriptionTier: 'premium',
        subscriptionStatus: 'active'
      });
      
      console.log('✅ Demo user created successfully!');
      console.log('   Email:', demoEmail);
      console.log('   Password:', demoPassword);
      console.log('   Tier: Premium (Full Access)');
    }
    
    console.log('\n📋 Demo Login Credentials:');
    console.log('   Email: demo@scrublifepro.com');
    console.log('   Password: Demo2025!');
    console.log('   Access: Premium (all features unlocked)');
    
  } catch (error) {
    console.error('❌ Failed to create demo user:', error);
    throw error;
  }
}

createDemoUser()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
