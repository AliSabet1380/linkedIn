import { z } from "zod";

export const CommentOnPostZodSchema = z.object({
  text: z.string(),
  postId: z.string(),
});
