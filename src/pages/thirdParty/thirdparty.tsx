import React, { useEffect, useState } from "react";
import { ArrowRight, User, Lock } from "iconoir-react";
import { thirdPartyAuthorize } from "@/apis/group";
import { useLocation, useNavigate } from "react-router-dom";
import { generateLoginURLHandler } from "@/apis/auth";
import useAuth from "@/hooks/useAuth";

export default function ThirdParty() {
  const location = useLocation();
  const { userInfo, isLoading: LoadingUserInfo } = useAuth();
  useEffect(() => {
    if (LoadingUserInfo) return;
    else if (userInfo == undefined) {
      generateLoginURLHandler(location.pathname);
    }
  }, [userInfo, LoadingUserInfo]);
  const queryParams = new URLSearchParams(location.search);
  const queryClientId = queryParams.get("client_id");
  const queryRedirectURI = queryParams.get("redirect_uri");

  const [clientId, setclientId] = useState<string>(queryClientId || "");
  const [redirectURI, setredirectURI] = useState<string>(
    queryRedirectURI || "",
  );

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authorize = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      await thirdPartyAuthorize(clientId, redirectURI);
      setIsSuccess(true);
      setMessage("Login successful! Redirecting...");
    } catch (err) {
      setIsSuccess(false);
      setMessage("Invalid clientId or redirectURI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authorize();
  };

  useEffect(() => {
    if (queryClientId && queryRedirectURI) authorize();
  }, [queryClientId, queryRedirectURI]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-sm w-full transition-all duration-300 hover:shadow-primary">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold mb-2">Login</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="sr-only">ClientID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              <input
                id="clientId"
                name="clientId"
                type="text"
                required
                className="bg-white block w-full pl-10 pr-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="ClientID"
                value={clientId}
                onChange={(e) => setclientId(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="sr-only">RedirectURI</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              <input
                id="redirectURI"
                name="redirectURI"
                type="url"
                autoComplete="url"
                required
                className="bg-white block w-full pl-10 pr-3 py-2 border-none rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="RedirectURI"
                value={redirectURI}
                onChange={(e) => setredirectURI(e.target.value)}
              />
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-center transition-all duration-300 ${
                isSuccess ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {message}
            </div>
          )}
          {message && queryClientId && queryRedirectURI && (
            <div className="flex justify-center">
              <a href={queryRedirectURI}>Back to your service</a>
            </div>
          )}

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
