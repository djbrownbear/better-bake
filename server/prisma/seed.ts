import "dotenv/config";
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';

// Create PostgreSQL connection pool for the adapter
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
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

const initialUsers = [
  {
    id: 'aaronb',
    email: 'aaron@example.com',
    password: 'password123',
    name: 'Aaron Brown',
    avatarURL: 'https://i.imgur.com/lF8TibM.png',
  },
  {
    id: 'anitab',
    email: 'anita@example.com',
    password: 'abc321',
    name: 'Anita Brown',
    avatarURL: 'https://i.imgur.com/HKCv3hu.png',
  },
  {
    id: 'lennyc',
    email: 'lenny@example.com',
    password: 'xyz123',
    name: 'Lenny Civic',
    avatarURL: 'https://i.imgur.com/2zUPqSn.png',
  },
  {
    id: 'maddiem',
    email: 'maddie@example.com',
    password: 'pass246',
    name: 'Maddie Mazda',
    avatarURL: 'https://i.imgur.com/UM9UYHZ.png',
  },
];

const initialPolls = [
  {
    id: '8xf0y6ziyjabvozdd253nd',
    authorId: 'aaronb',
    createdAt: new Date(1649386830421),
    optionOneText: "Flo's Davy Jones Locker Bread Sculpture",
    optionOneBaker: 'Flo',
    optionOneSeason: '08',
    optionOneEpisode: '0803',
    optionTwoText: "Sophie's Picnic Basket Bread Sculpture",
    optionTwoBaker: 'Sophie',
    optionTwoSeason: '08',
    optionTwoEpisode: '0803',
    votes: [
      { userId: 'aaronb', option: 'optionOne' }
    ]
  },
  {
    id: '6ni6ok3ym7mf1p33lnez',
    authorId: 'lennyc',
    createdAt: new Date(1645928870305),
    optionOneText: "Stacey's Ascot Hat Bread Sculpture",
    optionOneBaker: 'Stacey',
    optionOneSeason: '08',
    optionOneEpisode: '0803',
    optionTwoText: "Steven's The Bag I Knead Bread Sculpture",
    optionTwoBaker: 'Steven',
    optionTwoSeason: '08',
    optionTwoEpisode: '0803',
    votes: [
      { userId: 'lennyc', option: 'optionTwo' },
      { userId: 'aaronb', option: 'optionTwo' }
    ]
  },
  {
    id: 'am8ehyc8byjqgar0jgpub9',
    authorId: 'aaronb',
    createdAt: new Date(1648435423015),
    optionOneText: "Liam's Kneadapolitan Bread Sculpture",
    optionOneBaker: 'Liam',
    optionOneSeason: '08',
    optionOneEpisode: '0803',
    optionTwoText: "Julia's Snail Bread Sculpture",
    optionTwoBaker: 'Julia',
    optionTwoSeason: '08',
    optionTwoEpisode: '0803',
    votes: [
      { userId: 'aaronb', option: 'optionTwo' }
    ]
  },
  {
    id: 'loxhs1bqm25b708cmbf3g',
    authorId: 'anitab',
    createdAt: new Date(1646272810502),
    optionOneText: "Yan's Rama-bread Bread Sculpture",
    optionOneBaker: 'Yan',
    optionOneSeason: '08',
    optionOneEpisode: '0803',
    optionTwoText: "Tom's T-Bread Bread Sculpture",
    optionTwoBaker: 'Tom',
    optionTwoSeason: '08',
    optionTwoEpisode: '0803',
    votes: [
      { userId: 'aaronb', option: 'optionTwo' }
    ]
  },
  {
    id: 'vthrdm985a262al8qx3do',
    authorId: 'anitab',
    createdAt: new Date(1643948430541),
    optionOneText: "Kate's Terracotta Bread Sculpture",
    optionOneBaker: 'Kate',
    optionOneSeason: '08',
    optionOneEpisode: '0803',
    optionTwoText: "James's Owl-Bread Bread Sculpture",
    optionTwoBaker: 'James',
    optionTwoSeason: '08',
    optionTwoEpisode: '0803',
    votes: [
      { userId: 'anitab', option: 'optionOne' },
      { userId: 'lennyc', option: 'optionTwo' }
    ]
  },
  {
    id: 'xj352vofupe1dqz9emx13r',
    authorId: 'lennyc',
    createdAt: new Date(1642125610022),
    optionOneText: "David's Village of Bread Bread Sculpture",
    optionOneBaker: 'David',
    optionOneSeason: '10',
    optionOneEpisode: '1003',
    optionTwoText: "Rosie's Bread Bag Bread Sculpture",
    optionTwoBaker: 'Rosie',
    optionTwoSeason: '10',
    optionTwoEpisode: '1003',
    votes: [
      { userId: 'lennyc', option: 'optionOne' },
      { userId: 'anitab', option: 'optionTwo' },
      { userId: 'maddiem', option: 'optionOne' }
    ]
  }
];

async function main() {
  console.log('Starting seed...');
  
  // 1. Seed Bakers
  for (const baker of bakers) {
    await prisma.baker.upsert({
      where: { id: baker.id },
      update: {},
      create: baker,
    });
  }
  console.log(`Seeded ${bakers.length} bakers`);

  // 2. Seed Users
  for (const user of initialUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        password: hashedPassword,
        name: user.name,
        avatarURL: user.avatarURL,
      },
      create: {
        id: user.id,
        email: user.email,
        password: hashedPassword,
        name: user.name,
        avatarURL: user.avatarURL,
      },
    });
  }
  console.log(`Seeded ${initialUsers.length} users`);

  // 3. Seed Polls
  for (const pollData of initialPolls) {
    const { votes, ...poll } = pollData;
    
    // Create poll and votes in transactionally safe way
    await prisma.poll.upsert({
      where: { id: poll.id },
      update: {},
      create: {
        ...poll,
        votes: {
          create: votes
        }
      }
    });
  }
  console.log(`Seeded ${initialPolls.length} polls`);
  
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    if (pool) await pool.end();
  });
