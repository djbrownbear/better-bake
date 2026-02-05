import "dotenv/config";
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const bakers = [
  // Series 1
  { id: 'edd-kimber', name: 'Edd Kimber', series: '1' },
  { id: 'miranda-gore-browne', name: 'Miranda Gore Browne', series: '1' },
  { id: 'ruth-clemens', name: 'Ruth Clemens', series: '1' },
  
  // Series 2
  { id: 'joanne-wheatley', name: 'Joanne Wheatley', series: '2' },
  { id: 'mary-anne-boermans', name: 'Mary-Anne Boermans', series: '2' },
  { id: 'holly-bell', name: 'Holly Bell', series: '2' },
  
  // Series 3
  { id: 'john-whaite', name: 'John Whaite', series: '3' },
  { id: 'brendan-lynch', name: 'Brendan Lynch', series: '3' },
  { id: 'james-morton', name: 'James Morton', series: '3' },
  
  // Series 4
  { id: 'frances-quinn', name: 'Frances Quinn', series: '4' },
  { id: 'kimberley-wilson', name: 'Kimberley Wilson', series: '4' },
  { id: 'ruby-tandoh', name: 'Ruby Tandoh', series: '4' },
  
  // Series 5
  { id: 'nancy-birtwhistle', name: 'Nancy Birtwhistle', series: '5' },
  { id: 'richard-burr', name: 'Richard Burr', series: '5' },
  { id: 'luis-troyano', name: 'Luis Troyano', series: '5' },
  
  // Series 6
  { id: 'nadiya-hussain', name: 'Nadiya Hussain', series: '6' },
  { id: 'tamal-ray', name: 'Tamal Ray', series: '6' },
  { id: 'ian-cumming', name: 'Ian Cumming', series: '6' },
  
  // Series 7
  { id: 'candice-brown', name: 'Candice Brown', series: '7' },
  { id: 'jane-beedle', name: 'Jane Beedle', series: '7' },
  { id: 'andrew-smyth', name: 'Andrew Smyth', series: '7' },
  
  // Series 8
  { id: 'sophie-faldo', name: 'Sophie Faldo', series: '8' },
  { id: 'kate-lyon', name: 'Kate Lyon', series: '8' },
  { id: 'steven-carter-bailey', name: 'Steven Carter-Bailey', series: '8' },
  
  // Series 9
  { id: 'rahul-mandal', name: 'Rahul Mandal', series: '9' },
  { id: 'kim-joy', name: 'Kim-Joy', series: '9' },
  { id: 'ruby-bhogal', name: 'Ruby Bhogal', series: '9' },
  
  // Series 10
  { id: 'david-atherton', name: 'David Atherton', series: '10' },
  { id: 'steph-blackwell', name: 'Steph Blackwell', series: '10' },
  { id: 'alice-fevronia', name: 'Alice Fevronia', series: '10' },
];

async function main() {
  console.log('Starting seed...');
  
  for (const baker of bakers) {
    await prisma.baker.upsert({
      where: { id: baker.id },
      update: {},
      create: baker,
    });
  }
  
  console.log(`Seeded ${bakers.length} bakers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
