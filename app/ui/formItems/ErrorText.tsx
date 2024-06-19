import { PropsWithChildren } from "react";

function ErrorText({ children }: PropsWithChildren<{}>) {
  return <p className="text-xs text-red-700">{children}</p>;
}

export default ErrorText;
