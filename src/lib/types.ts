export type RatingBreakdown = {
  stars: number;
  count: number;
};

export type Review = {
  id: number;
  author: string;
  title: string;
  body: string;
  rating: number;
  likes: number;
  dislikes: number;
  date: Date;
};

export type MockData = {
  average: number;
  totalRatings: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
  reviews: Review[];
};

export type CreateReviewType = {
  author: string;
  title: string;
  body: string;
};
