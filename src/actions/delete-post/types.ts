import { z } from "zod";
import { DeletePostZodSchema } from "./schema";
import { ActionState } from "../safeAction";

export type InputType = z.infer<typeof DeletePostZodSchema>;
export type ReturnType = ActionState<InputType, {}>;
