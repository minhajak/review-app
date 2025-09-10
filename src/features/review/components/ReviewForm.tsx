import React, { Suspense, lazy } from "react";
import type { NavigateFunction } from "react-router-dom";

const Submitted = lazy(() => import("./Submitted"));
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Loading,
  Textarea,
  Label
} from "../../../components";


import { Send } from "lucide-react";
import useReviewForm from "../hooks/useReviewForm";

const ReviewForm = ({ navigate }: { navigate: NavigateFunction }) => {
  const {
    body,
    onChangeBody,
    handleSubmit,
    isFill,
    isSubmitting,
    submitted,
    onChangeTitle,
    title,
    handleCancel,
    author,
    onChangeAuthor,
    isPending
  } = useReviewForm({ navigate });

  if (submitted) {
    return (
      <Suspense fallback={<Loading />}>
        <Submitted navigate={navigate} />
      </Suspense>
    );
  }
  if(isPending){
    return <Loading />;
  }

  return (
    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="text-slate-800">Your Review</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author Name Input */}
           <div>
            <Label
              htmlFor="author"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Author's Name
            </Label>
            <Input
              type="text"
              id="author"
              value={author}
              onChange={onChangeAuthor}
              placeholder="Enter your name..."
              className="w-full px-4 py-2 ring-0 rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          {/* Title Input */}
          <div>
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Review Title
            </Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={onChangeTitle}
              placeholder="Summarize your opinion of this book"
              className="w-full px-4 py-2 rounded-lg ring-0 border-blue-200 focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Review Body */}
          <div>
            <Label
              htmlFor="body"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Your Review
            </Label>
            <Textarea
              id="body"
              rows={2}
              maxLength={500}
              cols={2}
              value={body}
              onChange={onChangeBody}
              placeholder="Share your thoughts on this book..."
              className="w-full max-h-[150px] px-4 py-2  rounded-lg  resize-none border-blue-200 focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="mr-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isFill}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 min-w-[140px]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Send size={16} className="mr-2" />
                  Submit
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default React.memo(ReviewForm);
