import { readFileSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
const connectionUrl = new URL(process.env.DATABASE_URL!);

// Prevent the URL's SSL setting from overriding the CA certificate below.
connectionUrl.searchParams.delete("sslmode");

const adapter = new PrismaPg({
  connectionString: connectionUrl.toString(),
  ssl: {
    ca: readFileSync(
      new URL("../certs/supabase-ca.crt", import.meta.url),
      "utf8",
    ),
    rejectUnauthorized: true,
  },
});


const prisma = new PrismaClient({ adapter });

async function main() {
  // Create the four genres, or reuse them if they already exist.
  const genreNames = [
    "Fiction",
    "Science",
    "History",
    "Technology",
  ];

  const genreIds: Record<string, number> = {};

  for (const name of genreNames) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    genreIds[name] = genre.id;
  }

  // Avoid accidentally inserting duplicate books if the seed is rerun.
  const existingBooks = await prisma.book.count();

  if (existingBooks === 0) {
    const books = [
      { title: "Things Fall Apart", author: "Chinua Achebe", genre: "Fiction" },
      { title: "The River Between", author: "Ngugi wa Thiong'o", genre: "Fiction" },
      { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", genre: "Fiction" },
      { title: "The Old Man and the Sea", author: "Ernest Hemingway", genre: "Fiction" },

      { title: "A Brief History of Time", author: "Stephen Hawking", genre: "Science" },
      { title: "The Selfish Gene", author: "Richard Dawkins", genre: "Science" },
      { title: "Cosmos", author: "Carl Sagan", genre: "Science" },
      { title: "The Origin of Species", author: "Charles Darwin", genre: "Science" },

      { title: "The Wretched of the Earth", author: "Frantz Fanon", genre: "History" },
      { title: "Long Walk to Freedom", author: "Nelson Mandela", genre: "History" },
      { title: "A People's History of the United States", author: "Howard Zinn", genre: "History" },
      { title: "The Making of Modern Africa", author: "Various Authors", genre: "History" },

      { title: "Clean Code", author: "Robert C. Martin", genre: "Technology" },
      { title: "The Pragmatic Programmer", author: "Andrew Hunt and David Thomas", genre: "Technology" },
      { title: "Introduction to Algorithms", author: "Thomas H. Cormen", genre: "Technology" },
      { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", genre: "Technology" },
    ];

    await prisma.book.createMany({
      data: books.map((book) => ({
        title: book.title,
        author: book.author,
        genreId: genreIds[book.genre],
      })),
    });
  } else {
    console.log("Books already exist. Skipping book creation.");
  }

  console.log("Seed completed successfully.");
  console.log(`Genres available: ${genreNames.length}`);
  console.log(`Books in database: ${await prisma.book.count()}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
