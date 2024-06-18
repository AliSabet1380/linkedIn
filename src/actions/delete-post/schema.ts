import { z } from "zod";

export const DeletePostZodSchema = z.object({
  postId: z.string(),
});
