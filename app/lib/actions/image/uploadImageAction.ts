"use server";

import { auth } from "#auth";
import { MAX_IMAGE_COUNT } from "#lib/constants/image.js";
import { ERROR } from "#lib/constants/messages.js";
import type { ActionState } from "#lib/types/action.js";
import { getTempFolderPath } from "#lib/utils/supabase/images.js";
import { createClient } from "#lib/utils/supabase/server.js";

export async function uploadImageAction(
  imageCount: number,
  formData: FormData,
  postId?: number
): Promise<ActionState> {
  const session = await auth();
  const isUpdate = postId !== undefined;

  if (!session) {
    return {
      status: "ERROR_AUTH",
      message: ERROR.IMAGE.NO_AUTH,
    };
  }

  const inputImages: File[] = [];
  for (let i = 0; i < MAX_IMAGE_COUNT - imageCount; i++) {
    const image = formData.get(`image[${i}]`);
    if (!image || !(image instanceof File) || !image.type.startsWith("image/"))
      break;

    inputImages.push(image);
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
  const resultImages: string[] = [];

  let successCount = 0;

  for (const image of inputImages) {
    const imageName = encodeURIComponent(image.name).replace(
      /[^a-zA-Z0-9/./-/_]/g,
      ""
    );
    const path = isUpdate
      ? `post/${postId}/${imageName}`
      : `${getTempFolderPath(session)}/${imageName}`;
    const { data, error } = await supabase.storage
      .from("patda-images")
      .upload(path, image);

    if (data) {
      resultImages.push(data.path);
      successCount += 1;
    } else if (error) {
      const statusCode =
        (error as unknown as { statusCode: string }).statusCode ?? "500";

      if (statusCode === "409") {
        resultImages.push(path);
      } else {
        resultImages.push(statusCode);
      }
    }
  }

  return {
    status: "SUCCESS",
    message: `${successCount}개 이미지 업로드 완료, ${resultImages.length - successCount}개 실패`,
    resultImages,
  };
}
