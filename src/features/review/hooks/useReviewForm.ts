import { useCallback, useMemo, useRef, useState, useTransition } from "react";
import type { NavigateFunction } from "react-router-dom";
import { createReview } from "../../../lib/axios/reviewInstance";



export default function useReviewForm({ navigate }: { navigate: NavigateFunction }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isMounted = useRef(true);
  const [isPending, startTransition] = useTransition();

  // keep mounted flag to avoid state updates after unmount
  // (call from parent or use effect in hook consumer; simpler to set here:)
  // NOTE: the hook consumer must not unmount before the hook runs cleanup — it's safe.
  useRef(() => {
    return () => {
      isMounted.current = false;
    };
  });

  // Derived boolean — no extra state
  const isFill = useMemo(() => {
    return Boolean(title.trim() && body.trim()&& author.trim());
  }, [title, body,author]);

  // Stable callbacks
  const onChangeAuthor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  }, []);
  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const onChangeBody = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  }, []);

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

   const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFill || isSubmitting) return;

      setIsSubmitting(true);
      try {
        const result = await createReview({ author, title, body });
        console.log("Review created:", result);

        if (!isMounted.current) return;
        startTransition(() => {
          setSubmitted(true);
          setTimeout(() => {
            if (isMounted.current) navigate(-1);
          }, 1500);
        });
      } catch (error) {
        console.error("Failed to submit review:", error);
        // optional: show error UI
      } finally {
        if (isMounted.current) setIsSubmitting(false);
      }
    },
    [author, title, body, isFill, isSubmitting, navigate]
  );

  return {
    title,
    body,
    onChangeTitle,
    onChangeBody,
    handleSubmit,
    handleCancel,
    isFill,
    isSubmitting,
    submitted,
    setTitle,
    setBody,
    author,
    onChangeAuthor,
    setAuthor,
    isPending
  };
}
