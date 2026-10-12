import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import type { Review } from "./review-types";

export type { Review };

const filePath = path.join(process.cwd(), "data", "product-reviews.json");

type ReviewRow = {
  id: string;
  name: string;
  rating: number | string;
  comment: string;
  created_at: string | Date;
};

function database() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

type Sql = NonNullable<ReturnType<typeof database>>;

let tableReady: Promise<void> | null = null;

function ensureTable(sql: Sql) {
  if (!tableReady) {
    tableReady = sql`CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    )`.then(() => undefined);
  }
  return tableReady;
}

export async function listReviews(): Promise<Review[]> {
  const sql = database();
  if (!sql) return listFileReviews();
  await ensureTable(sql);
  const rows = await sql`SELECT id, name, rating, comment, created_at
    FROM reviews
    ORDER BY created_at DESC`;
  return (rows as ReviewRow[]).map(toReview);
}

export async function addReview(input: {
  name: string;
  rating: number;
  comment: string;
}): Promise<Review | { error: string }> {
  const name = clean(input.name, 80);
  const comment = clean(input.comment, 1000);
  const rating = Number(input.rating);
  if (!name) return { error: "Enter your name." };
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "Choose a rating from 1 to 5." };
  }
  if (comment.length < 2) return { error: "Write a short review." };

  const review: Review = {
    id: crypto.randomUUID(),
    name,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };

  const sql = database();
  if (!sql) {
    saveFileReview(review);
    return review;
  }

  await ensureTable(sql);
  await sql`INSERT INTO reviews (id, name, rating, comment, created_at)
    VALUES (${review.id}, ${review.name}, ${review.rating}, ${review.comment}, ${review.createdAt})`;
  return review;
}

function toReview(row: ReviewRow): Review {
  const created = row.created_at instanceof Date ? row.created_at : new Date(row.created_at);
  return {
    id: String(row.id),
    name: String(row.name),
    rating: Number(row.rating),
    comment: String(row.comment),
    createdAt: created.toISOString(),
  };
}

function listFileReviews(): Review[] {
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isReview).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

function saveFileReview(review: Review) {
  const reviews = [review, ...listFileReviews()];
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

function isReview(value: unknown): value is Review {
  if (!value || typeof value !== "object") return false;
  const review = value as Partial<Review>;
  return (
    typeof review.id === "string" &&
    typeof review.name === "string" &&
    typeof review.comment === "string" &&
    typeof review.createdAt === "string" &&
    typeof review.rating === "number"
  );
}
