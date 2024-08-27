import React, { createContext, useState } from "react";

interface contextPropTypes {
  setauthModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  authModalStatus: boolean;
}

export const landingPageContext = createContext<contextPropTypes | null>(null);

interface landingpageContextPropTypes {
  children: React.ReactNode;
}

export const LandingPageContent = React.memo(
  ({ children }: landingpageContextPropTypes) => {
    const [authModalStatus, setauthModalStatus] = useState(false);

    return (
      <landingPageContext.Provider
        value={{ authModalStatus, setauthModalStatus }}
      >
        {children}
      </landingPageContext.Provider>
    );
  }
);
