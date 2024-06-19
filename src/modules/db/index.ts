import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
export default db;

export const genId = () => nanoid(16);

const seedDb = async () => {
  if ((await db.cardData.count()) === 0) {
    await db.cardData.createMany({
      data: []
    })
    console.log(await db.cardData)
  }
}
seedDb();
