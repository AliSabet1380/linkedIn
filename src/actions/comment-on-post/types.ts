import { z } from "zod";
import { CommentOnPostZodSchema } from "./schema";
import { ActionState } from "../safeAction";

export type InputType = z.infer<typeof CommentOnPostZodSchema>;
export type ReturnType = ActionState<InputType, {}>;
