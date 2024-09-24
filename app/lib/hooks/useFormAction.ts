import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { FieldValues, Path, useForm, type UseFormProps } from "react-hook-form";

import type { ActionState } from "#lib/types/action.js";

export type OnSuccess = (
  state: Extract<ActionState, { status: "SUCCESS" }>
) => void;

interface UseFormActionProps<FormValues extends FieldValues> {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  onSuccess?: OnSuccess;
  useFormProps?: UseFormProps<FormValues>;
  defaultValues?: Partial<FormValues>;
}

export function useFormAction<FormValues extends FieldValues>({
  action,
  onSuccess,
  useFormProps,
  defaultValues,
}: UseFormActionProps<FormValues>) {
  const form = useForm<FormValues>(useFormProps);
  const [state, formAction] = useFormState(action, { status: null });

  const defaultValuesRef = useRef(defaultValues);

  const { setError, clearErrors, setFocus, reset } = form;

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
      console.log(defaultValuesRef.current, !!defaultValuesRef.current);
      if (defaultValuesRef.current) {
        reset((values) => ({
          ...values,
          ...defaultValuesRef.current,
        }));
      } else {
        reset();
      }
      onSuccess?.(state);
    }
  }, [clearErrors, onSuccess, setError, setFocus, state, reset]);

  useEffect(() => {
    defaultValuesRef.current = defaultValues;
  }, [defaultValues]);

  return { ...form, state, formAction };
}
