// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// import * as bcrypt from 'bcrypt';

// async function main() {
//   // Check if admin user already exists
//   const existingUser = await prisma.user.findUnique({ where: { username: "admin" } });
  
//   if (!existingUser) {
//     const pass = await bcrypt.hash("@LockersAdmin123!", 10);
//     await prisma.user.create({
//       data: {
//         username: "admin@lockers",
//         password: pass,
//       }
//     });
//     console.log("Admin user created");
//   } else {
//     console.log("Admin user already exists");
//   }
// }

// main()
//   .then(() => console.log("DB Seeded"))
//   .finally(() => prisma.$disconnect());
