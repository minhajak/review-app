import { type JSX } from "react";
import {
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from "../../../components";
import type { Review } from "../../../lib";
import { formatTimeAgo } from "../../../utils";
import useInitials from "../../../hooks/useInitials";

const ReviewCard = ({
  rev,
  renderStars,
}: {
  rev: Review;
  renderStars: (n: number) => JSX.Element;
}) => {
  const { initials } = useInitials({ author: rev.author });

  return (
    <Card className="border-0 shadow-sm rounded-md transition-all hover:shadow-md focus-within:shadow-md">
      <CardContent className="p-2 pt-0">
        <div className="flex items-start gap-2">
          <Avatar className="w-6 h-6 border border-gray-200">
            <AvatarImage src={""} alt={rev.author} />
            <AvatarFallback className="bg-gray-100 text-xs text-gray-600">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1 justify-between">
              <div className="font-medium text-xs text-slate-800">
                {rev.title}
              </div>
              <div className="text-xs text-slate-400 pr-1">
                {formatTimeAgo(rev.date)}
              </div>
            </div>

            <div className="flex items-center gap-1 mt-0.5">
              {renderStars(rev.rating)}
              <span className="text-xs text-slate-500 font-medium">
                {rev.rating}/5
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-3">
              {rev.body}
            </p>

            <div className="mt-1 flex items-end gap-0.5">
              <Button
                variant="link"
                className="ml-auto text-xs text-gray-500 hover:text-blue-600 px-2.5 h-5"
              >
                Report
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
