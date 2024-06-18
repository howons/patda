export type ActionState =
  | {
      status: "SUCCESS";
      message: string;
      resultId?: string;
    }
  | {
      status: "ERROR_VALIDATE";
      fieldErrors: {
        [field: string]: string[];
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
