import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FieldValues, Path, useForm } from "react-hook-form";

import { ActionState } from "#lib/types/action";

export type OnSuccess = (
  state: Extract<ActionState, { status: "SUCCESS" }>
) => void;

interface UseFormActionProps {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  onSuccess?: OnSuccess;
}

export function useFormAction<FormValues extends FieldValues>({
  action,
  onSuccess,
}: UseFormActionProps) {
  const form = useForm<FormValues>();
  const [state, formAction] = useFormState(action, { status: null });

  const { setError, clearErrors, setFocus } = form;

  useEffect(() => {
    if (!state) return;

    if (state.status === "ERROR_VALIDATE") {
      clearErrors();

      let lastErrorField: Path<FormValues> | undefined;
      Object.entries(state.fieldErrors).forEach(([field, errorMessage]) => {
        setError(field as Path<FormValues>, {
          message: errorMessage.join(", "),
        });
        lastErrorField = field as Path<FormValues>;
      });

      if (lastErrorField) {
        setFocus(lastErrorField);
      }
    }

    if (state.status === "SUCCESS") {
      clearErrors();
      onSuccess?.(state);
    }
  }, [clearErrors, onSuccess, setError, setFocus, state]);

  return { ...form, state, formAction };
}
