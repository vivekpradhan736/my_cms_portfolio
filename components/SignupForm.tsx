"use client"; // ✅ Ensures this is a Client Component

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/auth/signup", { name, email, password });
      console.log("Signup successful!");
      router.push("/admin"); // ✅ Redirect to admin panel after signup
    } catch (err: any) {
      setError(err.response?.data?.msg || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      onSubmit={signUp} // ✅ Use `onSubmit` instead of `action`
    >
      <label className="text-md" htmlFor="name">
        Name
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="name"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      <div>
        <h1 className="text-sm text-[#5f5f5f]">
          Have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")} // ✅ Use `router.push` instead of `redirect`
            className="text-foreground hover:text-blue-800 underline"
          >
            Sign In Now
          </button>
        </h1>
      </div>
      {error && <p className="mt-4 p-3 text-sm bg-red-500 text-white text-center rounded-md">{error}</p>}
      {searchParams?.get("message") && (
        <p className="mt-4 p-3 text-sm bg-foreground/10 text-foreground text-center rounded-md">
          {searchParams.get("message")}
        </p>
      )}
    </form>
  );
}
