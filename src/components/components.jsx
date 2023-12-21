import React from "react";
import Theme from "./theme";

export const Header = () => (
  <div className="flex justify-between items-center text-primaryColor">
    <h2 className="text-[calc(1.5rem+1vw)] font-bold font-dancingScript">
      Aks Notes
    </h2>
    <Theme />
  </div>
);
