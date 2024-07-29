"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import type { ActionState } from "#lib/types/action.js";

export default function useDeleteAction(
  deleteAction: (
    prevState: ActionState,
    formData: FormData
  ) => Promise<ActionState>
) {
  const router = useRouter();

  const [deleteState, deleteFormAction] = useFormState(deleteAction, {
    status: null,
  });

  useEffect(() => {
    if (!deleteState) return;

    if (deleteState.status === "SUCCESS") {
      router.refresh();
    }
  }, [deleteState, router]);

  return [deleteState, deleteFormAction] as const;
}
