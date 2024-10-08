import { useEffect, useState } from "react";

import useDebouncedState from "@/hooks/useDebouncedState";

const useGroupProfileSequence = () => {
  const [debouncedName, setName] = useDebouncedState<string>("");
  const [isNameExists, setIsNameExists] = useState<boolean | null>(null);
  const [isNextButtonValid, setIsNextButtonValid] = useState<boolean>(false);

  const [profileImage, setProfileImage] = useState<File>();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const getIfNameAlreadyExists = async (groupName: string) => {
    // const result = await getGroupByName(groupName);
    // return !!result;

    return false; // TODO: API is not ready
  };

  useEffect(() => {
    const handleGroupName = async () => {
      if (debouncedName.length > 0) {
        const resultOfGetIfNameAlreadyExists =
          await getIfNameAlreadyExists(debouncedName);
        setIsNameExists(resultOfGetIfNameAlreadyExists);
        setIsNextButtonValid(!resultOfGetIfNameAlreadyExists);
      } else {
        setIsNameExists(null);
        setIsNextButtonValid(false);
      }
    };

    handleGroupName();
  }, [debouncedName]);

  useEffect(() => {
    if (profileImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImageUrl(reader.result as string);
      };
      reader.onerror = () => {
        console.error("Failed to read file as data URL");
        setProfileImageUrl(null);
      };
      reader.readAsDataURL(profileImage);
    }
  }, [profileImage]);

  return {
    debouncedName,
    profileImageUrl,
    setProfileImage,
    setProfileImageUrl,
    setName,
    isNameExists,
    isNextButtonValid,
  };
};

export default useGroupProfileSequence;
