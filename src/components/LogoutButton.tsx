"use client";

import { logoutUser } from "@/service/Auth/logoutUser";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button className="w-full cursor-pointer" variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
