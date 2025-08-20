import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

function LoginFormContainer() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="calSans text-[32px]">Login to whisper</h2>
      <p>Login with your username and password</p>
      <form className="flex flex-col gap-5">
        <Input type="text" placeholder="@username" variant={"auth"} />
        <Input type="password" placeholder="password" variant={"auth"} />
        <Button className="h-15">Login</Button>
      </form>
      <p>
        Don&apos;t have an account?{" "}
        <Link href={"/auth/signup"} className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginFormContainer;
