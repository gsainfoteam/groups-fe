import { getUserInfo } from "@/apis/auth";
import apiKeys, { Methods } from "@/types/api-keys";
import Path from "@/types/paths";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const useAuth = () => {
  const { data, isLoading, error } = useSWR(
    [apiKeys.auth.info, Methods.Get],
    getUserInfo,
  );

  const navigator = useNavigate();

  useEffect(() => {
    if (error) {
      console.error(error);
      navigator(Path.Onboarding);
      // TODO: add error toast
    }
  }, [error]);

  return {
    userInfo: data,
    isLoading,
  };
};

export default useAuth;
