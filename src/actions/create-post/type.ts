import { z } from "zod";

import { ActionState } from "../safeAction";
import { CreatePostZodSchema } from "./schema";
import { IPost } from "@/DB/postModel";

export type InputType = z.infer<typeof CreatePostZodSchema>;
export type ReturnType = ActionState<InputType, IPost>;
