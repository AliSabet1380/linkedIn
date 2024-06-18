import { ActionState, FieldsError } from "@/actions/safeAction";
import { useCallback, useState } from "react";

interface Options<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

export const useAction = <TInput, TOutput>(
  handler: Action<TInput, TOutput>,
  options?: Options<TOutput>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldsError, setFieldsError] = useState<
    FieldsError<TInput> | undefined
  >(undefined);

  const excute = useCallback(
    async (data: TInput) => {
      setIsLoading(true);

      try {
        const result = await handler(data);

        setFieldsError(result.fieldsError);

        if (result.data) {
          options?.onSuccess?.(result.data);
        }

        if (result.error) {
          options?.onError?.(result.error);
        }
      } finally {
        setIsLoading(false);
        options?.onComplete?.();
      }
    },
    [handler, options]
  );

  return { excute, isLoading, fieldsError };
};
