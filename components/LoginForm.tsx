"use client"; // Ensures this is a Client Component

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ Import useRouter
import axios from "axios";

export default function LoginForm() {
  const router = useRouter(); // Use Next.js Client Router
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      console.log("data", data);

      // Save user details in localStorage if the data is valid
      if (typeof window !== "undefined") {
        localStorage.setItem("userDetails", JSON.stringify(data.user));
      }

      // Use Next.js Client Navigation Instead of `redirect`
      router.push("/admin");
    } catch (err: any) {
      setError(err?.response?.data?.msg || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      onSubmit={signIn} // Use `onSubmit`
    >
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
      <button
        type="submit"
        className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <div>
        <h1 className="text-sm text-[#5f5f5f]">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")} // Use `router.push()`
            className="text-foreground hover:text-blue-800 underline"
          >
            Sign Up Now
          </button>
        </h1>
      </div>

      {error && (
        <p className="mt-4 p-3 text-sm bg-red-500 text-white text-center rounded-md">
          {error}
        </p>
      )}

      {message && (
        <p className="mt-4 p-3 text-sm bg-foreground/10 text-foreground text-center rounded-md">
          {message}
        </p>
      )}
    </form>
  );
}
