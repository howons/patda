"use server";

import { auth } from "#auth";
import { MAX_IMAGE_COUNT } from "#lib/constants/image.js";
import { ERROR } from "#lib/constants/messages.js";
import type { ActionState } from "#lib/types/action.js";
import { createClient } from "#utils/supabase/server.js";

export async function uploadImageAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      status: "ERROR_AUTH",
      message: ERROR.IMAGE.NO_AUTH,
    };
  }

  const inputImages: File[] = new Array(MAX_IMAGE_COUNT);
  for (let i = 0; i < MAX_IMAGE_COUNT; i++) {
    const image = formData.get(`image[${i}]`);
    if (!image || !(image instanceof File) || !image.type.startsWith("image/"))
      break;

    inputImages[i] = image;
  }

  if (inputImages.length <= 0) {
    return {
      status: "ERROR_VALIDATE",
      fieldErrors: {
        images: [ERROR.IMAGE.NO_IMAGES],
      },
    };
  }

  const supabase = createClient();
  const resultImages: ({ id: string; path: string } | null)[] = Array.from(
    { length: inputImages.length },
    () => null
  );
  inputImages.forEach(async (image, idx) => {
    const { data, error } = await supabase.storage
      .from("patda-images")
      .upload(`temp/${image.name}`, image);
    if (data) {
      resultImages[idx] = { id: data.id, path: data.id };
    }
    if (error) {
      resultImages[idx] = null;
    }
  });

  const successCount = resultImages.reduce(
    (acc, cur) => (cur !== null ? acc + 1 : acc),
    0
  );
  return {
    status: "SUCCESS",
    message: `${successCount}개 이미지 업로드 완료, ${resultImages.length - successCount}개 실패`,
    resultImages,
  };
}
