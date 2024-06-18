import { z } from "zod";
import { DeleteCommentZodSchema } from "./schema";
import { ActionState } from "../safeAction";

export type InputType = z.infer<typeof DeleteCommentZodSchema>;
export type ReturnType = ActionState<InputType, {}>;
