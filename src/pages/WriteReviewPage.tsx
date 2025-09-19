import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import { Button } from "../components";
import { ReviewForm } from "../features/review";

export default function WriteReview() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600  hover:bg-inherit"
        >
          <ArrowLeft size={18} />
          Back
        </Button>
        {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Write a Review
        </h1> */}
      </div>

      {/* Review Form */}
      <ReviewForm navigate={navigate} />
    </div>
  );
}
