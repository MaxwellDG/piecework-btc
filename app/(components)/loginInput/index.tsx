"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IAccount } from "../../../db/modeling/account";
import Link from "next/link";

// todo: its very clear that this has absolutely zero security at the moment
// in the future, a real wallet must be connected to, which would then trigger a login
// this means password will also be removed in favor of signing something and grabbing the nonce
// password is only here for now for learning

export default function LoginInput() {
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [company, setCompany] = React.useState("");

  function navLogin() {
    router.push("/dashboard");
  }

  async function handleLogin() {
    // Check if account already exists
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        company,
        username,
        password,
      }),
    });
    if (res.ok) {
      const data: IAccount = await res.json();
      navLogin();
    } else {
      alert("Invalid login");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Company"
        className="input input-bordered w-full max-w-xs mb-6"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full max-w-xs mb-6"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs mb-8"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-primary mb-2 w-1/2"
        onClick={handleLogin}
      >
        Login
      </button>
      <Link href="/auth/signup" className="btn btn-primary w-1/2">
        <p>Sign up</p>
      </Link>
    </div>
  );
}
