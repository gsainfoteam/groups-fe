import useDebouncedState from "@/hooks/useDebouncedState";
import { useEffect, useState } from "react";

const useGroupNotionSequence = () => {
  const [link, setLink] = useDebouncedState<string>("");
  const [notionRecordMap, setNotionRecordMap] = useState(null);

  const notionRegex =
    /^https:\/\/[a-zA-Z0-9-]+\.notion.site\/[a-zA-Z0-9-]+-([a-f0-9]{32})\??.*$/;
  const isInvalidNotionLink = !notionRegex.test(link) && link.length > 0;

  const urlRegex = /^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*.*/;
  const isValidLink = urlRegex.test(link) || link.length === 0;

  useEffect(() => {
    fetchPagePreview();
  }, [link]);

  const fetchPagePreview = async () => {
    // TODO: implement when the API is ready
  };

  return {
    setLink,
    isValidLink,
    isInvalidNotionLink,
    isNextButtonValid: isValidLink && !isInvalidNotionLink && link.length > 0,
    notionRecordMap,
  };
};

export default useGroupNotionSequence;
