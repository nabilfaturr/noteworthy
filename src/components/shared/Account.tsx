import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import UserAvatar from "./UserAvatar";
import { LogOutIcon } from "lucide-react";
import { signOut } from "@/lib/auth";
import React from "react";
import TriangleDown from "./Icon/TriangleDown";
import { signOutAction } from "@/lib/action";

const Account = ({ userInfo }: { userInfo: User | undefined }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-slate-100 p-4 w-fit rounded-lg focus:outline-none">
        <UserAvatar userInfo={userInfo} />
        <div className="flex items-center gap-[6px]">
          <p className="font-semibold">{`${userInfo?.name as string}`}</p>
          <TriangleDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[296px] left-9 relative">
        <DropdownMenuItem>
          <form
            action={signOutAction}
            className="w-full"
          >
            <button className="flex gap-2 items-center w-full" type="submit">
              <LogOutIcon className="w-4" />
              <p>Sign Out</p>
            </button>
          </form>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2 flex items-center gap-2">
          <UserAvatar userInfo={userInfo} />
          <div className="flex flex-col">
            <p className="font-semibold">{`${userInfo?.name as string}`}</p>
            <p className="text-slate-500 text-sm">
              {userInfo?.email as string}
            </p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Account;
