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
import 'dotenv/config';
console.log('DB_URL:', process.env.DATABASE_URL);

import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

function normalizeBranch(str: string) {
  return str.replace(/\s+/g, ''); // remove all spaces
}

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  console.log('🌱 Seeding users...');

  const branchesRes = await client.query(`SELECT id, name FROM "Branch"`);
  const branches = branchesRes.rows;

  if (branches.length === 0) {
    console.error('No branches found. Cannot seed staff.');
    process.exit(1);
  }

  const credentialsList: Array<{
    role: string;
    username: string;
    password: string;
    branch?: string;
  }> = [];

  for (const branch of branches) {
    const safeBranch = normalizeBranch(branch.name);

    const username = `staff_${safeBranch.toLowerCase()}`;
    const password = `Staff@${safeBranch}`; // no spaces EVER
    const hashed = await bcrypt.hash(password, 10);

    await client.query(
      `
      INSERT INTO "User" (username, password, role, "branchId")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
    `,
      [username, hashed, 'STAFF', branch.id],
    );

    credentialsList.push({
      role: 'STAFF',
      branch: branch.name,
      username,
      password,
    });
  }

  const adminUsername = 'admin@lockers';
  const adminPassword = '@LockersAdmin123!';
  const adminHash = await bcrypt.hash(adminPassword, 10);

    await client.query(
      `
      INSERT INTO "User" (username, password, role, "branchId")
      VALUES ($1, $2, $3, null)
      ON CONFLICT (username) DO NOTHING
    `,
      [adminUsername, adminHash, 'ADMIN'],
    );

        credentialsList.push({
          role: 'ADMIN',
          username: adminUsername,
          password: adminPassword,
        });

  console.log('\n✨ DONE. Here are the credentials:\n');
  console.table(credentialsList);

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
