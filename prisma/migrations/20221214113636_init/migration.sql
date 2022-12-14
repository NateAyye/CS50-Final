-- CreateTable
CREATE TABLE "Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "shiftStart" TIME NOT NULL,
    "shiftEnd" TIME NOT NULL,
    "allDay" BOOLEAN NOT NULL
);
