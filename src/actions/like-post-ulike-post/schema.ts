import { z } from "zod";

export const LikePostZodSchema = z.object({
  postId: z.string(),
});
