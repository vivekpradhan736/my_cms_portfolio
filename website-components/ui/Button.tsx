import React, { ReactNode } from "react";

interface ButtonProperties {
  children: ReactNode;
  variant?: "plain" | "default";
  onClick?: Function;
}

function Button({ children, variant, onClick }: ButtonProperties) {
  switch (variant) {
    case "plain":
      return (
        <button
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
          className="text-slate-400 cursor-pointer flex items-center gap-1 px-3 py-[9.5px] rounded-md hover:text-slate-700 hover:bg-[#16a34a1c] hover:dark:text-slate-100"
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
          className="flex items-center cursor-pointer text-sm gap-1 px-4 py-3 bg-primaryColor hover:bg-primaryColorHover transition-colors delay-75 text-white rounded-md"
        >
          {children}
        </button>
      );
  }
}

export default Button;