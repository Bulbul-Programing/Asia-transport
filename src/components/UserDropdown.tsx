"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, Settings, User } from "lucide-react";
import Link from "next/link";
import { TUser } from "@/types/User/TUserInfo";
import LogoutButton from "./LogoutButton";

interface UserDropdownProps {
  userInfo: TUser;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <span className="text-sm font-semibold">
            {userInfo.name.charAt(0).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground">{userInfo.email}</p>
            <p className="text-xs text-primary capitalize">
              {userInfo.role.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${userInfo.role.toLocaleLowerCase()}/dashboard`} className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/my-profile"} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/change-password"} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
