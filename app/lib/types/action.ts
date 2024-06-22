import { FormValues } from "#lib/actions/createPostAction";

export type ActionState =
  | {
      status: "SUCCESS";
      message: string;
      resultId?: string;
    }
  | {
      status: "ERROR_VALIDATE";
      fieldErrors: {
        [field in keyof FormValues]?: string[];
      };
    }
  | {
      status: "ERROR_DATABASE";
      message: string;
    }
  | {
      status: "ERROR_INTERNAL";
      error: any;
    }
  | {
      status: null;
    };
