export type ActionState =
  | {
      status: "SUCCESS";
      message: string;
      resultId?: number | string;
      resultImages?: string[];
    }
  | {
      status: "ERROR_VALIDATE";
      fieldErrors: {
        [key: string]: string[];
      };
    }
  | { status: "ERROR_AUTH"; message: string }
  | {
      status: "ERROR_DATABASE";
      message: string;
    }
  | {
      status: "ERROR_INTERNAL";
      message: string;
    }
  | {
      status: null;
    };
