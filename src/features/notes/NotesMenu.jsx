import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import DeleteSinlgeNote from "./deleteNotes/singleNote";
import CopyNote from "./CopyNote";

function NotesMenu() {
  return (
    <span onClick={(e) => e.preventDefault()}>
      <Menubar className="border-0 w-2 relative ">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer absolute left-[-1rem]">
            <DotsVerticalIcon />
          </MenubarTrigger>
          <MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
            <MenubarItem>
              <CopyNote />
            </MenubarItem>
            <MenubarItem onClick={(e) => e.preventDefault()}>
              <DeleteSinlgeNote />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </span>
  );
}

export default NotesMenu;
