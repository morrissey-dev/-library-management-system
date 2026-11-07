# Library Management System

## Project Overview

The Library Management System is a backend application built with NestJS, Prisma ORM and PostgreSQL. It provides the foundation for managing library users, books and book genres.

## Technology Stack

- **Backend:** NestJS
- **Programming Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL (hosted on Supabase)
- **Database Adapter:** Prisma PostgreSQL adapter (`@prisma/adapter-pg`)

## Database Schema

The database consists of four main components:

1. **Role:** An enum defining the available user roles: `PATRON` and `LIBRARIAN`.
2. **User:** Stores user information, including name, unique email address, role and creation date.
3. **Genre:** Stores book genre names. Each genre has a unique name and can be associated with multiple books.
4. **Book:** Stores book titles, authors, genre references and creation dates.

## Schema Decisions

The database uses a relational data model in which the `Book` model references the `Genre` model through a foreign key (`genreId`).

This design was chosen because one genre can contain many books, while each book belongs to one genre.

Using a separate `Genre` table avoids repeating genre information in every book record. For example, instead of storing the word "Technology" separately in every technology book, the system stores the genre once and allows multiple books to reference it.

The relationship provides several benefits:

- **Reduced data duplication:** Genre names are stored once rather than repeated across book records.
- **Data consistency:** Updating a genre name in one place avoids inconsistencies between books.
- **Referential integrity:** The foreign key ensures that a book references an existing genre.
- **Maintainability:** New genres can be added without changing the structure of the Book model.

The relationship is implemented using Prisma's `@relation` attribute, with `genreId` referencing the `id` field in the `Genre` model.

## Project Structure

```text
library-management-system/
├── README.md
└── api/
    ├── prisma/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src/
    │   ├── generated/
    │   └── prisma/
    │       ├── prisma.module.ts
    │       └── prisma.service.ts
    ├── certs/
    ├── .env.example
    ├── package.json
    └── prisma7.config.ts
```

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   ```

2. Navigate into the API directory:

   ```bash
   cd api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create your local environment file using the example:

   ```bash
   cp .env.example .env
   ```

5. Add your PostgreSQL connection string to `.env`. Never commit your actual database credentials.

6. Generate Prisma Client:

   ```bash
   npm run db:generate
   ```

## Database Migration and Seeding

Apply the existing migrations:

```bash
npx prisma migrate deploy
```

Populate the database with sample records:

```bash
npx prisma db seed
```

The seed script creates four genres and sixteen books distributed across those genres.

## Running the Application

Start the development server:

```bash
npm run start:dev
```

The application runs at:

`http://localhost:3000`

## Building the Application

```bash
npm run build
```

The build command generates Prisma Client before compiling the NestJS application.

## Environment Variables

The application requires the following environment variable:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL database connection string |

Use `.env.example` as a template. Actual credentials must remain private and must not be committed to Git.

## Testing

Run the test suite:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```
