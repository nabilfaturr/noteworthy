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

const Account = ({ userInfo }: { userInfo: User | undefined }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-slate-100 p-3 w-full rounded-lg focus:outline-none">
        <UserAvatar userInfo={userInfo} />
        <div>
          <p className="font-semibold">{`${userInfo?.name as string}`}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[296px]">
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";

              await signOut({redirectTo: "/"});
              console.log("sign outt")
            }}
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
