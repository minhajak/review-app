import type { CreateReviewType } from "../types";
import client from "./axios";

export const getReviews = async () => client.get("/reviews");

export const createReview = async (review: CreateReviewType) =>
  client.post("/review", review);

