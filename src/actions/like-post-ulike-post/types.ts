import { z } from "zod";
import { LikePostZodSchema } from "./schema";
import { ActionState } from "../safeAction";

export type InputType = z.infer<typeof LikePostZodSchema>;
export type ReturnType = ActionState<InputType, {}>;
