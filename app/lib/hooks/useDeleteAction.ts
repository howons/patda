"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import type { ActionState } from "#lib/types/action.js";

export default function useDeleteAction(
  deleteAction: (
    prevState: ActionState,
    formData: FormData
  ) => Promise<ActionState>,
  href?: string
) {
  const router = useRouter();

  const [deleteState, deleteFormAction] = useFormState(deleteAction, {
    status: null,
  });

  useEffect(() => {
    if (!deleteState) return;

    if (deleteState.status === "SUCCESS") {
      if (href) {
        router.push(href);
        return;
      }

      router.refresh();
    }
  }, [deleteState, router, href]);

  return [deleteState, deleteFormAction] as const;
}
