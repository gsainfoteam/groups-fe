import useDebouncedState from "@/hooks/useDebouncedState";
import {
  isInvalidNotionLink,
  isValidLink,
  parseNotionPageId,
} from "@/utils/notionLinkTester";
import { useEffect, useState } from "react";

const useGroupNotionSequence = () => {
  const [link, setLink] = useDebouncedState<string>("");
  const [notionRecordMap, setNotionRecordMap] = useState(null);

  const _isValidLink = isValidLink(link);
  const _isInvalidNotionLink = isInvalidNotionLink(link);

  const notionPageId = parseNotionPageId(link);

  useEffect(() => {
    fetchPagePreview();
  }, [link]);

  const fetchPagePreview = async () => {
    // TODO: implement when the API is ready
  };

  return {
    notionPageId,
    setLink,
    isValidLink: _isValidLink,
    isInvalidNotionLink: _isInvalidNotionLink,
    isNextButtonValid: _isValidLink && !isInvalidNotionLink && link.length > 0,
    notionRecordMap,
  };
};

export default useGroupNotionSequence;
