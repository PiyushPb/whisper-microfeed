"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { logoutUser } from "@/lib/auth/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    console.log("Logout button clicked");
    try {
      await logoutUser();
      toast.success("Logout successful!");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant={"destructive"}
        onClick={handleLogout}
        disabled={loading}
        className="flex items-center gap-2"
      >
        {loading ? <BarLoader color="#fff" /> : "Logout"}
      </Button>
    </div>
  );
}

export default LogoutButton;
