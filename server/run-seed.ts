import { seedExamQuestions } from "./seed-exam-questions";

async function runSeed() {
  try {
    console.log('🌱 Starting database seed...');
    const result = await seedExamQuestions();
    console.log('✅ Seed completed successfully:', result);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

runSeed();
