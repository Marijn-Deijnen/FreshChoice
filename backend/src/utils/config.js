import "dotenv/config";

if (!process.env.PORT || !process.env.DATABASE_URL) {
  console.error(
    "Missing required environment variables: PORT and/or DATABASE_URL",
  );
  process.exit(1);
}

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
