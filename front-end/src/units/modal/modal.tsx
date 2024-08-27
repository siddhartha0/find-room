import React from "react";
import { createPortal } from "react-dom";

interface modalProps {
  children: React.ReactNode;
  classname?: string;
}

export const Modal = React.memo(
  React.forwardRef<HTMLDivElement, modalProps>(
    ({ children, classname }, ref) => {
      return createPortal(
        <main
          ref={ref}
          className={`${classname} absolute top-[50%] left-[50%]  border border-other-white-100 border-opacity-[.2] outline-none rounded-lg   `}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          {children}
        </main>,
        document.body
      );
    }
  )
);
