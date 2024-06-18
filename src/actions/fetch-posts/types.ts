import { z } from "zod";
import { FetchZodSchema } from "./schema";
import { ActionState } from "../safeAction";
import { IPost } from "@/DB/postModel";

export type InputType = z.infer<typeof FetchZodSchema>;
export type ReturnType = ActionState<InputType, IPost[]>;
