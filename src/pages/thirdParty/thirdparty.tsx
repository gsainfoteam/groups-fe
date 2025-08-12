import React, { useState } from "react";
import { ArrowRight, User, Lock } from "iconoir-react";
export default function ThirdParty() {
  // State for username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State for handling messages (e.g., success or error)
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Simulate a network request with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple validation
    if (username === "user" && password === "password") {
      setIsSuccess(true);
      setMessage("Login successful! Redirecting...");
    } else {
      setIsSuccess(false);
      setMessage("Invalid username or password.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-sm w-full transition-all duration-300 hover:shadow-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold mb-2">Login</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Username Input Field */}
          <div>
            <label className="sr-only">ClientID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="bg-grey block w-full pl-10 pr-3 py-2 border-none rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="ClientID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <label className="sr-only">RedirectURI</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-grey block w-full pl-10 pr-3 py-2 border-none rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="RedirectURI"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Conditional Message Display */}
          {message && (
            <div
              className={`p-3 rounded-md text-center transition-all duration-300 ${
                isSuccess ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                isLoading ? "bg-primary-100" : "bg-primary"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRight
                  className="h-5 w-5 group-hover:text-white transition-all duration-300"
                  aria-hidden="true"
                />
              </span>
              <div className="group-hover:text-white duration-300">
                {isLoading ? "Signing In..." : "Sign in"}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
