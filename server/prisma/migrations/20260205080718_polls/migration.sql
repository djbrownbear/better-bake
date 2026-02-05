-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "optionOneText" TEXT NOT NULL,
    "optionOneBaker" TEXT NOT NULL,
    "optionOneSeason" TEXT NOT NULL,
    "optionOneEpisode" TEXT NOT NULL,
    "optionTwoText" TEXT NOT NULL,
    "optionTwoBaker" TEXT NOT NULL,
    "optionTwoSeason" TEXT NOT NULL,
    "optionTwoEpisode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Baker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "series" TEXT NOT NULL,

    CONSTRAINT "Baker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Poll_authorId_idx" ON "Poll"("authorId");

-- CreateIndex
CREATE INDEX "Poll_createdAt_idx" ON "Poll"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "Vote_pollId_idx" ON "Vote"("pollId");

-- CreateIndex
CREATE INDEX "Vote_userId_idx" ON "Vote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_pollId_key" ON "Vote"("userId", "pollId");

-- CreateIndex
CREATE INDEX "Baker_series_idx" ON "Baker"("series");

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
