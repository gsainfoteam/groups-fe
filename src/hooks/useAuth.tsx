import { getUserInfo } from "@/apis/auth";
import apiKeys, { Methods } from "@/types/api-keys";
import Path from "@/types/paths";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSWR from "swr";

const useAuth = () => {
  const { data, isLoading, error } = useSWR(
    [apiKeys.auth.info, Methods.Get],
    getUserInfo,
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      const returnPath = location.pathname;
      const returnTo = returnPath + location.search;
      if (returnPath !== Path.Onboarding && returnPath !== Path.ThirdParty) {
        navigate(Path.Onboarding, {
          state: { returnTo },
        });
      }
    }
  }, [error, location, navigate]);

  return {
    userInfo: data,
    isLoading,
  };
};

export default useAuth;
