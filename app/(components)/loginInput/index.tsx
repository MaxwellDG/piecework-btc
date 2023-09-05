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

  const [input, setInput] = React.useState("");
  const [password, setPassword] = React.useState("");

  function navLogin(account: IAccount) {
    router.push("/" + account.address);
  }

  async function handleLogin() {
    // Check if account already exists
    const res = await fetch(`/api/user/${input}`);
    if (res.ok) {
      const data: IAccount = await res.json();
      navLogin(data);
    } else {
      // If it doesn't exist, create one
      const newAccountRes = await fetch(`/api/user`, {
        method: "POST",
        body: JSON.stringify({ address: input }),
      });
      if (newAccountRes.ok) {
        const data: IAccount = await newAccountRes.json();
        navLogin(data);
      } else {
        // todo handle error
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        className="input input-bordered w-full max-w-xs mb-6"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        className="input input-bordered w-full max-w-xs mb-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" className="btn btn-primary mb-2" onClick={handleLogin}>
        Login
      </button>
      <Link href="/auth/signup" className="btn btn-primary">
        <p>Sign up</p>
      </Link>
    </div>
  );
}
