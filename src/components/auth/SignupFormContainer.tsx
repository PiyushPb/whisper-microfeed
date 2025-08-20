import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

function SignupFormContainer() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="calSans text-[32px]">Signup to whisper</h2>
      <p>Signup with your username and password</p>
      <form className="flex flex-col gap-5">
        <Input type="text" placeholder="@username" variant={"auth"} />
        <Input type="password" placeholder="password" variant={"auth"} />
        <Button className="h-15">Login</Button>
      </form>
      <p>
        Already have an account?{" "}
        <Link href={"/auth/login"} className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupFormContainer;
