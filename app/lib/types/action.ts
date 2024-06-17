export type ActionState =
  | {
      status: "SUCCESS";
      message: string;
    }
  | {
      status: "ERROR_VALIDATE";
      fieldErrors: {
        [field: string]: string[];
      };
    }
  | {
      status: null;
    };
