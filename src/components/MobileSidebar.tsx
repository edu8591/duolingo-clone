import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui";
import { Sidebar } from "./Sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 z-[100]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
