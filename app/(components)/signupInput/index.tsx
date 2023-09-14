"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IAccount } from "../../../db/modeling/account";
import dynamic from "next/dynamic";

const ErrorText = dynamic(() => import("../ui/text/error"), {
  ssr: false,
});

export default function SignupInput() {
  const router = useRouter();

  const [organization, setOrganization] = React.useState("");
  const [error, setError] = React.useState("");

  function navLogin(company: string) {
    router.push("/dashboard");
  }

  async function handleCreate() {
    const res = await fetch("/api/company", {
      method: "POST",
      body: JSON.stringify({ name: organization }),
    });
    console.log("we get a res? ", res);
    if (res.ok) {
      setError("");
      navLogin(organization);
    } else {
      setError(res.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        className="input input-bordered w-full max-w-xs mb-6"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      />
      {error && <ErrorText text={error} />}
      <button type="button" className="btn btn-primary" onClick={handleCreate}>
        Create company account
      </button>
    </div>
  );
}
