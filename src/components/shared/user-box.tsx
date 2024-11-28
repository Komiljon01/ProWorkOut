// Store
import { useUserState } from "@/stores/user.store";

// Firebase
import { auth } from "@/firebase";

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// rrd imports
import { useNavigate } from "react-router-dom";

// Icons
import { LogOut, LucideLoader2 } from "lucide-react";
import { CgGym } from "react-icons/cg";

function UserBox() {
  const { user, setUser } = useUserState();
  const navigate = useNavigate();

  if (!user) return <LucideLoader2 className="h-6 w-6 animate-spin" />;

  const onLogOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.photoURL!} />
          <AvatarFallback className="uppercase">
            {user.email![0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user.email}
          </p>

          <div className="flex items-center gap-x-2">
            <div className="rounded-md p-1">
              <Avatar>
                <AvatarImage src={user.photoURL!} />
                <AvatarFallback className="uppercase">
                  {user.email![0]}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-1">
              <p className="line-clamp-1 text-sm">
                {user.displayName ?? user.email}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
            <CgGym className="h-4 w-4" />
            <span>Gym</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 bg-destructive"
            onClick={onLogOut}
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserBox;
