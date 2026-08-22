"use client";

import { FormEvent, useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/apiError";

export default function LoginPage() {
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {loginMutation.isError && (
        <p>
            {getApiErrorMessage(loginMutation.error)}
        </p>
      )}

      {loginMutation.isSuccess && (
        <p>Logged in successfully.</p>
      )}
    </main>
  );
}