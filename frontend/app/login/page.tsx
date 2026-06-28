"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import { login } from "@/services/auth";
import { saveToken } from "@/utils/storage";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      saveToken(response.access_token);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);

      if (error.response) {
        alert(error.response.data.detail || "Login failed");
      } else {
        alert("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Sign in to your account
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full"
          >
            {loading ? "Signing In..." : "Login"}
          </Button>

        </form>

      </div>
    </main>
  );
}