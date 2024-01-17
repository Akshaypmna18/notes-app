import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNotes } from "@/store";

function DialogModal({ children, title, Forms }) {
  const { isDialogModalOpen } = useNotes((state) => state);
  return (
    <Dialog open={isDialogModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Forms />
      </DialogContent>
    </Dialog>
  );
}

export default DialogModal;
