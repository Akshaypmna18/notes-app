import { CopyToClipboard as Copy } from "react-copy-to-clipboard";
import { CopyIcon } from "@radix-ui/react-icons";
import { MenubarItem } from "@/components/ui/menubar";
import { useNotes } from "@/store";
import { useToast } from "@/components/ui/use-toast";

function CopyNote() {
  const { note, title } = useNotes((state) => state);
  const { toast } = useToast();
  const handleCopy = () => {
    toast({
      title: "Note copied to clipboard successsfully",
      duration: 2500,
    });
  };
  return (
    <MenubarItem>
      <Copy text={`${title}\n${note}`} onCopy={handleCopy}>
        <p className="gap-2 flex">
          <CopyIcon className="min-h-[calc(1rem+0.1vw)] min-w-[calc(1rem+0.1vw)] ml-[-0.4rem]" />
          <span>Copy note to clipboard</span>
        </p>
      </Copy>
    </MenubarItem>
  );
}

export default CopyNote;
