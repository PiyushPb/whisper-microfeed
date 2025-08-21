// components/auth/SignupFormContainer.tsx

"use client";

import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
import { GoCheckCircle, GoXCircle } from "react-icons/go";

import type { SignupFormData } from "@/schemas/signup";
import { signupUser } from "@/lib/auth/actions";
import { debounce } from "@/utils/debounce";

function SignupFormContainer() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setError(null);
    setLoading(true);

    try {
      await signupUser(formData);
      router.push("/");
    } catch (err: any) {
      if (err?.fieldErrors) {
        setFormErrors(err.fieldErrors);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkUsername = async (username: string) => {
    if (!username) {
      setIsUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);

    try {
      const res = await fetch(`/api/username?username=${username}`);
      const data = await res.json();
      setIsUsernameAvailable(!data.exists);
    } catch (err) {
      console.error("Username check failed:", err);
      setIsUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const debouncedCheckUsername = useRef(
    debounce((username: string) => {
      checkUsername(username);
    }, 500)
  ).current;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="calSans text-[32px]">Signup to whisper</h2>
      <p>Signup with your username and password</p>
      <form onSubmit={handleSignup} className="flex flex-col gap-5">
        <div>
          <Input
            type="text"
            placeholder="Name *"
            variant={"auth"}
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {formErrors.name && (
            <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
          )}
        </div>

        <div className="relative">
          <Input
            type="text"
            placeholder="Username *"
            variant={"auth"}
            required
            value={formData.username}
            onChange={(e) => {
              let username = e.target.value.toLowerCase();
              username = username.replace(/[^a-z0-9_]/g, "");
              setFormData({ ...formData, username });
              debouncedCheckUsername(username);
            }}
          />
          <div className="absolute right-[20px] top-[50%] transform -translate-y-1/2">
            {checkingUsername ? (
              <div className="w-[25px] h-[25px] animate-spin border-2 border-gray-300 border-t-transparent rounded-full" />
            ) : isUsernameAvailable === true ? (
              <GoCheckCircle size={25} className="text-green-500" />
            ) : isUsernameAvailable === false ? (
              <GoXCircle size={25} className="text-red-500" />
            ) : null}
          </div>
          {formErrors.username && (
            <p className="text-sm text-red-500 mt-1">{formErrors.username}</p>
          )}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email *"
            variant={"auth"}
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {formErrors.email && (
            <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password *"
            variant={"auth"}
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {formErrors.password && (
            <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
          )}
        </div>

        <Button type="submit" className="h-15" disabled={loading}>
          {loading ? (
            <BarLoader
              color="#ffffff"
              width={100}
              height={4}
              aria-label="Loading signup"
            />
          ) : (
            "Signup"
          )}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
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
