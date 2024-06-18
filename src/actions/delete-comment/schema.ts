import { z } from "zod";

export const DeleteCommentZodSchema = z.object({
  postId: z.string(),
  commentId: z.string(),
});
