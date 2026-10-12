"use client";

import { useState } from "react";
import type { Review } from "../lib/review-types";
import product from "../styles/Product.module.css";
import {
  productCopy,
  productDateLocales,
  type ProductCopy,
  type ProductLocale,
} from "../i18n/product";

type Props = {
  initialReviews: Review[];
  copy: ProductCopy;
  locale: ProductLocale;
};

function localError(message: string, copy: ProductCopy) {
  const english = productCopy.en;
  if (message === english.nameError) return copy.nameError;
  if (message === english.ratingError) return copy.ratingError;
  if (message === english.shortError) return copy.shortError;
  if (message === english.readError) return copy.readError;
  return copy.saveError;
}

export default function ReviewSection({ initialReviews, copy, locale }: Props) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSending(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment, company }),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        const message =
          payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
            ? payload.error
            : copy.saveError;
        setError(localError(message, copy));
        return;
      }
      if (payload && typeof payload === "object" && "id" in payload) {
        setReviews((current) => [payload as Review, ...current]);
      }
      setName("");
      setRating(0);
      setComment("");
    } catch {
      setError(copy.saveError);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={product.reviews}>
      <h2>{copy.reviewsTitle}</h2>
      <form onSubmit={onSubmit}>
        <label className={product.field}>
          {copy.name}
          <input value={name} onChange={(event) => setName(event.target.value)} maxLength={80} required />
        </label>
        <div className={product.field}>
          <span id="rating-label">{copy.rating}</span>
          <div className={product.stars} role="radiogroup" aria-labelledby="rating-label">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={copy.starLabel.replace("{n}", String(value))}
                className={value <= rating ? product.starOn : product.star}
                onClick={() => setRating(value)}
              >
                {value <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>
        </div>
        <label className={product.field}>
          {copy.review}
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={1000}
            rows={4}
            required
          />
        </label>
        <label className={product.trap} aria-hidden="true">
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </label>
        {error ? <p className={product.error}>{error}</p> : null}
        <button className={product.button} type="submit" disabled={sending}>
          {sending ? copy.sending : copy.publish}
        </button>
      </form>

      {reviews.length === 0 ? (
        <p className={product.note}>{copy.empty}</p>
      ) : (
        <ul className={product.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <div className={product.reviewHead}>
                <strong>{review.name}</strong>
                <span aria-label={copy.starLabel.replace("{n}", String(review.rating))}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
              </div>
              <p>{review.comment}</p>
              <time dateTime={review.createdAt}>
                {new Date(review.createdAt).toLocaleDateString(productDateLocales[locale], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
