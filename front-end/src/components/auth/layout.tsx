import React, { useState } from "react";
import { LogIn } from "./login";
import { SignUp } from "./signup";

export interface authPropTypes {
  setHaveAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthLayout = React.memo(() => {
  const [haveAccount, setHaveAccount] = useState(true);
  return (
    <div>
      {haveAccount ? (
        <LogIn setHaveAccount={setHaveAccount} />
      ) : (
        <SignUp setHaveAccount={setHaveAccount} />
      )}
    </div>
  );
});
