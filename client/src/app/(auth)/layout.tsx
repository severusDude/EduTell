import React from "react";
import { Toaster } from "react-hot-toast";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Toaster position="bottom-right" />
      {children}
    </div>
  );
};

export default LoginLayout;
