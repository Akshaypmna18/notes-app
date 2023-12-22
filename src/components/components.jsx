import React from "react";
import Theme from "./theme";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const Dialogs = ({ open, children, title, Forms }) => {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Forms />
      </DialogContent>
    </Dialog>
  );
};

export const Header = () => (
  <div className="flex justify-between items-center text-primaryColor">
    <h2 className="text-[calc(1.5rem+1vw)] font-bold font-dancingScript">
      Aks Notes
    </h2>
    <Theme />
  </div>
);
