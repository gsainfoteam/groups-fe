import { useState } from "react";

const useGroupDescriptionSequence = () => {
  const [description, setDescription] = useState<string>("");

  return {
    description,
    descriptionLength: description.length,
    isNextButtonValid: description.length > 0,
    setDescription,
  };
};

export default useGroupDescriptionSequence;
