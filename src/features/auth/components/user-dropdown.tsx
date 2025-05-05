import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfile } from "./user-profile";
import { useLogout } from "../hooks/use-logout";
import { useConfirm } from "@/hooks/use-confirm";
import { LogOut, Plus } from "lucide-react";
import { AddItemDialog } from "@/features/items/components/add-item-dialog";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";

export const UserDropdown = () => {
  const [logoutConfirm, LogoutDialog] = useConfirm();
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
  const { data: auth } = useAuth();

  const { mutate: logout } = useLogout();
  const handleLogout = async () => {
    const ok = await logoutConfirm();
    if (!ok) return;
    logout();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserProfile />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAddItemDialog(true)}>
            <Plus />
            Add a new item
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {auth?.id && (
        <AddItemDialog
          open={openAddItemDialog}
          setOpen={setOpenAddItemDialog}
        />
      )}
      <LogoutDialog
        title={"Log out"}
        description={"Are you sure you'd like to log out?"}
        destructive={true}
      />
    </>
  );
};
